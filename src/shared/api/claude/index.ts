import { ClaudeRequest, ClaudeResponse, OptimizationPromptParams } from './types';
import { OptimizedListing } from '../../../entities/marketplace';

// Use the proxy endpoint instead of calling Claude API directly
const CLAUDE_PROXY_URL = "http://localhost:3000/api/proxy/claude";

/**
 * Calls the Claude API through the backend proxy to generate optimized product listing content
 */
export const generateOptimizedContent = async (
  params: OptimizationPromptParams
): Promise<OptimizedListing> => {
  console.log(`Generating optimized content for ${params.platform} using Claude API...`);
  
  // Create the prompt for Claude
  const prompt = createOptimizationPrompt(params);
  
  // Call the Claude API through our proxy
  const claudeResponse = await callClaudeAPIProxy(prompt);
  
  // Parse the response into an OptimizedListing
  return parseClaudeResponse(claudeResponse, params);
};

/**
 * Creates a prompt for optimizing a product listing for a specific platform
 */
function createOptimizationPrompt(params: OptimizationPromptParams): string {
  const { product, platform, optimizationFocus, targetAudience, platformRequirements } = params;
  
  return `
You are an expert e-commerce listing optimizer. Your task is to optimize the following product listing for ${platform}.

${platform.toUpperCase()} SPECIFIC CONSIDERATIONS:
- Character limits: Title max ${platformRequirements.titleMaxLength} characters, Description max ${platformRequirements.descriptionMaxLength} characters
- Tags/Keywords: Maximum ${platformRequirements.maxTags} tags
- Required attributes: ${platformRequirements.requiredAttributes.join(', ')}
- Supported categories: ${platformRequirements.supportedCategories.join(', ')}
- Best practices:
  * ${platform === 'etsy' ? 'Use specific, descriptive titles that include materials and intended use' : ''}
  * ${platform === 'shopify' ? 'Focus on clear, benefit-driven product descriptions' : ''}
  * ${platform === 'amazon' ? 'Include key specs in bullet points and follow Amazon\'s style guidelines' : ''}

PRODUCT INFORMATION:
Title: ${product.title}
Description: ${product.description}
Price: $${product.price}
Category: ${product.category}
Tags: ${product.tags.join(', ')}
Attributes: ${Object.entries(product.attributes)
  .map(([key, value]) => `${key}: ${value}`)
  .join(', ')}

${optimizationFocus ? `OPTIMIZATION FOCUS:\n${optimizationFocus}\n` : ''}
${targetAudience ? `TARGET AUDIENCE:\n${targetAudience}\n` : ''}

Please generate an optimized listing with:
1. Title (optimized for ${platform})
2. Description (formatted appropriately for ${platform})
3. Tags/keywords (maximum relevance for ${platform})
4. Category recommendation from the supported categories
5. SEO recommendations
${platform === 'amazon' ? '6. Bullet points for Amazon listing' : ''}

Respond in JSON format using the following structure:
{
  "title": "optimized title",
  "description": "optimized description",
  "tags": ["tag1", "tag2", ...],
  "category": "recommended category",
  "seoMetadata": {
    "metaTitle": "SEO-optimized title",
    "metaDescription": "SEO-optimized description"
  }${platform === 'amazon' ? ',\n  "bulletPoints": ["point1", "point2", ...]' : ''}
}

Ensure that your response strictly follows these character limits and format requirements. The JSON should be valid and parseable.
`;
}

/**
 * Makes the API call to Claude through our backend proxy
 */
function callClaudeAPIProxy(prompt: string): Promise<ClaudeResponse> {
  const request: ClaudeRequest = {
    model: 'claude-3-sonnet-20240229', // Using Claude 3 Sonnet
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ]
  };
  
  return fetch(CLAUDE_PROXY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    return response.json();
  });
}

/**
 * Parses the Claude API response into an OptimizedListing
 */
function parseClaudeResponse(
  response: ClaudeResponse, 
  params: OptimizationPromptParams
): OptimizedListing {
  try {
    // Extract the text content from the response
    const content = response.content[0].text;
    
    // Find the JSON part of the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }
    
    const parsedData = JSON.parse(jsonMatch[0]);
    
    return {
      platform: params.platform,
      title: parsedData.title,
      description: parsedData.description,
      tags: parsedData.tags,
      category: parsedData.category,
      bulletPoints: parsedData.bulletPoints,
      seoMetadata: parsedData.seoMetadata,
      originalProduct: params.product
    };
  } catch (error) {
    console.error('Error parsing Claude response:', error);
    throw new Error('Failed to parse optimization response');
  }
}


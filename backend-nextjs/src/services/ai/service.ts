import { AIModel } from './models';
import { OptimizationRequest } from '@/models/optimization';
import { Product } from '@/models';

// OpenAI API types
interface OpenAIRequest {
  model: string;
  messages: { role: string; content: string }[];
  max_tokens: number;
  temperature: number;
}

// Anthropic API types
interface AnthropicRequest {
  model: string;
  messages: { role: string; content: string }[];
  max_tokens: number;
  temperature: number;
}

// DeepSeek API types
interface DeepSeekRequest {
  model: string;
  messages: { role: string; content: string }[];
  max_tokens: number;
  temperature: number;
}

// Base AI Service interface
export interface AIService {
  generateOptimizedListing(request: OptimizationRequest, model: AIModel): Promise<any>;
}

// OpenAI Service implementation
export class OpenAIService implements AIService {
  private apiKey: string;
  
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || '';
  }
  
  public async generateOptimizedListing(request: OptimizationRequest, model: AIModel): Promise<any> {
    const { product, platform, optimizationFocus, targetAudience } = request;
    
    // Create prompt for optimization
    const prompt = this.createOptimizationPrompt(product, platform, optimizationFocus, targetAudience);
    
    // In a real implementation, call the OpenAI API
    if (process.env.NODE_ENV === 'production' && this.apiKey) {
      try {
        const response = await this.callOpenAIAPI(prompt, model);
        return this.parseResponse(response);
      } catch (error) {
        console.error('OpenAI API call failed:', error);
        return this.getMockResponse(product, platform, optimizationFocus);
      }
    }
    
    // For development or if no API key, return mock data
    return this.getMockResponse(product, platform, optimizationFocus);
  }
  
  private createOptimizationPrompt(
    product: Product,
    platform: string,
    optimizationFocus?: string,
    targetAudience?: string
  ): string {
    return `
You are an expert e-commerce listing optimizer. Your task is to optimize the following product listing for ${platform}.

PLATFORM SPECIFIC CONSIDERATIONS:
- Platform: ${platform}
- Best practices for ${platform}:
  * ${platform === 'etsy' ? 'Use specific, descriptive titles that include materials and intended use' : ''}
  * ${platform === 'shopify' ? 'Focus on clear, benefit-driven product descriptions' : ''}
  * ${platform === 'amazon' ? 'Include key specs in bullet points and follow Amazon\'s style guidelines' : ''}

PRODUCT INFORMATION:
Title: ${product.title}
Description: ${product.description}
Price: $${product.price}
Category: ${product.category}
Tags: ${product.tags.join(', ')}

${optimizationFocus ? `OPTIMIZATION FOCUS:\n${optimizationFocus}\n` : ''}
${targetAudience ? `TARGET AUDIENCE:\n${targetAudience}\n` : ''}

Please generate an optimized listing with:
1. Title (optimized for ${platform})
2. Description (formatted appropriately for ${platform})
3. Tags/keywords (for SEO and discoverability)
4. Category recommendation
5. SEO metadata (title and description)
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
`;
  }
  
  private async callOpenAIAPI(prompt: string, model: AIModel): Promise<any> {
    const request: OpenAIRequest = {
      model: model.apiConfig.modelName,
      messages: [
        { role: 'system', content: 'You are an e-commerce listing optimization expert.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: model.apiConfig.maxTokens,
      temperature: model.apiConfig.temperature
    };
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(request)
    });
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }
    
    return await response.json();
  }
  
  private parseResponse(response: any): any {
    // Extract the content from the OpenAI response
    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('Invalid response from OpenAI API');
    }
    
    // Parse the JSON from the response
    try {
      // Find the JSON part in the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      throw new Error('Failed to parse optimization response');
    }
  }
  
  private getMockResponse(
    product: Product,
    platform: string,
    optimizationFocus?: string
  ): any {
    // Generate a mock response based on the platform
    let title = product.title;
    let description = product.description;
    let tags = [...product.tags];
    
    switch (platform) {
      case 'shopify':
        title = `${product.title} - Premium Quality${optimizationFocus ? ` | ${optimizationFocus}` : ''}`;
        description = `${product.description}\n\nOur premium quality ${product.title} is designed to exceed your expectations. Made with the finest materials and exceptional craftsmanship, this product offers durability and performance that stands the test of time.${optimizationFocus ? `\n\n${optimizationFocus}` : ''}`;
        tags = [...product.tags, 'premium', 'quality', 'shopify-exclusive'];
        
        return {
          title,
          description,
          tags,
          category: product.category,
          seoMetadata: {
            metaTitle: `Buy Premium ${product.title} | Free Shipping`,
            metaDescription: `Shop our exclusive ${product.title} with premium features and free shipping. Perfect for ${optimizationFocus || 'everyday use'}.`
          }
        };
        
      case 'etsy':
        title = `Handcrafted ${product.title} | ${optimizationFocus || 'Unique Design'} | Perfect Gift`;
        description = `${product.description}\n\nThis handcrafted ${product.title} is lovingly made with attention to every detail. Each piece is unique and makes a perfect gift for any occasion. Our customers love the exceptional quality and artistic design.`;
        tags = [...product.tags.slice(0, 8), 'handmade', 'artisan', 'gift idea', 'unique'];
        
        return {
          title,
          description,
          tags,
          category: product.category === 'Home & Garden' ? 'Home & Living' : product.category === 'Apparel' ? 'Clothing' : product.category,
          seoMetadata: {
            metaTitle: `Handmade ${product.title} | Artisan Crafted`,
            metaDescription: `Unique handcrafted ${product.title} made with love. Perfect for gifts or treating yourself. Fast shipping and eco-friendly packaging.`
          }
        };
        
      case 'amazon':
        title = `${product.title} - Professional Grade${optimizationFocus ? ` | ${optimizationFocus}` : ''} (${product.variants.length} Options)`;
        description = `Experience the premium quality of our ${product.title}. Designed for durability and performance, this product will exceed your expectations.\n\nOur customers love:\n- The exceptional craftsmanship\n- Premium materials\n- Outstanding customer service\n\nClick Add to Cart now before we sell out again!`;
        tags = product.tags.slice(0, 5);
        
        return {
          title,
          description,
          tags,
          category: product.category === 'Apparel' ? 'Clothing' : product.category === 'Home & Garden' ? 'Home & Kitchen' : product.category,
          bulletPoints: [
            `Premium Quality: Made with the finest materials for lasting durability`,
            `Versatile Design: Perfect for multiple uses and occasions`,
            `Satisfaction Guaranteed: 30-day money-back guarantee if you're not completely satisfied`,
            `Thoughtful Gift: Makes an excellent present for friends and family`,
            `Fast Shipping: Quick delivery with careful packaging`
          ],
          seoMetadata: {
            metaTitle: `${product.title} - Professional Grade | Prime Shipping`,
            metaDescription: `Shop our premium ${product.title} with fast Prime shipping. Professional grade quality with 30-day guarantee.`
          }
        };
        
      default:
        return {
          title,
          description,
          tags,
          category: product.category,
          seoMetadata: {
            metaTitle: title,
            metaDescription: description.substring(0, 160)
          }
        };
    }
  }
}

// Anthropic (Claude) Service implementation
export class AnthropicService implements AIService {
  private apiKey: string;
  
  constructor() {
    this.apiKey = process.env.ANTHROPIC_API_KEY || '';
  }
  
  public async generateOptimizedListing(request: OptimizationRequest, model: AIModel): Promise<any> {
    const { product, platform, optimizationFocus, targetAudience } = request;
    
    // Create prompt for optimization
    const prompt = this.createOptimizationPrompt(product, platform, optimizationFocus, targetAudience);
    
    // In a real implementation, call the Anthropic API
    if (process.env.NODE_ENV === 'production' && this.apiKey) {
      try {
        const response = await this.callAnthropicAPI(prompt, model);
        return this.parseResponse(response);
      } catch (error) {
        console.error('Anthropic API call failed:', error);
        return this.getMockResponse(product, platform, optimizationFocus);
      }
    }
    
    // For development or if no API key, return mock data
    return this.getMockResponse(product, platform, optimizationFocus);
  }
  
  private createOptimizationPrompt(
    product: Product,
    platform: string,
    optimizationFocus?: string,
    targetAudience?: string
  ): string {
    // Similar to OpenAI prompt, but potentially customized for Claude
    return `
You are an expert e-commerce listing optimizer. Your task is to optimize the following product listing for ${platform}.

PLATFORM SPECIFIC CONSIDERATIONS:
- Platform: ${platform}
- Best practices for ${platform}:
  * ${platform === 'etsy' ? 'Use specific, descriptive titles that include materials and intended use' : ''}
  * ${platform === 'shopify' ? 'Focus on clear, benefit-driven product descriptions' : ''}
  * ${platform === 'amazon' ? 'Include key specs in bullet points and follow Amazon\'s style guidelines' : ''}

PRODUCT INFORMATION:
Title: ${product.title}
Description: ${product.description}
Price: $${product.price}
Category: ${product.category}
Tags: ${product.tags.join(', ')}

${optimizationFocus ? `OPTIMIZATION FOCUS:\n${optimizationFocus}\n` : ''}
${targetAudience ? `TARGET AUDIENCE:\n${targetAudience}\n` : ''}

Please generate an optimized listing with:
1. Title (optimized for ${platform})
2. Description (formatted appropriately for ${platform})
3. Tags/keywords (for SEO and discoverability)
4. Category recommendation
5. SEO metadata (title and description)
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
`;
  }
  
  private async callAnthropicAPI(prompt: string, model: AIModel): Promise<any> {
    const request: AnthropicRequest = {
      model: model.apiConfig.modelName,
      messages: [
        { role: 'user', content: prompt }
      ],
      max_tokens: model.apiConfig.maxTokens,
      temperature: model.apiConfig.temperature
    };
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(request)
    });
    
    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.statusText}`);
    }
    
    return await response.json();
  }
  
  private parseResponse(response: any): any {
    // Extract the content from the Anthropic response
    const content = response.content?.[0]?.text;
    if (!content) {
      throw new Error('Invalid response from Anthropic API');
    }
    
    // Parse the JSON from the response
    try {
      // Find the JSON part in the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Error parsing Anthropic response:', error);
      throw new Error('Failed to parse optimization response');
    }
  }
  
  private getMockResponse(
    product: Product,
    platform: string,
    optimizationFocus?: string
  ): any {
    // Similar to OpenAI mock responses but can be customized for Claude
    // For now, we'll reuse the same mock data logic
    let title = product.title;
    let description = product.description;
    let tags = [...product.tags];
    
    // Claude-specific customizations
    switch (platform) {
      case 'shopify':
        title = `${product.title} - Premium Quality${optimizationFocus ? ` | ${optimizationFocus}` : ''}`;
        description = `${product.description}\n\nOur premium quality ${product.title} is designed to exceed your expectations. Made with the finest materials and exceptional craftsmanship, this product offers durability and performance that stands the test of time.${optimizationFocus ? `\n\n${optimizationFocus}` : ''}`;
        tags = [...product.tags, 'premium', 'quality', 'shopify-exclusive'];
        
        return {
          title,
          description,
          tags,
          category: product.category,
          seoMetadata: {
            metaTitle: `Buy Premium ${product.title} | Free Shipping`,
            metaDescription: `Shop our exclusive ${product.title} with premium features and free shipping. Perfect for ${optimizationFocus || 'everyday use'}.`
          }
        };
        
      case 'etsy':
        title = `Handcrafted ${product.title} | ${optimizationFocus || 'Unique Design'} | Perfect Gift`;
        description = `${product.description}\n\nThis handcrafted ${product.title} is lovingly made with attention to every detail. Each piece is unique and makes a perfect gift for any occasion. Our customers love the exceptional quality and artistic design.`;
        tags = [...product.tags.slice(0, 8), 'handmade', 'artisan', 'gift idea', 'unique'];
        
        return {
          title,
          description,
          tags,
          category: product.category === 'Home & Garden' ? 'Home & Living' : product.category === 'Apparel' ? 'Clothing' : product.category,
          seoMetadata: {
            metaTitle: `Handmade ${product.title} | Artisan Crafted`,
            metaDescription: `Unique handcrafted ${product.title} made with love. Perfect for gifts or treating yourself. Fast shipping and eco-friendly packaging.`
          }
        };
        
      case 'amazon':
        title = `${product.title} - Professional Grade${optimizationFocus ? ` | ${optimizationFocus}` : ''} (${product.variants.length} Options)`;
        description = `Experience the premium quality of our ${product.title}. Designed for durability and performance, this product will exceed your expectations.\n\nOur customers love:\n- The exceptional craftsmanship\n- Premium materials\n- Outstanding customer service\n\nClick Add to Cart now before we sell out again!`;
        tags = product.tags.slice(0, 5);
        
        return {
          title,
          description,
          tags,
          category: product.category === 'Apparel' ? 'Clothing' : product.category === 'Home & Garden' ? 'Home & Kitchen' : product.category,
          bulletPoints: [
            `Premium Quality: Made with the finest materials for lasting durability`,
            `Versatile Design: Perfect for multiple uses and occasions`,
            `Satisfaction Guaranteed: 30-day money-back guarantee if you're not completely satisfied`,
            `Thoughtful Gift: Makes an excellent present for friends and family`,
            `Fast Shipping: Quick delivery with careful packaging`
          ],
          seoMetadata: {
            metaTitle: `${product.title} - Professional Grade | Prime Shipping`,
            metaDescription: `Shop our premium ${product.title} with fast Prime shipping. Professional grade quality with 30-day guarantee.`
          }
        };
        
      default:
        return {
          title,
          description,
          tags,
          category: product.category,
          seoMetadata: {
            metaTitle: title,
            metaDescription: description.substring(0, 160)
          }
        };
    }
  }
}

// DeepSeek Service implementation
export class DeepSeekService implements AIService {
  private apiKey: string;
  
  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY || '';
  }
  
  public async generateOptimizedListing(request: OptimizationRequest, model: AIModel): Promise<any> {
    const { product, platform, optimizationFocus, targetAudience } = request;
    
    // Create prompt for optimization
    const prompt = this.createOptimizationPrompt(product, platform, optimizationFocus, targetAudience);
    
    // In a real implementation, call the DeepSeek API
    if (process.env.NODE_ENV === 'production' && this.apiKey) {
      try {
        const response = await this.callDeepSeekAPI(prompt, model);
        return this.parseResponse(response);
      } catch (error) {
        console.error('DeepSeek API call failed:', error);
        return this.getMockResponse(product, platform, optimizationFocus);
      }
    }
    
    // For development or if no API key, return mock data
    return this.getMockResponse(product, platform, optimizationFocus);
  }
  
  private createOptimizationPrompt(
    product: Product,
    platform: string,
    optimizationFocus?: string,
    targetAudience?: string
  ): string {
    return `
You are an expert e-commerce listing optimizer. Your task is to optimize the following product listing for ${platform}.

PLATFORM SPECIFIC CONSIDERATIONS:
- Platform: ${platform}
- Best practices for ${platform}:
  * ${platform === 'etsy' ? 'Use specific, descriptive titles that include materials and intended use' : ''}
  * ${platform === 'shopify' ? 'Focus on clear, benefit-driven product descriptions' : ''}
  * ${platform === 'amazon' ? 'Include key specs in bullet points and follow Amazon\'s style guidelines' : ''}

PRODUCT INFORMATION:
Title: ${product.title}
Description: ${product.description}
Price: $${product.price}
Category: ${product.category}
Tags: ${product.tags.join(', ')}

${optimizationFocus ? `OPTIMIZATION FOCUS:\n${optimizationFocus}\n` : ''}
${targetAudience ? `TARGET AUDIENCE:\n${targetAudience}\n` : ''}

Please generate an optimized listing with:
1. Title (optimized for ${platform})
2. Description (formatted appropriately for ${platform})
3. Tags/keywords (for SEO and discoverability)
4. Category recommendation
5. SEO metadata (title and description)
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
`;
  }
  
  private async callDeepSeekAPI(prompt: string, model: AIModel): Promise<any> {
    const request: DeepSeekRequest = {
      model: model.apiConfig.modelName,
      messages: [
        { role: 'user', content: prompt }
      ],
      max_tokens: model.apiConfig.maxTokens,
      temperature: model.apiConfig.temperature
    };
    
    // Note: This is a placeholder. DeepSeek API endpoint would need to be confirmed
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(request)
    });
    
    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`);
    }
    
    return await response.json();
  }
  
  private parseResponse(response: any): any {
    // Extract the content from the DeepSeek response
    // Note: This is a placeholder and would need to be updated based on actual API response format
    const content = response.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('Invalid response from DeepSeek API');
    }
    
    // Parse the JSON from the response
    try {
      // Find the JSON part in the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Error parsing DeepSeek response:', error);
      throw new Error('Failed to parse optimization response');
    }
  }
  
  private getMockResponse(
    product: Product,
    platform: string,
    optimizationFocus?: string
  ): any {
    // Similar to other services but with DeepSeek specific adjustments if needed
    let title = product.title;
    let description = product.description;
    let tags = [...product.tags];
    
    switch (platform) {
      case 'shopify':
        title = `${product.title} - Premium Quality${optimizationFocus ? ` | ${optimizationFocus}` : ''}`;
        description = `${product.description}\n\nOur premium quality ${product.title} is designed to exceed your expectations. Made with the finest materials and exceptional craftsmanship, this product offers durability and performance that stands the test of time.${optimizationFocus ? `\n\n${optimizationFocus}` : ''}`;
        tags = [...product.tags, 'premium', 'quality', 'shopify-exclusive'];
        
        return {
          title,
          description,
          tags,
          category: product.category,
          seoMetadata: {
            metaTitle: `Buy Premium ${product.title} | Free Shipping`,
            metaDescription: `Shop our exclusive ${product.title} with premium features and free shipping. Perfect for ${optimizationFocus || 'everyday use'}.`
          }
        };
        
      case 'etsy':
        title = `Handcrafted ${product.title} | ${optimizationFocus || 'Unique Design'} | Perfect Gift`;
        description = `${product.description}\n\nThis handcrafted ${product.title} is lovingly made with attention to every detail. Each piece is unique and makes a perfect gift for any occasion. Our customers love the exceptional quality and artistic design.`;
        tags = [...product.tags.slice(0, 8), 'handmade', 'artisan', 'gift idea', 'unique'];
        
        return {
          title,
          description,
          tags,
          category: product.category === 'Home & Garden' ? 'Home & Living' : product.category === 'Apparel' ? 'Clothing' : product.category,
          seoMetadata: {
            metaTitle: `Handmade ${product.title} | Artisan Crafted`,
            metaDescription: `Unique handcrafted ${product.title} made with love. Perfect for gifts or treating yourself. Fast shipping and eco-friendly packaging.`
          }
        };
        
      case 'amazon':
        title = `${product.title} - Professional Grade${optimizationFocus ? ` | ${optimizationFocus}` : ''} (${product.variants.length} Options)`;
        description = `Experience the premium quality of our ${product.title}. Designed for durability and performance, this product will exceed your expectations.\n\nOur customers love:\n- The exceptional craftsmanship\n- Premium materials\n- Outstanding customer service\n\nClick Add to Cart now before we sell out again!`;
        tags = product.tags.slice(0, 5);
        
        return {
          title,
          description,
          tags,
          category: product.category === 'Apparel' ? 'Clothing' : product.category === 'Home & Garden' ? 'Home & Kitchen' : product.category,
          bulletPoints: [
            `Premium Quality: Made with the finest materials for lasting durability`,
            `Versatile Design: Perfect for multiple uses and occasions`,
            `Satisfaction Guaranteed: 30-day money-back guarantee if you're not completely satisfied`,
            `Thoughtful Gift: Makes an excellent present for friends and family`,
            `Fast Shipping: Quick delivery with careful packaging`
          ],
          seoMetadata: {
            metaTitle: `${product.title} - Professional Grade | Prime Shipping`,
            metaDescription: `Shop our premium ${product.title} with fast Prime shipping. Professional grade quality with 30-day guarantee.`
          }
        };
        
      default:
        return {
          title,
          description,
          tags,
          category: product.category,
          seoMetadata: {
            metaTitle: title,
            metaDescription: description.substring(0, 160)
          }
        };
    }
  }
}

// AI Service Factory
export class AIServiceFactory {
  public static createService(model: AIModel): AIService {
    switch (model.provider.toLowerCase()) {
      case 'openai':
        return new OpenAIService();
      case 'anthropic':
        return new AnthropicService();
      case 'deepseek':
        return new DeepSeekService();
      default:
        // Default to OpenAI if provider is unknown
        return new OpenAIService();
    }
  }
}

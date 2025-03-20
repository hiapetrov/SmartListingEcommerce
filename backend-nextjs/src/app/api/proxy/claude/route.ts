import { NextRequest, NextResponse } from 'next/server';

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

export async function POST(request: NextRequest) {
  try {
    // Get the API key from environment variable
    const apiKey = process.env.CLAUDE_API_KEY;
    
    if (!apiKey) {
      console.error('Claude API key is not configured on the server');
      return NextResponse.json(
        { error: 'Claude API key is not configured on the server' },
        { status: 500 }
      );
    }
    
    if (apiKey === 'your-api-key-here') {
      console.error('Claude API key has default value - please update with actual key');
      return NextResponse.json(
        { error: 'Claude API key has not been properly configured' },
        { status: 500 }
      );
    }
    
    // Get the request body
    const body = await request.json();
    
    console.log('Forwarding request to Claude API...');
    
    // Forward the request to Claude API
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(body)
    });
    
    if (!response.ok) {
      console.error(`Claude API responded with status: ${response.status}`);
      const errorText = await response.text();
      console.error(`Error response: ${errorText}`);
      
      return NextResponse.json(
        { error: `Claude API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }
    
    // Get the response data
    const data = await response.json();
    console.log('Successfully received response from Claude API');
    
    // Return the response
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying request to Claude API:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request to Claude API', details: error },
      { status: 500 }
    );
  }
}

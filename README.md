# AI Listing Optimizer

An AI-powered tool that creates optimized product listings for multiple e-commerce platforms (Shopify, Etsy, Amazon) from a single product entry.

## Features

- Create a single product listing
- Select target platforms (Shopify, Etsy, Amazon)
- Specify optimization focus and target audience
- AI generates platform-specific optimized listings
- Edit or regenerate individual platform listings
- Publish to multiple platforms simultaneously

## Technology Stack

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Claude 3.7 Sonnet AI integration
- Feature-Sliced Design architecture

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser to `http://localhost:5173`

## Using the Optimizer

1. Enter your product details (title, description, price, etc.)
2. Select the platforms you want to optimize for
3. Specify any optimization focus and target audience
4. Click "Generate Optimized Listings"
5. Review and edit the platform-specific listings
6. Publish to your selected platforms

## AI Integration

This application uses Claude 3.7 Sonnet for listing optimization. To use your own API key:

1. Open `src/shared/api/claude/index.ts`
2. Replace the placeholder API key with your own
3. Uncomment the actual API call code and comment out the mock implementation

## Project Structure

This project follows Feature-Sliced Design architecture:

- `src/app` - Application initialization
- `src/entities` - Business domain models (Product, Marketplace)
- `src/features` - User scenarios (listing-optimizer, platform-publish)
- `src/widgets` - Composition blocks (product-form, optimized-listing-card)
- `src/shared` - Shared code and utilities
- `src/pages` - Application pages

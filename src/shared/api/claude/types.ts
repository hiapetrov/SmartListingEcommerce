﻿import { Product } from '../../../entities/product';
import { MarketplaceProductRequirements } from '../../../entities/marketplace';

export interface ClaudeRequest {
  model: string;
  max_tokens: number;
  messages: ClaudeMessage[];
}

export interface ClaudeMessage {
  role: "user" | "assistant";
  content: string | ClaudeContent[];
}

export interface ClaudeContent {
  type: "text";
  text: string;
}

export interface ClaudeResponse {
  id: string;
  type: "message";
  role: "assistant";
  content: ClaudeContent[];
  model: string;
  stop_reason: string;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

export interface OptimizationPromptParams {
  product: Product;
  platform: string;
  optimizationFocus: string;
  targetAudience: string;
  platformRequirements: MarketplaceProductRequirements;
  modelId?: string; // Added modelId property
}

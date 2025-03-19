// Global type declarations to fix TypeScript errors

// This allows using any type where TypeScript can't infer the correct type
declare type AnyType = any;

// Helper types for API services
interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status?: number;
}

// Extend Window with custom properties
interface Window {
  fs?: {
    readFile: (path: string, options?: { encoding?: string }) => Promise<any>;
  };
}

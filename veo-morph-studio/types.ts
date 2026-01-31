export interface AIStudio {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}

export type AspectRatio = '16:9' | '9:16';

export interface GenerationState {
  status: 'idle' | 'generating' | 'polling' | 'complete' | 'error';
  progress?: number; // Simulated progress
  error?: string;
  videoUrl?: string;
}
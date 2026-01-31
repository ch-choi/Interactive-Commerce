import { GoogleGenAI } from "@google/genai";
import { AspectRatio } from "../types";

// Helper to wait
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateVideo = async (
  prompt: string,
  startImageBase64: string,
  startImageMimeType: string,
  aspectRatio: AspectRatio,
  endImageBase64?: string | null,
  endImageMimeType?: string | null
): Promise<string> => {
  // 1. Initialize API with key from environment (injected after user selection)
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found. Please select a key.");
  }
  const ai = new GoogleGenAI({ apiKey });

  console.log("Starting video generation...");

  // 2. Prepare Config
  // 'veo-3.1-fast-generate-preview' supports start image and optional lastFrame
  const config: any = {
    numberOfVideos: 1,
    resolution: '720p', // Safe default for preview
    aspectRatio: aspectRatio,
  };

  if (endImageBase64 && endImageMimeType) {
    config.lastFrame = {
      imageBytes: endImageBase64,
      mimeType: endImageMimeType,
    };
  }

  // 3. Initiate Generation
  // Note: prompt is mandatory for generateVideos in the SDK types, even if minimal
  const finalPrompt = prompt.trim() || "A natural and cinematic video.";

  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: finalPrompt,
    image: {
      imageBytes: startImageBase64,
      mimeType: startImageMimeType,
    },
    config: config
  });

  console.log("Operation created:", operation);

  // 4. Poll for completion
  // It can take a minute or two.
  while (!operation.done) {
    console.log("Polling operation status...");
    await wait(5000); // Check every 5 seconds
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  console.log("Operation complete:", operation);

  if (operation.error) {
    throw new Error(`Generation failed: ${operation.error.message || 'Unknown error'}`);
  }

  const generatedVideo = operation.response?.generatedVideos?.[0];
  const downloadUri = generatedVideo?.video?.uri;

  if (!downloadUri) {
    throw new Error("No video URI returned from successful operation.");
  }

  // 5. Fetch the actual video bytes using the URI + API Key
  // The documentation says: "The response.body contains the MP4 bytes. You must append an API key when fetching from the download link."
  const videoResponse = await fetch(`${downloadUri}&key=${apiKey}`);
  
  if (!videoResponse.ok) {
     throw new Error(`Failed to download video bytes: ${videoResponse.statusText}`);
  }

  const videoBlob = await videoResponse.blob();
  return URL.createObjectURL(videoBlob);
};

import { GoogleGenAI } from "@google/genai";

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generates a video using Google Veo (Morph)
 * @param {string} apiKey - Gemini API Key
 * @param {string} prompt - Text prompt for the video
 * @param {string} startImageBase64 - Base64 string of the start image
 * @param {string} startImageMimeType - Mime type of the start image (e.g. 'image/jpeg')
 * @param {string} endImageBase64 - Base64 string of the end image
 * @param {string} endImageMimeType - Mime type of the end image
 * @param {function} onProgress - Callback for status updates (optional)
 * @returns {Promise<string>} - Blob URL of the generated video
 */
export async function generateVeoVideo(
    apiKey,
    prompt,
    startImageBase64,
    startImageMimeType,
    endImageBase64,
    endImageMimeType,
    onProgress
) {
    if (!apiKey) {
        throw new Error("API Key is missing.");
    }

    const ai = new GoogleGenAI({ apiKey });

    if (onProgress) onProgress("Initializing generation...");

    // 2. Prepare Config
    // 'veo-3.1-fast-generate-preview' supports start image and optional lastFrame
    const config = {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '9:16', // Default to portrait for product/fashion
    };

    if (endImageBase64 && endImageMimeType) {
        config.lastFrame = {
            imageBytes: endImageBase64,
            mimeType: endImageMimeType,
        };
    }

    // 3. Initiate Generation
    const finalPrompt = prompt && prompt.trim() ? prompt.trim() : "A cinematic product transformation between images.";

    if (onProgress) onProgress("Sending request to Veo...");

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
    if (onProgress) onProgress("Processing... (this may take a minute)");

    // 4. Poll for completion
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

    if (onProgress) onProgress("Downloading video...");

    // 5. Fetch the actual video bytes using the URI + API Key
    const videoResponse = await fetch(`${downloadUri}&key=${apiKey}`);

    if (!videoResponse.ok) {
        throw new Error(`Failed to download video bytes: ${videoResponse.statusText}`);
    }

    const videoBlob = await videoResponse.blob();
    return URL.createObjectURL(videoBlob);
}

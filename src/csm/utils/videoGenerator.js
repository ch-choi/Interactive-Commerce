/**
 * Generates a video from a list of images using HTML5 Canvas and MediaRecorder.
 * Applies a simple cross-fade and zoom effect between images.
 * 
 * @param {string[]} images - Array of image URLs/Base64 strings
 * @param {number} duration - Target duration in seconds (default 3s)
 * @returns {Promise<string>} - Blob URL of the generated video
 */
export async function generateProductVideo(images, duration = 3) {
    if (!images || images.length === 0) {
        throw new Error('No images provided for video generation');
    }

    const width = 600;
    const height = 800; // Vertical video aspect ratio for fashion
    const fps = 30;
    const totalFrames = duration * fps;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Load all images first
    const imageElements = await Promise.all(
        images.map(src => new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = (e) => reject(e);
            img.src = src;
        }))
    );

    const stream = canvas.captureStream(fps);
    const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
    });

    const chunks = [];
    mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
    };

    const recordingPromise = new Promise((resolve) => {
        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            const videoUrl = URL.createObjectURL(blob);
            resolve(videoUrl);
        };
    });

    mediaRecorder.start();

    // Animation Loop
    let frame = 0;

    // Create a loop that processes frames
    // We use a simple slideshow logic: show image A, fade to image B
    const framesPerImage = totalFrames / imageElements.length;

    const animate = () => {
        if (frame >= totalFrames) {
            mediaRecorder.stop();
            return;
        }

        const isTwoImageMorph = imageElements.length === 2;

        if (isTwoImageMorph) {
            // Special 2-image Morph Mode
            // We want a seamless transition A -> B -> A (loop) or just A -> B depending on duration
            // Let's do A -> B transition over the full duration
            const progress = frame / totalFrames; // 0 to 1
            const imgCurrent = imageElements[0];
            const imgNext = imageElements[1];

            // Easing function for smoother transition
            // const ease = t => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; 
            const ease = t => t; // Linear for now, sticking to "continuous"

            // Clear Screen
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, width, height);

            // Draw Image A (fades out 1 -> 0)
            // Scaling A: 1.0 -> 1.05
            // Draw Image B (fades in 0 -> 1)
            // Scaling B: 1.05 -> 1.1

            const scaleA = 1.0 + (progress * 0.05);
            const scaleB = 1.0 + (progress * 0.05); // Both zooming in slightly? Or one static?

            // Let's try: A zooms in, crossfades to B which is already zoomed in slightly and zooms more?
            // "Natural transition": A morphs into B.

            // Draw A
            // Alpha: 1 -> 0
            const alphaA = 1 - ease(progress);

            // Draw B
            // Alpha: 0 -> 1
            const alphaB = ease(progress);

            // Helper to draw
            const draw = (img, alpha, scale) => {
                ctx.globalAlpha = alpha;
                const sw = img.width;
                const sh = img.height;
                const ratio = Math.max(width / sw, height / sh) * scale;
                const dw = sw * ratio;
                const dh = sh * ratio;
                const dx = (width - dw) / 2;
                const dy = (height - dh) / 2;
                ctx.drawImage(img, dx, dy, dw, dh);
            };

            draw(imgCurrent, 1, scaleA); // Draw A fully
            draw(imgNext, alphaB, scaleB); // Draw B on top with increasing alpha

        } else {
            // Original Multi-image slideshow logic
            const framesPerImage = totalFrames / imageElements.length;
            const currentImageIndex = Math.floor(frame / framesPerImage);
            const nextImageIndex = (currentImageIndex + 1) % imageElements.length;
            const progressInSlide = (frame % framesPerImage) / framesPerImage;

            const imgCurrent = imageElements[currentImageIndex];
            const imgNext = imageElements[nextImageIndex];

            // Clear Screen
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(0, 0, width, height);

            const scale = 1.0 + (progressInSlide * 0.1);

            const drawImage = (img, alpha, scaleVal) => {
                ctx.globalAlpha = alpha;
                const sw = img.width;
                const sh = img.height;
                const ratio = Math.max(width / sw, height / sh) * scaleVal;
                const dw = sw * ratio;
                const dh = sh * ratio;
                const dx = (width - dw) / 2;
                const dy = (height - dh) / 2;
                ctx.drawImage(img, dx, dy, dw, dh);
            };

            if (progressInSlide > 0.8) {
                const fadeProgress = (progressInSlide - 0.8) / 0.2;
                drawImage(imgCurrent, 1, scale);
                drawImage(imgNext, fadeProgress, 1.0);
            } else {
                drawImage(imgCurrent, 1, scale);
            }
        }

        ctx.globalAlpha = 1.0; // Reset alpha

        // Watermark / Clean finish
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '20px Arial';
        // ctx.fillText('Auto Generated', 20, height - 20);

        frame++;
        // Use setTimeout to not block the main thread too much, aiming for 30fps simulation
        setTimeout(animate, 1000 / fps);
    };

    animate();

    return recordingPromise;
}

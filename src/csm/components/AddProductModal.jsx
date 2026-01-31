import { useState, useRef, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Box, Typography,
    Select, MenuItem, FormControl, InputLabel,
    CircularProgress, IconButton, Grid
} from '@mui/material';
import { Upload, X, Play, Video as VideoIcon } from 'lucide-react';
import { generateVeoVideo } from '../utils/veoGenerator';

// Helper to convert Blob URL to Base64
const blobUrlToBase64 = async (blobUrl) => {
    // If it's a remote URL (editing mode), we fetch it.
    // Note: This requires CORS to be allowed for the image source if it's external.
    // For local dev with vite public assets, it should work.
    try {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result.split(',')[1];
                const mimeType = reader.result.split(',')[0].split(':')[1].split(';')[0];
                resolve({ base64, mimeType });
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (e) {
        console.error("Failed to convert image to base64", e);
        throw e;
    }
};

export default function AddProductModal({ open, onClose, onSave, productToEdit }) {
    const [formData, setFormData] = useState({
        name: '',
        category: 'female',
        price: '',
        color: 'white',
    });
    const [images, setImages] = useState([]);
    const [generatedVideo, setGeneratedVideo] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationStatus, setGenerationStatus] = useState('');
    const [apiKey, setApiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || '');
    const fileInputRef = useRef(null);

    // Effect to populate form when opening in Edit mode
    useEffect(() => {
        if (open) {
            if (productToEdit) {
                setFormData({
                    name: productToEdit.name,
                    category: productToEdit.category,
                    price: productToEdit.price,
                    color: productToEdit.color,
                });

                const existingImages = productToEdit.images || [];
                // Find existing video (basic check for mp4 or blob video)
                const videoIndex = existingImages.findIndex(img =>
                    typeof img === 'string' && (img.endsWith('.mp4') || img.startsWith('data:video') || img.startsWith('blob:'))
                );

                if (videoIndex !== -1) {
                    setGeneratedVideo(existingImages[videoIndex]);
                    // Remove video from the main images list to prevent duplication/confusion
                    // Users modify static images in the top list, and the video in the bottom box.
                    const staticImages = [...existingImages];
                    staticImages.splice(videoIndex, 1);
                    setImages(staticImages);
                } else {
                    setGeneratedVideo(null);
                    setImages(existingImages);
                }
            } else {
                setFormData({ name: '', category: 'female', price: '', color: 'white' });
                setImages([]);
                setGeneratedVideo(null);
            }
        }
    }, [open, productToEdit]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const newImages = files.map(file => URL.createObjectURL(file));
            setImages(prev => [...prev, ...newImages]);
        }
    };

    const handleGenerateVideo = async () => {
        if (images.length < 2) {
            alert('Please upload 2 images (Start & End) for the morph effect.');
            return;
        }
        if (!apiKey) {
            alert('Please enter a valid Gemini API Key.');
            return;
        }

        setIsGenerating(true);
        setGenerationStatus('Preparing images...');

        try {
            // We use the first two images in the list for the morph
            const startImgData = await blobUrlToBase64(images[0]);
            const endImgData = await blobUrlToBase64(images[1]);

            const videoUrl = await generateVeoVideo(
                apiKey,
                `Cinematic morph transition of ${formData.name || 'product'}`,
                startImgData.base64,
                startImgData.mimeType,
                endImgData.base64,
                endImgData.mimeType,
                (status) => setGenerationStatus(status)
            );

            setGeneratedVideo(videoUrl);
        } catch (error) {
            console.error('Video generation failed:', error);
            alert(`Failed to generate video: ${error.message}`);
        } finally {
            setIsGenerating(false);
            setGenerationStatus('');
        }
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.price) {
            alert('Please fill in required fields');
            return;
        }

        // Construct the product object
        const newProduct = {
            ...(productToEdit && { id: productToEdit.id }),  // Preserve ID when editing
            name: formData.name,
            category: formData.category,
            price: parseFloat(formData.price),
            color: formData.color,
            // If we generated a new video, prepend it. 
            // Otherwise keep existing images.
            images: generatedVideo
                ? [generatedVideo, ...images]
                : images,
            date: new Date().toISOString().split('T')[0],
        };

        onSave(newProduct);
        handleClose();
    };

    const handleClose = () => {
        setGenerationStatus('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle fontWeight="bold">
                {productToEdit ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={3}>
                    {/* Left Column: Form Fields */}
                    <Grid item xs={12} md={6}>
                        <Box display="flex" flexDirection="column" gap={2}>
                            <TextField
                                label="Product Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                fullWidth
                                required
                            />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Category</InputLabel>
                                        <Select
                                            name="category"
                                            value={formData.category}
                                            label="Category"
                                            onChange={handleInputChange}
                                        >
                                            <MenuItem value="female">Female</MenuItem>
                                            <MenuItem value="male">Male</MenuItem>
                                            <MenuItem value="unisex">Unisex</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Price ($)"
                                        name="price"
                                        type="number"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <TextField
                                label="Color"
                                name="color"
                                value={formData.color}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Box>
                    </Grid>

                    {/* Right Column: Media Upload */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" gutterBottom fontWeight="600">
                            Product Images
                        </Typography>

                        <Box
                            sx={{
                                border: '2px dashed #e0e0e0',
                                borderRadius: 2,
                                p: 3,
                                textAlign: 'center',
                                cursor: 'pointer',
                                bgcolor: 'grey.50',
                                '&:hover': { bgcolor: 'grey.100', borderColor: 'primary.main' }
                            }}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                hidden
                                multiple
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                            />
                            <Upload size={32} color="#9e9e9e" />
                            <Typography variant="body2" color="text.secondary" mt={1}>
                                Click to upload images
                            </Typography>
                        </Box>

                        <Box display="flex" gap={1} flexWrap="wrap" mt={2}>
                            {images.map((img, idx) => (
                                <Box key={idx} position="relative" width={60} height={60}>
                                    {/* Simple check if it's a video just by extension or if generatedVideo matches */}
                                    {img.endsWith && (img.endsWith('.mp4') || img.startsWith('blob:')) ? (
                                        <video src={img} muted style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }} />
                                    ) : (
                                        <img src={img} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }} />
                                    )}

                                    <IconButton
                                        size="small"
                                        sx={{ position: 'absolute', top: -4, right: -4, bgcolor: 'white', padding: 0.5, boxShadow: 1 }}
                                        onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))}
                                    >
                                        <X size={12} />
                                    </IconButton>
                                </Box>
                            ))}
                        </Box>

                        <Box mt={3} p={2} bgcolor="primary.50" borderRadius={2}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                <Typography variant="subtitle2" fontWeight="600" color="primary.main" display="flex" alignItems="center" gap={1}>
                                    <VideoIcon size={18} />
                                    AI Video Generator
                                </Typography>
                            </Box>

                            {!generatedVideo ? (
                                <Box display="flex" flexDirection="column" gap={2}>
                                    {!import.meta.env.VITE_GEMINI_API_KEY && (
                                        <TextField
                                            size="small"
                                            label="Gemini API Key"
                                            type="password"
                                            value={apiKey}
                                            onChange={(e) => setApiKey(e.target.value)}
                                            placeholder="Enter API Key for Veo"
                                            fullWidth
                                        />
                                    )}
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={handleGenerateVideo}
                                        disabled={images.length < 2 || isGenerating}
                                        startIcon={isGenerating ? <CircularProgress size={16} color="inherit" /> : <Play size={16} />}
                                    >
                                        {isGenerating ? generationStatus || 'Generating...' : 'Auto Generate (Veo Morph)'}
                                    </Button>
                                </Box>
                            ) : (
                                <Box>
                                    <video
                                        src={generatedVideo}
                                        controls
                                        autoPlay
                                        loop
                                        style={{ width: '100%', borderRadius: 8, marginTop: 8 }}
                                    />
                                    <Button
                                        size="small"
                                        color="error"
                                        fullWidth
                                        sx={{ mt: 1 }}
                                        onClick={() => setGeneratedVideo(null)}
                                    >
                                        Remove Video
                                    </Button>
                                </Box>
                            )}
                            <Typography variant="caption" color="text.secondary" display="block" mt={1} sx={{ lineHeight: 1.2 }}>
                                Create a motion video automatically by stitching your uploaded images with zoom effects.
                            </Typography>
                        </Box>

                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2.5 }}>
                <Button onClick={handleClose} color="inherit">Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" type="submit">
                    {productToEdit ? 'Update Product' : 'Save Product'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

// Image Classification Helper Functions
window.imageClassification = {
    // Initialize TensorFlow.js MobileNet model (optional enhancement)
    mobilenetModel: null,

    // Load MobileNet model for enhanced classification
    async loadMobileNet() {
      try {
            if (!this.mobilenetModel && window.mobilenet) {
console.log('Loading MobileNet model...');
       this.mobilenetModel = await mobilenet.load();
    console.log('MobileNet model loaded successfully');
   return true;
        }
        } catch (error) {
    console.warn('Could not load MobileNet model:', error);
            return false;
        }
        return false;
    },

// Enhanced classification using TensorFlow.js (optional)
    async classifyWithTensorFlow(imageElement) {
        try {
    if (!this.mobilenetModel) {
      await this.loadMobileNet();
   }

        if (this.mobilenetModel) {
        const predictions = await this.mobilenetModel.classify(imageElement);
       return predictions.map(p => ({
   className: p.className,
         probability: p.probability
         }));
            }
  } catch (error) {
   console.warn('TensorFlow classification failed:', error);
     }
        return null;
    },

    // Utility function to create image element from base64
 createImageElement(base64Data) {
        return new Promise((resolve, reject) => {
            const img = new Image();
    img.onload = () => resolve(img);
            img.onerror = reject;
  img.crossOrigin = 'anonymous';
 img.src = base64Data;
        });
    },

    // Utility function to resize image for processing
    resizeImage(imageElement, maxWidth = 224, maxHeight = 224) {
        const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
      
        // Calculate new dimensions
      let { width, height } = imageElement;
   const aspectRatio = width / height;
        
      if (width > height) {
  width = Math.min(maxWidth, width);
 height = width / aspectRatio;
} else {
        height = Math.min(maxHeight, height);
            width = height * aspectRatio;
        }
        
    canvas.width = width;
  canvas.height = height;
   
     // Draw resized image
        ctx.drawImage(imageElement, 0, 0, width, height);
  
        return canvas;
    },

    // Initialize on page load
    async initialize() {
        console.log('Initializing image classification helpers...');
        
        // Pre-load MobileNet in background (non-blocking)
   setTimeout(async () => {
     await this.loadMobileNet();
     }, 2000);
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.imageClassification.initialize();
    });
} else {
    window.imageClassification.initialize();
}
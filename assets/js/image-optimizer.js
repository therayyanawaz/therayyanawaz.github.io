/**
 * Image optimization and lazy loading script
 */
document.addEventListener('DOMContentLoaded', function() {
  // Check if Intersection Observer is supported
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        // When image is visible in viewport
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // If data-src exists, set it as the src
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          
          // If data-srcset exists, set it as the srcset
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            img.removeAttribute('data-srcset');
          }
          
          // Add loaded class for fade-in effect
          img.classList.add('loaded');
          
          // Stop observing image
          observer.unobserve(img);
        }
      });
    }, {
      // Start loading images when they are 200px from viewport
      rootMargin: '200px 0px',
      threshold: 0.01
    });
    
    // Select all images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      // Add placeholder styles before image loads
      img.classList.add('lazy-image');
      
      // Start observing the image
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without Intersection Observer support
    // Load all images immediately
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
      }
      img.classList.add('loaded');
    });
  }
  
  // Function to automatically calculate and add srcset for responsive images
  function setupResponsiveImages() {
    const responsiveImages = document.querySelectorAll('img.responsive');
    
    responsiveImages.forEach(img => {
      if (!img.hasAttribute('srcset') && img.hasAttribute('src')) {
        const src = img.getAttribute('src');
        
        // Skip SVG images
        if (src.endsWith('.svg')) {
          return;
        }
        
        // Extract base path and extension
        const lastDot = src.lastIndexOf('.');
        const basePath = src.substring(0, lastDot);
        const extension = src.substring(lastDot);
        
        // Create srcset for multiple sizes
        const srcset = [
          `${basePath}-small${extension} 480w`,
          `${basePath}-medium${extension} 768w`,
          `${basePath}${extension} 1280w`
        ].join(', ');
        
        img.setAttribute('srcset', srcset);
        img.setAttribute('sizes', '(max-width: 480px) 480px, (max-width: 768px) 768px, 1280px');
      }
    });
  }
  
  // Setup responsive images if any are present
  if (document.querySelectorAll('img.responsive').length > 0) {
    setupResponsiveImages();
  }
}); 
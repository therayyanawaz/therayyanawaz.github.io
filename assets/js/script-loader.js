/**
 * Script loader for deferred loading of non-critical JavaScript
 */
document.addEventListener('DOMContentLoaded', function() {
  // List of scripts to load after page is ready
  const scripts = [
    'assets/js/bootstrap.bundle.min.js',
    'assets/js/slick.min.js',
    'assets/js/jquery.magnific-popup.min.js',
    'assets/js/main.js'
  ];
  
  // Function to load scripts asynchronously
  function loadScript(src) {
    return new Promise(function(resolve, reject) {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = function() {
        resolve();
      };
      script.onerror = function() {
        reject(new Error(`Failed to load script: ${src}`));
      };
      document.body.appendChild(script);
    });
  }
  
  // Load scripts sequentially to maintain dependency order
  function loadScriptsSequentially(scripts) {
    return scripts.reduce((promise, scriptSrc) => {
      return promise.then(() => loadScript(scriptSrc));
    }, Promise.resolve());
  }
  
  // Load scripts after a short delay to prioritize content rendering
  setTimeout(() => {
    loadScriptsSequentially(scripts)
      .then(() => {
        // Optional callback once all scripts are loaded
        console.log('All scripts loaded successfully');
        
        // Trigger any functions that depend on scripts being loaded
        if (typeof initializeSliders === 'function') {
          initializeSliders();
        }
      })
      .catch(error => {
        console.error('Error loading scripts:', error);
      });
  }, 100); // Small delay to prioritize content rendering
}); 
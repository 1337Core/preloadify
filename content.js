// content script

// check if enabled
chrome.storage.local.get(["enabled"], (result) => {
  if (chrome.runtime.lastError) {
    console.error('Error getting enabled state:', chrome.runtime.lastError);
    return;
  }
  if (result.enabled !== false) {
    injectInstantPage();
  }
});

// listen for state changes
chrome.storage.onChanged.addListener((changes) => {
  if (changes.enabled) {
    if (changes.enabled.newValue !== false) {
      injectInstantPage();
    } else {
      // remove script when disabled
      const script = document.querySelector('script[data-preloadify="true"]');
      if (script) script.remove();
    }
  }
});

// inject instantpage script
function injectInstantPage() {
  // check if already injected
  if (document.querySelector('script[data-preloadify="true"]')) {
    return;
  }
  
  // wait for DOM to be ready if not already
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectInstantPage, { once: true });
    return;
  }
  
  try {
    // create script element for local file
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("vendor/instantpage.min.js");
    script.type = "module";
    script.dataset.preloadify = "true";
    
    // append to doc
    const target = document.head || document.documentElement;
    if (target) {
      script.onload = function() {
        // console.log("preloadify injected");
      };
      
      script.onerror = function(event) {
        console.error("Failed to load instant.page script:", event);
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
      
      target.appendChild(script);
    } else {
      console.error("No valid target to inject script");
    }
  } catch (error) {
    console.error("Error injecting instant.page script:", error);
  }
}
// content script

// check if enabled
chrome.storage.local.get(["enabled"], (result) => {
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
  if (!document.querySelector('script[data-preloadify="true"]')) {
    // create script element for local file
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("vendor/instantpage.min.js");
    script.type = "module";
    script.dataset.preloadify = "true";
    
    // append to doc
    (document.head || document.documentElement).appendChild(script);
    
    script.onload = function() {
      // console.log("preloadify injected");
    };
  }
}
// background script: manages extension state
// injection handled by content.js

// init state if not set
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(["enabled"], (result) => {
    if (chrome.runtime.lastError) {
      console.error('Error getting enabled state:', chrome.runtime.lastError);
      return;
    }
    if (result.enabled === undefined) {
      chrome.storage.local.set({ enabled: true }, () => {
        if (chrome.runtime.lastError) {
          console.error('Error setting enabled state:', chrome.runtime.lastError);
        }
      });
    }
  });
});
// background script: manages extension state
// injection handled by content.js

// init state if not set
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(["enabled"], (result) => {
    if (result.enabled === undefined) {
      chrome.storage.local.set({ enabled: true });
    }
  });
});

// toggle state on icon click
chrome.action.onClicked.addListener(() => {
  chrome.storage.local.get(["enabled"], (result) => {
    const newState = !result.enabled;
    chrome.storage.local.set({ enabled: newState });
  });
});

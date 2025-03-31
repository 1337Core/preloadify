const browserAPI = typeof browser !== "undefined" ? browser : chrome

// background script: manages extension state
// injection handled by content.js

// init state if not set
browserAPI.runtime.onInstalled.addListener(() => {
  browserAPI.storage.local.get(["enabled"], (result) => {
    if (result.enabled === undefined) {
      browserAPI.storage.local.set({ enabled: true });
    }
  });
});

// toggle state on icon click
browserAPI.action.onClicked.addListener(() => {
  browserAPI.storage.local.get(["enabled"], (result) => {
    const newState = !(result.enabled !== false);
    browserAPI.storage.local.set({ enabled: newState });
  });
});

const browserAPI = typeof browser !== "undefined" ? browser : chrome

// This script runs in the background and injects the instant.page script
browserAPI.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url && tab.url.startsWith("http")) {
    // Check state
    browserAPI.storage.local.get(["enabled"], (result) => {
      if (result.enabled !== false) {
        browserAPI.scripting
          .executeScript({
            target: { tabId: tabId },
            function: injectInstantPage,
          })
          .catch((error) => {
            if (!error.message.includes("Cannot access contents of url") && !error.message.includes("The tab was closed")) {
              console.error("Preloadify - Error injecting script:", error)
            }
          })
      }
    })
  }
})

// This function runs in the context of the webpage
function injectInstantPage() {
  // Check if the script is already injected
  if (!document.querySelector('script[src*="instant.page"]')) {
    const script = document.createElement("script")
    script.src = "https://instant.page/5.2.0"
    script.type = "module"
    script.integrity = "sha384-jnZyxPjiipYXnSU0ygqeac2q7CVYMbh84q0uHVRRxEtvFPiQYbXWUorga2aqZJ0z"
    document.head.appendChild(script)
    console.log("Preloadify injected")
  }
}


const browserAPI = typeof browser !== "undefined" ? browser : chrome

document.addEventListener("DOMContentLoaded", () => {
  // Handle privacy policy link
  document.getElementById("privacyLink").addEventListener("click", (e) => {
    e.preventDefault()
    browserAPI.tabs.create({ url: browserAPI.runtime.getURL("privacy-policy.html") })
  })

  const toggleSwitch = document.getElementById("toggleExtension")
  const statusText = document.getElementById("status")

  // Load saved state
  browserAPI.storage.local.get(["enabled"], (result) => {
    if (result.enabled === false) {
      toggleSwitch.checked = false
      statusText.textContent = "Disabled"
      statusText.style.color = "#F44336"
    }
  })

  // Handle toggle changes
  toggleSwitch.addEventListener("change", () => {
    const isEnabled = toggleSwitch.checked

    // Save state
    browserAPI.storage.local.set({ enabled: isEnabled })

    // Update UI
    if (isEnabled) {
      statusText.textContent = "Active"
      statusText.style.color = "#4CAF50"
    } else {
      statusText.textContent = "Disabled"
      statusText.style.color = "#F44336"
    }
  })
})


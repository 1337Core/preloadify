const browserAPI = typeof browser !== "undefined" ? browser : chrome

document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.getElementById("toggleExtension")
  const statusText = document.getElementById("status")

  // load state
  browserAPI.storage.local.get(["enabled"], (result) => {
    if (result.enabled === false) {
      toggleSwitch.checked = false
      statusText.textContent = "Disabled"
      statusText.style.color = "#F44336"
    }
  })

  // handle toggle
  toggleSwitch.addEventListener("change", () => {
    const isEnabled = toggleSwitch.checked

    // save state
    browserAPI.storage.local.set({ enabled: isEnabled })

    // update ui
    if (isEnabled) {
      statusText.textContent = "Active"
      statusText.style.color = "#4CAF50"
    } else {
      statusText.textContent = "Disabled"
      statusText.style.color = "#F44336"
    }
  })
})


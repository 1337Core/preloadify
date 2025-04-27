const browserAPI = typeof browser !== "undefined" ? browser : chrome

document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.getElementById("toggleExtension")
  const statusText = document.getElementById("status")
  const slider = document.querySelector(".slider")

  // display extension version
  const versionElem = document.getElementById("version")
  const manifest = browserAPI.runtime.getManifest()
  if (versionElem) versionElem.textContent = manifest.version
  
  slider.classList.add("no-transition")
  
  // load state
  browserAPI.storage.local.get(["enabled"], (result) => {
    if (result.enabled !== false) {
      toggleSwitch.checked = true
      statusText.textContent = "Enabled"
      statusText.style.color = "#4CAF50"
    } else {
      toggleSwitch.checked = false
      statusText.textContent = "Disabled"
      statusText.style.color = "#F44336"
    }
    
    setTimeout(() => {
      slider.classList.remove("no-transition")
    }, 50)
  })

  // handle toggle
  toggleSwitch.addEventListener("change", () => {
    const isEnabled = toggleSwitch.checked

    // save state
    browserAPI.storage.local.set({ enabled: isEnabled })

    // update ui
    if (isEnabled) {
      statusText.textContent = "Enabled"
      statusText.style.color = "#4CAF50"
    } else {
      statusText.textContent = "Disabled"
      statusText.style.color = "#F44336"
    }
  })
})


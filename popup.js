document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.getElementById("toggleExtension")
  const statusText = document.getElementById("status")
  const slider = document.querySelector(".slider")

  // early return if required elements not found
  if (!toggleSwitch || !statusText || !slider) return

  // display extension version
  const versionElem = document.getElementById("version")
  const manifest = chrome.runtime.getManifest()
  if (versionElem) versionElem.textContent = manifest.version
  
  slider.classList.add("no-transition")
  
  // load state
  chrome.storage.local.get(["enabled"], (result) => {
    if (chrome.runtime.lastError) {
      console.error('Error getting enabled state:', chrome.runtime.lastError);
      statusText.textContent = "Error"
      statusText.style.color = "#F44336"
      return;
    }
    
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
    chrome.storage.local.set({ enabled: isEnabled }, () => {
      if (chrome.runtime.lastError) {
        console.error('Error setting enabled state:', chrome.runtime.lastError);
        statusText.textContent = "Error"
        statusText.style.color = "#F44336"
        // revert toggle state on error
        toggleSwitch.checked = !isEnabled
        return;
      }
      
      // update ui only on success
      if (isEnabled) {
        statusText.textContent = "Enabled"
        statusText.style.color = "#4CAF50"
      } else {
        statusText.textContent = "Disabled"
        statusText.style.color = "#F44336"
      }
    })
  })
})


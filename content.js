// This is an alternative approach using a content script
// This file would need to be referenced in the manifest.json if used

// Check if the script is already injected
if (!document.querySelector('script[src*="instant.page"]')) {
  const script = document.createElement("script")
  script.src = "//instant.page/5.2.0"
  script.type = "module"
  script.integrity = "sha384-jnZyxPjiipYXnSU0ygqeac2q7CVYMbh84q0uHVRRxEtvFPiQYbXWUorga2aqZJ0z"
  document.head.appendChild(script)
  console.log("InstantPage script injected by content script")
}


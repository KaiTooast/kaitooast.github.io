// Modrinth API Configuration
const PROJECT_ID = "new-nether-stuff"
const API_BASE = "https://api.modrinth.com/v2"

// Import or declare the marked variable before using it
const marked = window.marked || null

// State
let versions = []
let projectData = null

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadProjectInfo()
  loadVersions()
  if (marked) {
    marked.setOptions({
      breaks: true,
      gfm: true,
      headerIds: false,
      mangle: false,
    })
  }
  initMobileMenu()
  addFadeInAnimations()
  loadGallery()
})

function initMobileMenu() {
  const menuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")

  if (menuBtn) {
    menuBtn.addEventListener("click", toggleMobileMenu)
  }
}

function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu")
  const menuIcon = document.getElementById("menu-icon")
  const closeIcon = document.getElementById("close-icon")

  mobileMenu.classList.toggle("hidden")
  menuIcon.classList.toggle("hidden")
  closeIcon.classList.toggle("hidden")
}

function addFadeInAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-visible")
        }
      })
    },
    { threshold: 0.1 },
  )

  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el)
  })
}

function switchMainTab(tabName) {
  const allContents = document.querySelectorAll(".main-tab-content")
  const targetContent = document.getElementById(`main-content-${tabName}`)

  // Fade out current content
  allContents.forEach((content) => {
    if (!content.classList.contains("hidden")) {
      content.style.opacity = "0"
      content.style.transform = "translateX(-20px)"
      setTimeout(() => {
        content.classList.add("hidden")
        content.style.opacity = ""
        content.style.transform = ""
      }, 300)
    }
  })

  // Update tab buttons
  document.querySelectorAll(".main-tab-button").forEach((button) => {
    button.classList.remove("border-purple-500", "text-purple-500")
    button.classList.add("border-transparent", "text-gray-400")
  })

  // Fade in new content
  setTimeout(() => {
    targetContent.classList.remove("hidden")
    targetContent.style.opacity = "0"
    targetContent.style.transform = "translateX(20px)"
    targetContent.style.transition = "opacity 0.4s ease-out, transform 0.4s ease-out"

    requestAnimationFrame(() => {
      targetContent.style.opacity = "1"
      targetContent.style.transform = "translateX(0)"
    })
  }, 300)

  const activeTab = document.getElementById(`main-tab-${tabName}`)
  if (activeTab) {
    activeTab.classList.add("border-purple-500", "text-purple-500")
    activeTab.classList.remove("border-transparent", "text-gray-400")
  }
}

function switchTab(tabName) {
  const allContents = document.querySelectorAll(".tab-content")
  const targetContent = document.getElementById(`content-${tabName}`)

  // Fade out current content
  allContents.forEach((content) => {
    if (!content.classList.contains("hidden")) {
      content.style.opacity = "0"
      content.style.transform = "translateY(-10px)"
      setTimeout(() => {
        content.classList.add("hidden")
        content.style.opacity = ""
        content.style.transform = ""
      }, 250)
    }
  })

  // Reset all tab buttons
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.remove("border-orange-500", "text-orange-500")
    button.classList.add("border-transparent", "text-gray-400")
  })

  // Fade in new content with slide effect
  setTimeout(() => {
    targetContent.classList.remove("hidden")
    targetContent.style.opacity = "0"
    targetContent.style.transform = "translateY(10px)"
    targetContent.style.transition = "opacity 0.4s ease-out, transform 0.4s ease-out"

    requestAnimationFrame(() => {
      targetContent.style.opacity = "1"
      targetContent.style.transform = "translateY(0)"
    })
  }, 250)

  // Highlight selected tab
  const activeTab = document.getElementById(`tab-${tabName}`)
  if (activeTab) {
    activeTab.classList.add("border-orange-500", "text-orange-500")
    activeTab.classList.remove("border-transparent", "text-gray-400")
  }
}

// Load Project Information
async function loadProjectInfo() {
  try {
    const response = await fetch(`${API_BASE}/project/${PROJECT_ID}`)
    projectData = await response.json()

    document.getElementById("mod-description").textContent = projectData.description
  } catch (error) {
    console.error("Error loading project information:", error)
    document.getElementById("mod-description").textContent = "Error loading mod information. Please try again later."
  }
}

// Load Versions
async function loadVersions() {
  try {
    const response = await fetch(`${API_BASE}/project/${PROJECT_ID}/version`)
    versions = await response.json()

    displayChangelogs()
    displayLatestVersion()
    displayAllVersions()
  } catch (error) {
    console.error("Error loading versions:", error)
    document.getElementById("changelogs-list").innerHTML =
      '<p class="text-center text-red-400">Error loading changelogs.</p>'
    document.getElementById("versions-list").innerHTML =
      '<p class="text-center text-red-400">Error loading versions.</p>'
  }
}

function displayChangelogs() {
  const container = document.getElementById("changelogs-list")

  if (versions.length === 0) {
    container.innerHTML = '<p class="text-center text-gray-400">No versions found.</p>'
    return
  }

  container.innerHTML = versions
    .map(
      (version, index) => `
    <div class="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 hover:shadow-lg transition-all duration-300 fade-in" style="animation-delay: ${index * 0.1}s">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
        <h3 class="text-xl font-semibold text-orange-400">${escapeHtml(version.name)}</h3>
        <div class="flex flex-wrap gap-2 mt-2 sm:mt-0">
          <span class="px-3 py-1 bg-gray-700 rounded-full text-sm hover:bg-gray-600 transition-colors">${escapeHtml(version.version_number)}</span>
          <span class="px-3 py-1 bg-blue-600 rounded-full text-sm hover:bg-blue-500 transition-colors">${escapeHtml(version.game_versions.join(", "))}</span>
        </div>
      </div>
      <div class="flex flex-wrap gap-4 text-sm text-gray-400 mb-3">
        <span class="icon-date">${formatDateTime(version.date_published)}</span>
        <span class="icon-download">${formatDownloads(version.downloads)} Downloads</span>
        <span class="icon-loader">${formatLoaders(version.loaders)}</span>
      </div>
      <div class="text-gray-300 changelog-content prose prose-invert max-w-none">
        ${formatChangelog(version.changelog)}
      </div>
    </div>
  `,
    )
    .join("")

  addFadeInAnimations()
}

// Display Latest Version
function displayLatestVersion() {
  const container = document.getElementById("latest-version-info")
  const button = document.getElementById("download-latest-btn")

  if (versions.length === 0) {
    container.innerHTML = '<p class="text-gray-400">No version available.</p>'
    return
  }

  const latest = versions[0]
  container.innerHTML = `
    <p class="text-lg"><strong>${escapeHtml(latest.name)}</strong></p>
    <p class="text-gray-400">${escapeHtml(latest.version_number)} • ${escapeHtml(latest.game_versions.join(", "))}</p>
    <p class="text-sm text-gray-400 mt-2">
      <span class="icon-download">${formatDownloads(latest.downloads)}</span> • 
      <span class="icon-loader">${formatLoaders(latest.loaders)}</span>
    </p>
  `

  button.disabled = false
  button.onclick = () => downloadVersion(latest)
}

function displayAllVersions() {
  const container = document.getElementById("versions-list")

  if (versions.length === 0) {
    container.innerHTML = '<p class="text-center text-gray-400">No versions found.</p>'
    return
  }

  container.innerHTML = versions
    .map(
      (version) => `
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-700 rounded-lg p-4 hover:bg-gray-600 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
      <div class="flex-1">
        <p class="font-semibold">${escapeHtml(version.name)}</p>
        <p class="text-sm text-gray-400">${escapeHtml(version.version_number)} • ${escapeHtml(version.game_versions.join(", "))}</p>
        <p class="text-xs text-gray-500 mt-1">
          <span class="icon-download">${formatDownloads(version.downloads)}</span> • 
          <span class="icon-loader">${formatLoaders(version.loaders)}</span>
        </p>
      </div>
      <button onclick='downloadVersion(${JSON.stringify(version).replace(/'/g, "&#39;")})' 
              class="mt-3 sm:mt-0 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5">
        Download
      </button>
    </div>
  `,
    )
    .join("")
}

// Download Version
function downloadVersion(version) {
  // Find the primary file (usually the .jar file)
  const primaryFile = version.files.find((f) => f.primary) || version.files[0]

  if (primaryFile) {
    window.open(primaryFile.url, "_blank")
  } else {
    alert("No download file found.")
  }
}

function formatDateTime(dateString) {
  const date = new Date(dateString)
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

// Helper Functions
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function formatChangelog(changelog) {
  if (!changelog) return '<p class="text-gray-400">No changelog available.</p>'

  if (marked) {
    try {
      // Parse the Markdown content from Modrinth
      const parsed = marked.parse(changelog)
      return parsed
    } catch (e) {
      console.error("Markdown parsing error:", e)
    }
  }

  // Fallback to basic formatting if marked.js fails
  let formatted = escapeHtml(changelog)

  // Convert line breaks
  formatted = formatted.replace(/\n\n/g, "</p><p>")
  formatted = formatted.replace(/\n/g, "<br>")

  // Headers
  formatted = formatted.replace(/^### (.*?)$/gm, "<h3>$1</h3>")
  formatted = formatted.replace(/^## (.*?)$/gm, "<h2>$1</h2>")
  formatted = formatted.replace(/^# (.*?)$/gm, "<h1>$1</h1>")

  // Bold and italic
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
  formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>")

  // Lists
  formatted = formatted.replace(/^- (.*?)$/gm, "<li>$1</li>")
  formatted = formatted.replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")

  return `<p>${formatted}</p>`
}

function formatDownloads(downloads) {
  if (downloads >= 1000000) {
    return (downloads / 1000000).toFixed(1) + "M"
  } else if (downloads >= 1000) {
    return (downloads / 1000).toFixed(1) + "K"
  }
  return downloads.toString()
}

function formatLoaders(loaders) {
  if (!loaders || loaders.length === 0) return "Unbekannt"
  return loaders
    .map((loader) => {
      return loader.charAt(0).toUpperCase() + loader.slice(1)
    })
    .join(", ")
}

function escapeHtml(text) {
  const div = document.createElement("div")
  div.textContent = text
  return div.innerHTML
}

async function loadGallery() {
  try {
    const response = await fetch(`${API_BASE}/project/${PROJECT_ID}`)
    const data = await response.json()

    displayGallery(data.gallery)
  } catch (error) {
    console.error("Error loading gallery:", error)
    document.getElementById("gallery-grid").innerHTML =
      '<p class="text-center text-red-400 col-span-full">Error loading gallery.</p>'
  }
}

function displayGallery(gallery) {
  const container = document.getElementById("gallery-grid")

  if (!gallery || gallery.length === 0) {
    container.innerHTML = '<p class="text-center text-gray-400 col-span-full">No images available.</p>'
    return
  }

  container.innerHTML = gallery
    .map(
      (image, index) => `
      <div class="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer fade-in" 
           style="animation-delay: ${index * 0.1}s"
           onclick="openLightbox('${image.url}')">
        <img src="${image.url}" 
             alt="${escapeHtml(image.title || "Gallery image")}" 
             class="w-full h-48 sm:h-64 object-cover"
             loading="lazy" />
        ${image.title ? `<div class="p-3 text-center text-sm text-gray-300">${escapeHtml(image.title)}</div>` : ""}
      </div>
    `,
    )
    .join("")

  addFadeInAnimations()
}

function openLightbox(imageUrl) {
  const lightbox = document.getElementById("lightbox")
  const lightboxImg = document.getElementById("lightbox-img")

  lightboxImg.src = imageUrl
  lightbox.classList.remove("hidden")
  document.body.style.overflow = "hidden"
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox")
  lightbox.classList.add("hidden")
  document.body.style.overflow = "auto"
}

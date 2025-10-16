// Modrinth API Configuration
const API_BASE = "https://api.modrinth.com/v2"
const MODRINTH_USER = "KaiTooast"

let currentProjectId = null
let userProjects = []
let filteredProjects = []
let versions = []
let projectData = null

const marked = window.marked || null

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initTheme()
  loadUserProjects()

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
})

function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark"
  if (savedTheme === "light") {
    document.body.classList.add("light-mode")
    document.getElementById("theme-icon-sun").classList.remove("hidden")
    document.getElementById("theme-icon-moon").classList.add("hidden")
  }
}

function toggleTheme() {
  const body = document.body
  const sunIcon = document.getElementById("theme-icon-sun")
  const moonIcon = document.getElementById("theme-icon-moon")

  body.classList.toggle("light-mode")

  if (body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light")
    sunIcon.classList.remove("hidden")
    moonIcon.classList.add("hidden")
  } else {
    localStorage.setItem("theme", "dark")
    sunIcon.classList.add("hidden")
    moonIcon.classList.remove("hidden")
  }
}

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

  const currentContent = Array.from(allContents).find((content) => !content.classList.contains("hidden"))

  document.querySelectorAll(".main-tab-button").forEach((button) => {
    button.classList.remove("border-gray-500", "text-gray-300")
    button.classList.add("border-transparent", "text-gray-400")
  })

  const activeTab = document.getElementById(`main-tab-${tabName}`)
  if (activeTab) {
    activeTab.classList.add("border-gray-500", "text-gray-300")
    activeTab.classList.remove("border-transparent", "text-gray-400")
  }

  if (currentContent === targetContent) return

  if (currentContent) {
    currentContent.classList.add("main-tab-fade-out")

    setTimeout(() => {
      currentContent.classList.add("hidden")
      currentContent.classList.remove("main-tab-fade-out")

      targetContent.classList.remove("hidden")
      targetContent.classList.add("main-tab-fade-in")

      setTimeout(() => {
        targetContent.classList.remove("main-tab-fade-in")
      }, 500)
    }, 300)
  } else {
    targetContent.classList.remove("hidden")
  }
}

function switchTab(tabName) {
  const allContents = document.querySelectorAll(".tab-content")
  const targetContent = document.getElementById(`content-${tabName}`)

  allContents.forEach((content) => {
    if (!content.classList.contains("hidden")) {
      content.classList.add("tab-slide-out")

      setTimeout(() => {
        content.classList.add("hidden")
        content.classList.remove("tab-slide-out")
      }, 250)
    }
  })

  document.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.remove("border-gray-500", "text-gray-300")
    button.classList.add("border-transparent", "text-gray-400")
  })

  setTimeout(() => {
    targetContent.classList.remove("hidden")
    targetContent.classList.add("tab-slide-in")

    setTimeout(() => {
      targetContent.classList.remove("tab-slide-in")
    }, 400)

    if (tabName === "analytics") {
      loadAnalytics()
    }
  }, 250)

  const activeTab = document.getElementById(`tab-${tabName}`)
  if (activeTab) {
    activeTab.classList.add("border-gray-500", "text-gray-300")
    activeTab.classList.remove("border-transparent", "text-gray-400")
  }
}

function toggleFilterSection(sectionId) {
  const content = document.getElementById(`${sectionId}-content`)
  const chevron = document.getElementById(`${sectionId}-chevron`)

  if (content.classList.contains("hidden")) {
    content.classList.remove("hidden")
    chevron.style.transform = "rotate(180deg)"
  } else {
    content.classList.add("hidden")
    chevron.style.transform = "rotate(0deg)"
  }
}

function displayProjectsList(projects) {
  const container = document.getElementById("projects-grid")

  if (projects.length === 0) {
    container.innerHTML = '<p class="text-center text-gray-400">No projects match your filters.</p>'
    return
  }

  container.innerHTML = projects
    .map((project, index) => {
      const iconUrl = project.icon_url || "/placeholder.svg?height=100&width=100"
      const downloads = formatDownloads(project.downloads)
      const followers = project.followers || 0
      const formattedFollowers = formatDownloads(followers)
      const updatedDate = formatRelativeTime(project.date_modified || project.updated)

      return `
        <div class="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer fade-in border border-gray-700 hover:border-gray-600" 
             style="animation-delay: ${index * 0.05}s"
             onclick="showProjectDetail('${project.id}')">
          <div class="flex gap-4 p-4">
            <img src="${iconUrl}" 
                 alt="${escapeHtml(project.title)}" 
                 class="w-24 h-24 rounded-lg object-cover flex-shrink-0" 
                 onerror="this.src='/placeholder.svg?height=96&width=96'" />
            <div class="flex-1 min-w-0">
              <h3 class="text-xl font-semibold text-white mb-1">${escapeHtml(project.title)}</h3>
              <p class="text-sm text-gray-400 mb-2">by ${escapeHtml(project.author || "KaiTooast")}</p>
              <p class="text-sm text-gray-300 line-clamp-2 mb-3">${escapeHtml(project.description)}</p>
              <div class="flex flex-wrap gap-2 text-xs mb-3">
                ${getProjectTypeBadge(project.project_type)}
                ${
                  project.categories
                    ?.slice(0, 3)
                    .map((cat) => `<span class="px-2 py-1 bg-gray-700 text-gray-300 rounded">${escapeHtml(cat)}</span>`)
                    .join("") || ""
                }
              </div>
              <div class="flex flex-wrap gap-4 text-sm text-gray-400">
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                  ${downloads}
                </span>
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  ${formattedFollowers}
                </span>
                <span class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Updated ${updatedDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      `
    })
    .join("")

  addFadeInAnimations()
}

function formatProjectType(type) {
  const typeMap = {
    mod: "Mod",
    modpack: "Modpack",
    resourcepack: "Resource Pack",
    datapack: "Data Pack",
    plugin: "Plugin",
    shader: "Shader",
  }
  return typeMap[type] || type
}

function showProjectsList() {
  document.getElementById("projects-list-view").classList.remove("hidden")
  document.getElementById("project-detail-view").classList.add("hidden")
  currentProjectId = null
}

async function showProjectDetail(projectId) {
  currentProjectId = projectId

  document.getElementById("projects-list-view").classList.add("hidden")
  document.getElementById("project-detail-view").classList.remove("hidden")

  await loadProjectInfo()
  await loadVersions()
  await loadGallery()

  switchTab("description")
}

async function loadProjectInfo() {
  try {
    const response = await fetch(`${API_BASE}/project/${currentProjectId}`)
    projectData = await response.json()

    document.getElementById("project-title").textContent = projectData.title
    document.getElementById("mod-description").textContent = projectData.description
    document.getElementById("modrinth-link").href = `https://modrinth.com/mod/${currentProjectId}`

    displayProjectStatus(projectData.status)
    displayFullDescription(projectData.body)
  } catch (error) {
    console.error("Error loading project information:", error)
    document.getElementById("mod-description").textContent = "Error loading mod information. Please try again later."
  }
}

function displayProjectStatus(status) {
  const container = document.getElementById("project-status")
  const statusColors = {
    approved: "bg-green-600",
    archived: "bg-gray-600",
    rejected: "bg-red-600",
    draft: "bg-yellow-600",
    unlisted: "bg-orange-600",
    processing: "bg-blue-600",
    unknown: "bg-gray-600",
  }
  const color = statusColors[status] || statusColors.unknown
  container.innerHTML = `<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${color} text-white">${status}</span>`
}

function displayFullDescription(body) {
  const container = document.getElementById("full-description")

  if (!body) {
    container.innerHTML = '<p class="text-center text-gray-400">No description available.</p>'
    return
  }

  const processedBody = parseModrinthMarkdown(body)

  if (marked) {
    try {
      const parsed = marked.parse(processedBody)
      container.innerHTML = parsed
    } catch (e) {
      console.error("Markdown parsing error:", e)
      container.innerHTML = `<p>${escapeHtml(body)}</p>`
    }
  } else {
    let formatted = escapeHtml(processedBody)
    formatted = formatted.replace(/\n\n/g, "</p><p>")
    formatted = formatted.replace(/\n/g, "<br>")
    formatted = formatted.replace(/^### (.*?)$/gm, "<h3>$1</h3>")
    formatted = formatted.replace(/^## (.*?)$/gm, "<h2>$1</h2>")
    formatted = formatted.replace(/^# (.*?)$/gm, "<h1>$1</h1>")
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>")
    formatted = formatted.replace(/^- (.*?)$/gm, "<li>$1</li>")
    formatted = formatted.replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")

    container.innerHTML = `<p>${formatted}</p>`
  }
}

function parseModrinthMarkdown(text) {
  const badgePatterns = [
    { pattern: /\[discord\]$$([^)]+)$$/gi, type: "discord" },
    { pattern: /\[youtube\]$$([^)]+)$$/gi, type: "youtube" },
    { pattern: /\[github\]$$([^)]+)$$/gi, type: "github" },
    { pattern: /\[modrinth\]$$([^)]+)$$/gi, type: "modrinth" },
    { pattern: /\[kofi\]$$([^)]+)$$/gi, type: "kofi" },
  ]

  const badgeReplacements = {
    discord: (url) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer" class="modrinth-badge badge-discord"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/></svg>Discord</a>`,

    youtube: (url) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer" class="modrinth-badge badge-youtube"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>YouTube</a>`,

    github: (url) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer" class="modrinth-badge badge-github"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>GitHub</a>`,

    modrinth: (url) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer" class="modrinth-badge badge-modrinth"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 512 514"><path fill-rule="evenodd" clip-rule="evenodd" d="M503.16 323.56C514.55 281.47 515.32 235.91 503.2 190.76C466.57 54.2299 326.04 -26.8001 189.33 9.77991C83.8101 38.0199 11.3899 128.07 0.689941 230.47H43.99C54.29 147.33 113.74 74.7298 199.75 51.7098C306.05 23.2598 415.13 80.6699 453.17 181.38L411.03 192.65C391.64 145.8 352.57 111.45 306.3 96.8198L298.56 140.66C335.09 154.13 364.72 184.5 375.56 224.91C391.36 283.8 361.94 344.14 308.56 369.17L320.09 412.16C390.25 383.21 432.4 310.3 422.43 235.14L464.41 223.91C468.91 252.62 467.35 281.16 460.55 308.07L503.16 323.56Z" /><path d="M321.99 504.22C185.27 540.8 44.7501 459.77 8.11011 323.24C3.84011 307.31 1.17 291.33 0 275.46H43.27C44.36 287.37 46.4699 299.35 49.6799 311.29C53.0399 323.8 57.45 335.75 62.79 347.07L101.38 323.92C98.1299 316.42 95.39 308.6 93.21 300.47C69.17 210.87 122.41 118.77 212.13 94.7601C229.13 90.2101 246.23 88.4401 262.93 89.1501L255.19 133C244.73 133.05 234.11 134.42 223.53 137.25C157.31 154.98 118.01 222.95 135.75 289.09C136.85 293.16 138.13 297.13 139.59 300.99L188.94 271.38L174.07 231.95L220.67 184.08L279.57 171.39L296.62 192.38L269.47 219.88L245.79 227.33L228.87 244.72L237.16 267.79C237.16 267.79 253.95 285.63 253.98 285.64L277.7 279.33L294.58 260.79L331.44 249.12L342.42 273.82L304.39 320.45L240.66 340.63L212.08 308.81L162.26 338.7C187.8 367.78 226.2 383.93 266.01 380.56L277.54 423.55C218.13 431.41 160.1 406.82 124.05 361.64L85.6399 384.68C136.25 451.17 223.84 484.11 309.61 461.16C371.35 444.64 419.4 402.56 445.42 349.38L488.06 364.88C457.17 431.16 398.22 483.82 321.99 504.22Z" /></svg>Modrinth</a>`,

    kofi: (url) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer" class="modrinth-badge badge-kofi"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z"/></svg>Ko-fi</a>`,
  }

  for (const { pattern, type } of badgePatterns) {
    text = text.replace(pattern, (match, url) => badgeReplacements[type](url))
  }

  text = text.replace(
    /((?:<a href="[^"]*" target="_blank" rel="noopener noreferrer" class="modrinth-badge[^>]*>.*?<\/a>\s*)+)/g,
    '<div class="modrinth-badges-container">$1</div>',
  )

  return text
}

function getProjectTypeColor(type) {
  switch (type) {
    case "mod":
      return "bg-gray-600 text-white"
    case "modpack":
      return "bg-blue-600 text-white"
    case "resourcepack":
      return "bg-green-600 text-white"
    case "shader":
      return "bg-orange-600 text-white"
    default:
      return "bg-gray-600 text-white"
  }
}

async function loadVersions() {
  try {
    const response = await fetch(`${API_BASE}/project/${currentProjectId}/version`)
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
    .map((version, index) => {
      const versionType = version.version_type || "release"
      const stripeColor = getStripeColor(versionType)

      return `
    <div class="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 hover:shadow-lg transition-all duration-300 fade-in version-item" style="animation-delay: ${index * 0.1}s; border-left: 4px solid ${stripeColor}">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
        <h3 class="text-xl font-semibold text-white">${escapeHtml(version.name)}</h3>
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
  `
    })
    .join("")

  addFadeInAnimations()
}

function getStripeColor(versionType) {
  switch (versionType) {
    case "alpha":
      return "#ef4444"
    case "beta":
      return "#f97316"
    case "release":
      return "#22c55e"
    default:
      return "#22c55e"
  }
}

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
    .map((version) => {
      const versionType = version.version_type || "release"
      const stripeColor = getStripeColor(versionType)

      return `
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-700 rounded-lg p-4 hover:bg-gray-600 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]" style="border-left: 4px solid ${stripeColor}">
      <div class="flex-1">
        <p class="font-semibold">${escapeHtml(version.name)}</p>
        <p class="text-sm text-gray-400">${escapeHtml(version.version_number)} • ${escapeHtml(version.game_versions.join(", "))}</p>
        <p class="text-xs text-gray-500 mt-1">
          <span class="icon-download">${formatDownloads(version.downloads)}</span> • 
          <span class="icon-loader">${formatLoaders(version.loaders)}</span>
        </p>
      </div>
      <button onclick='downloadVersion(${JSON.stringify(version).replace(/'/g, "&#39;")})' 
              class="mt-3 sm:mt-0 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5">
        Download
      </button>
    </div>
  `
    })
    .join("")
}

function downloadVersion(version) {
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
      const parsed = marked.parse(changelog)
      return parsed
    } catch (e) {
      console.error("Markdown parsing error:", e)
    }
  }

  let formatted = escapeHtml(changelog)
  formatted = formatted.replace(/\n\n/g, "</p><p>")
  formatted = formatted.replace(/\n/g, "<br>")
  formatted = formatted.replace(/^### (.*?)$/gm, "<h3>$1</h3>")
  formatted = formatted.replace(/^## (.*?)$/gm, "<h2>$1</h2>")
  formatted = formatted.replace(/^# (.*?)$/gm, "<h1>$1</h1>")
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
  formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>")
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
  if (!loaders || loaders.length === 0) return "Unknown"
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
    const response = await fetch(`${API_BASE}/project/${currentProjectId}`)
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
      <div class="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer fade-in gallery-card" 
           style="animation-delay: ${index * 0.08}s"
           onclick="openLightbox('${image.url}', '${escapeHtml(image.title || "Gallery image").replace(/'/g, "&#39;")}')">
        <div class="gallery-image-wrapper">
          <img src="${image.url}" 
               alt="${escapeHtml(image.title || "Gallery image")}" 
               class="gallery-image-display"
               loading="eager"
               decoding="sync"
               />
        </div>
        ${image.title ? `<div class="p-4 text-center text-sm text-gray-300 font-medium">${escapeHtml(image.title)}</div>` : ""}
      </div>
    `,
    )
    .join("")

  addFadeInAnimations()
}

function openLightbox(imageUrl, imageTitle = "") {
  const lightbox = document.getElementById("lightbox")
  const lightboxImg = document.getElementById("lightbox-img")
  const lightboxTitle = document.getElementById("lightbox-title")

  lightboxImg.src = imageUrl
  lightboxImg.loading = "eager"
  lightboxImg.decoding = "sync"

  if (lightboxTitle && imageTitle) {
    lightboxTitle.textContent = imageTitle
    lightboxTitle.classList.remove("hidden")
  } else if (lightboxTitle) {
    lightboxTitle.classList.add("hidden")
  }

  lightbox.classList.remove("hidden")
  lightbox.classList.add("lightbox-fade-in")
  document.body.style.overflow = "hidden"
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox")
  lightbox.classList.add("lightbox-fade-out")

  setTimeout(() => {
    lightbox.classList.add("hidden")
    lightbox.classList.remove("lightbox-fade-in", "lightbox-fade-out")
    document.body.style.overflow = "auto"
  }, 200)
}

function getProjectTypeBadge(type) {
  const badges = {
    mod: '<span class="px-2 py-1 bg-gray-600 text-white rounded font-medium">Mod</span>',
    modpack: '<span class="px-2 py-1 bg-blue-600 text-white rounded font-medium">Modpack</span>',
    resourcepack: '<span class="px-2 py-1 bg-green-600 text-white rounded font-medium">Resource Pack</span>',
    datapack: '<span class="px-2 py-1 bg-yellow-600 text-white rounded font-medium">Data Pack</span>',
    plugin: '<span class="px-2 py-1 bg-orange-600 text-white rounded font-medium">Plugin</span>',
    shader: '<span class="px-2 py-1 bg-pink-600 text-white rounded font-medium">Shader</span>',
  }
  return badges[type] || `<span class="px-2 py-1 bg-gray-600 text-white rounded font-medium">${type}</span>`
}

function formatRelativeTime(dateString) {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "today"
  if (diffDays === 1) return "yesterday"
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}

function refreshModData() {
  const btn = document.getElementById("refresh-btn")
  btn.disabled = true
  btn.innerHTML =
    '<svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg><span>Refreshing...</span>'

  loadVersions().then(() => {
    btn.disabled = false
    btn.innerHTML =
      '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg><span>Refresh</span>'
  })
}

async function loadUserProjects() {
  const container = document.getElementById("projects-grid")

  try {
    const response = await fetch(`${API_BASE}/user/${MODRINTH_USER}/projects`)
    userProjects = await response.json()

    if (userProjects.length === 0) {
      container.innerHTML = '<p class="text-center text-gray-400 col-span-full">No projects found.</p>'
      return
    }

    filteredProjects = [...userProjects]
    filterProjects()
  } catch (error) {
    console.error("Error loading user projects:", error)
    container.innerHTML =
      '<p class="text-center text-red-400 col-span-full">Error loading projects. Please try again later.</p>'
  }
}

function filterProjects() {
  const searchTerm = document.getElementById("project-search")?.value.toLowerCase() || ""
  const typeFilter = document.querySelector('input[name="project-type"]:checked')?.value || "all"
  const sortOption = document.querySelector('input[name="sort-option"]:checked')?.value || "updated"

  filteredProjects = userProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm) ||
      (project.author && project.author.toLowerCase().includes(searchTerm)) ||
      (project.categories && project.categories.some((cat) => cat.toLowerCase().includes(searchTerm)))

    const matchesType = typeFilter === "all" || project.project_type === typeFilter
    return matchesSearch && matchesType
  })

  filteredProjects.sort((a, b) => {
    switch (sortOption) {
      case "updated":
        return new Date(b.date_modified || b.updated) - new Date(a.date_modified || a.updated)
      case "created":
        return new Date(b.date_created || b.published) - new Date(a.date_created || a.published)
      case "downloads":
        return b.downloads - a.downloads
      default:
        return 0
    }
  })

  const resultsCount = document.getElementById("results-count")
  if (resultsCount) {
    resultsCount.textContent = `Showing ${filteredProjects.length} of ${userProjects.length} projects`
  }

  displayProjectsList(filteredProjects)
}

async function loadAnalytics() {
  if (!versions || versions.length === 0) {
    return
  }

  displayVersionDistribution()
  displayAnalyticsStats()
  drawDownloadChart()
}

function displayVersionDistribution() {
  const container = document.getElementById("version-distribution")

  if (versions.length === 0) {
    container.innerHTML = '<p class="text-center text-gray-400">No version data available.</p>'
    return
  }

  const sortedVersions = [...versions].sort((a, b) => b.downloads - a.downloads).slice(0, 5)
  const maxDownloads = sortedVersions[0]?.downloads || 1

  container.innerHTML = sortedVersions
    .map((version) => {
      const percentage = (version.downloads / maxDownloads) * 100
      return `
      <div class="space-y-1">
        <div class="flex justify-between text-sm">
          <span class="text-gray-300 font-medium">${escapeHtml(version.name)}</span>
          <span class="text-gray-400">${formatDownloads(version.downloads)}</span>
        </div>
        <div class="w-full bg-gray-700 rounded-full h-2.5">
          <div class="bg-green-500 h-2.5 rounded-full transition-all duration-500" style="width: ${percentage}%"></div>
        </div>
      </div>
    `
    })
    .join("")
}

function displayAnalyticsStats() {
  if (versions.length === 0) return

  const topVersion = [...versions].sort((a, b) => b.downloads - a.downloads)[0]
  const totalDownloads = versions.reduce((sum, v) => sum + v.downloads, 0)
  const avgDownloads = Math.round(totalDownloads / versions.length)

  document.getElementById("top-version").querySelector("p").textContent = topVersion.name
  document.getElementById("avg-downloads").querySelector("p").textContent = formatDownloads(avgDownloads)
  document.getElementById("total-versions").querySelector("p").textContent = versions.length
}

function drawDownloadChart() {
  const canvas = document.getElementById("downloads-canvas")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  const container = canvas.parentElement
  canvas.width = container.clientWidth
  canvas.height = container.clientHeight

  if (versions.length === 0) {
    ctx.fillStyle = "#9ca3af"
    ctx.font = "14px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("No data available", canvas.width / 2, canvas.height / 2)
    return
  }

  const sortedVersions = [...versions]
    .sort((a, b) => new Date(a.date_published) - new Date(b.date_published))
    .slice(-10)

  const maxDownloads = Math.max(...sortedVersions.map((v) => v.downloads))
  const padding = 40
  const chartWidth = canvas.width - padding * 2
  const chartHeight = canvas.height - padding * 2
  const barWidth = chartWidth / sortedVersions.length
  const barSpacing = barWidth * 0.2

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.strokeStyle = "#4b5563"
  ctx.lineWidth = 1
  for (let i = 0; i <= 5; i++) {
    const y = padding + (chartHeight / 5) * i
    ctx.beginPath()
    ctx.moveTo(padding, y)
    ctx.lineTo(canvas.width - padding, y)
    ctx.stroke()

    ctx.fillStyle = "#9ca3af"
    ctx.font = "11px sans-serif"
    ctx.textAlign = "right"
    const value = maxDownloads * (1 - i / 5)
    ctx.fillText(formatDownloads(Math.round(value)), padding - 5, y + 4)
  }

  const gradient = ctx.createLinearGradient(0, padding, 0, canvas.height - padding)
  gradient.addColorStop(0, "#22c55e")
  gradient.addColorStop(1, "#16a34a")

  sortedVersions.forEach((version, index) => {
    const barHeight = (version.downloads / maxDownloads) * chartHeight
    const x = padding + index * barWidth + barSpacing / 2
    const y = canvas.height - padding - barHeight

    ctx.fillStyle = gradient
    ctx.fillRect(x, y, barWidth - barSpacing, barHeight)

    ctx.fillStyle = "#d1d5db"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "center"
    ctx.save()
    ctx.translate(x + (barWidth - barSpacing) / 2, canvas.height - padding + 15)
    ctx.rotate(-Math.PI / 4)
    const versionLabel =
      version.version_number.length > 8 ? version.version_number.substring(0, 8) + "..." : version.version_number
    ctx.fillText(versionLabel, 0, 0)
    ctx.restore()
  })

  ctx.fillStyle = "#f3f4f6"
  ctx.font = "bold 14px sans-serif"
  ctx.textAlign = "center"
  ctx.fillText("Downloads by Version", canvas.width / 2, 20)
}

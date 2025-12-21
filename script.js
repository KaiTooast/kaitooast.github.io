// ============================================
// CONFIGURATION - All external links
// ============================================
const CONFIG = {
  // Social Links
  GITHUB_PROFILE: "https://github.com/KaiTooast",
  DISCORD_USER: "https://discord.com/users/918149823587307580",

  // NetherStuff Mod
  NETHERSTUFF_SLUG: "netherstuff",
  NETHERSTUFF_MODRINTH: "https://modrinth.com/mod/netherstuff",

  ENDSTUFF_SLUG: "endstuff",
  ENDSTUFF_MODRINTH: "https://modrinth.com/mod/endstuff",

  // GitHub Stats Images
  GITHUB_SNAKE: "https://raw.githubusercontent.com/Platane/snk/output/github-contribution-grid-snake-dark.svg",
  GITHUB_STATS:
    "https://github-readme-stats.vercel.app/api?username=KaiTooast&show_icons=true&theme=tokyonight&hide_border=true&bg_color=00000000&title_color=a855f7&icon_color=a855f7&text_color=ffffff",
  GITHUB_LANGS:
    "https://github-readme-stats.vercel.app/api/top-langs/?username=KaiTooast&layout=compact&theme=tokyonight&hide_border=true&bg_color=00000000&title_color=a855f7&text_color=ffffff",
  GITHUB_STREAK:
    "https://github-readme-streak-stats.herokuapp.com/?user=KaiTooast&theme=tokyonight&hide_border=true&background=00000000&ring=a855f7&fire=a855f7&currStreakLabel=a855f7",

  // Modrinth API
  MODRINTH_API_BASE: "https://api.modrinth.com/v2",
  USER_AGENT: "KaiTooast-Portfolio/1.0",
}

const TRANSLATIONS = {
  en: {
    skipToContent: "Skip to content",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.stats": "Stats",
    "nav.contact": "Contact",
    "hero.greeting": "Hi, I'm",
    "hero.subtitle": "Portfolio — Developer & Modder",
    "hero.description":
      "Forging digital experiences. Specializing in Minecraft Modding, Python scripting, and low-poly 3D Modeling.",
    "hero.viewProjects": "View Projects",
    "hero.getInTouch": "Get in Touch",
    "about.title1": "Inside the",
    "about.title2": "Code",
    "about.p1":
      "I'm not just a developer; I'm a builder. My passion lies in dissecting how games work and reconstructing them into something new.",
    "about.p2":
      "Currently, I focus on NeoForge to push the boundaries of Minecraft, creating complex mods that add depth and excitement. When I'm not coding in Java or Python, I'm modeling assets in Blockbench to ensure everything looks as good as it plays.",
    "about.skill1": "Mod Development",
    "about.skill2": "3D Modeling",
    "about.skill3": "Python Scripting",
    "about.skill4": "Performance",
    "skills.title1": "Tech",
    "skills.title2": "Arsenal",
    "skills.subtitle": "The tools I use to bring ideas to life",
    "projects.title1": "Featured",
    "projects.title2": "Work",
    "projects.subtitle": "Expanding the boundaries of the game",
    "projects.available": "Available",
    "projects.comingSoon": "Coming Soon",
    "projects.download": "Download",
    "projects.viewModrinth": "View on Modrinth",
    "projects.stayTuned": "Stay Tuned",
    "projects.endstuffDesc":
      "Currently working on it... A mystical expansion to The End dimension with new blocks, items, and adventures awaiting.",
    "stats.title1": "Code",
    "stats.title2": "Analytics",
    "stats.subtitle": "My contributions to the open source world",
    "contact.title1": "Get In",
    "contact.title2": "Touch",
    "contact.subtitle":
      "Ready to build something amazing? Whether it's a new mod idea, a script, or just a chat about Minecraft dev, my inbox is open.",
    "contact.github": "Check GitHub",
    "contact.discord": "Message on Discord",
    "contact.email": "Email Me",
    "contact.namePlaceholder": "Your Name",
    "contact.messagePlaceholder": "Your Message",
    "contact.send": "Send Message",
    "footer.copyright": "© 2025 KaiTooast. Crafted with ♥ and Code.",
    "footer.backToTop": "Back to Top",
    // Social Proof translations
    "social.title1": "Community",
    "social.title2": "Impact",
    "social.subtitle": "Milestones and achievements from the community",
    "social.totalDownloads": "Total Downloads",
    "social.followers": "Followers",
    "social.githubStars": "GitHub Stars",
    "social.active": "Active",
    "social.discordCommunity": "Discord Community",
    "social.achievementsTitle": "Achievement Badges",
    "social.netherExplorer": "Nether Explorer",
    "social.modrinthApproved": "Modrinth Approved",
    "social.openSource": "Open Source",
    "social.endExplorer": "End Explorer (Coming Soon)",
    // Blog/Updates translations
    "updates.title1": "Dev",
    "updates.title2": "Updates",
    "updates.subtitle": "Latest news and development progress",
    "updates.filterAll": "All",
    "updates.filterNether": "NetherStuff",
    "updates.filterEnd": "EndStuff",
    "updates.soon": "Soon",
    "updates.delayed": "Delayed",
    "updates.endstuff1Title": "EndStuff Development Started",
    "updates.endstuff1Desc":
      "Beginning work on a new End dimension expansion mod. Planning unique blocks, items, and gameplay mechanics.",
    "updates.nether1Title": "New Nether Blocks Added",
    "updates.nether1Desc":
      "Added decorative nether blocks and new crafting recipes. Improved compatibility with other mods.",
    "updates.nether2Title": "NeoForge 1.21 Support",
    "updates.nether2Desc":
      "Updated NetherStuff to support NeoForge for Minecraft 1.21. Fixed bugs and improved performance.",
    "updates.initialCommit": "Initial Commit",
    "updates.featureUpdate": "Feature Update",
    "updates.versionUpdate": "Version Update",
    // Timeline translations
    "timeline.title1": "Version",
    "timeline.title2": "History",
    "timeline.subtitle": "The evolution of my mods over time",
    "timeline.upcoming": "Upcoming",
    "timeline.endstuffDesc": "First release of EndStuff mod with new End dimension content.",
    "timeline.nether12Desc": "Added new decorative blocks and improved mod compatibility.",
    "timeline.nether11Desc": "NeoForge 1.21 support with bug fixes and performance improvements.",
    "timeline.nether10Desc": "Initial release of NetherStuff mod on Modrinth.",
    // Metrics translations
    "metrics.title1": "Compatibility",
    "metrics.title2": "Matrix",
    "metrics.subtitle": "Version support and mod loader compatibility",
    "metrics.versionSupport": "Minecraft Version Support",
    "metrics.fullSupport": "Full Support",
    "metrics.supported": "Supported",
    "metrics.legacy": "Legacy",
    "metrics.unsupported": "Unsupported",
    "metrics.modLoaders": "Mod Loader Compatibility",
    "metrics.primary": "Primary",
    "metrics.planned": "Planned",
    "metrics.notPlanned": "Not Planned",
    "metrics.performanceImpact": "Performance Impact",
    "metrics.cpuEfficiency": "CPU Efficiency",
    "metrics.cpuDesc": "Minimal CPU overhead",
    "metrics.memoryUsage": "Memory Usage",
    "metrics.memoryDesc": "Optimized for low RAM",
    "metrics.compatibility": "Compatibility",
    "metrics.compatDesc": "Works with most mods",
    "lang.experimental": "Experimental",
  },
  de: {
    skipToContent: "Zum Inhalt springen",
    "nav.about": "Über mich",
    "nav.skills": "Fähigkeiten",
    "nav.projects": "Projekte",
    "nav.stats": "Statistiken",
    "nav.contact": "Kontakt",
    "hero.greeting": "Hi, ich bin",
    "hero.subtitle": "Portfolio — Entwickler & Modder",
    "hero.description":
      "Digitale Erlebnisse schmieden. Spezialisiert auf Minecraft Modding, Python Scripting und Low-Poly 3D-Modellierung.",
    "hero.viewProjects": "Projekte ansehen",
    "hero.getInTouch": "Kontakt aufnehmen",
    "about.title1": "Im Inneren des",
    "about.title2": "Codes",
    "about.p1":
      "Ich bin nicht nur ein Entwickler; ich bin ein Erbauer. Meine Leidenschaft liegt darin, zu verstehen wie Spiele funktionieren und sie in etwas Neues zu verwandeln.",
    "about.p2":
      "Derzeit konzentriere ich mich auf NeoForge, um die Grenzen von Minecraft zu erweitern und komplexe Mods zu erstellen, die Tiefe und Spannung hinzufügen. Wenn ich nicht in Java oder Python programmiere, modelliere ich Assets in Blockbench, um sicherzustellen, dass alles so gut aussieht wie es sich spielt.",
    "about.skill1": "Mod-Entwicklung",
    "about.skill2": "3D-Modellierung",
    "about.skill3": "Python Scripting",
    "about.skill4": "Performance",
    "skills.title1": "Tech",
    "skills.title2": "Arsenal",
    "skills.subtitle": "Die Werkzeuge, die ich nutze, um Ideen zum Leben zu erwecken",
    "projects.title1": "Ausgewählte",
    "projects.title2": "Arbeiten",
    "projects.subtitle": "Die Grenzen des Spiels erweitern",
    "projects.available": "Verfügbar",
    "projects.comingSoon": "Demnächst",
    "projects.download": "Herunterladen",
    "projects.viewModrinth": "Auf Modrinth ansehen",
    "projects.stayTuned": "Bleib dran",
    "projects.endstuffDesc":
      "Derzeit in Arbeit... Eine mystische Erweiterung der End-Dimension mit neuen Blöcken, Items und Abenteuern.",
    "stats.title1": "Code",
    "stats.title2": "Analytik",
    "stats.subtitle": "Meine Beiträge zur Open-Source-Welt",
    "contact.title1": "Nimm",
    "contact.title2": "Kontakt auf",
    "contact.subtitle":
      "Bereit, etwas Großartiges zu bauen? Ob eine neue Mod-Idee, ein Script oder einfach ein Gespräch über Minecraft-Entwicklung — mein Postfach ist offen.",
    "contact.github": "GitHub besuchen",
    "contact.discord": "Discord Nachricht",
    "contact.email": "E-Mail senden",
    "contact.namePlaceholder": "Dein Name",
    "contact.messagePlaceholder": "Deine Nachricht",
    "contact.send": "Nachricht senden",
    "footer.copyright": "© 2025 KaiTooast. Mit ♥ und Code erstellt.",
    "footer.backToTop": "Nach oben",
    // German Social Proof translations
    "social.title1": "Community",
    "social.title2": "Wirkung",
    "social.subtitle": "Meilensteine und Erfolge aus der Community",
    "social.totalDownloads": "Gesamte Downloads",
    "social.followers": "Follower",
    "social.githubStars": "GitHub Sterne",
    "social.active": "Aktiv",
    "social.discordCommunity": "Discord Community",
    "social.achievementsTitle": "Erfolge",
    "social.netherExplorer": "Nether Entdecker",
    "social.modrinthApproved": "Modrinth Genehmigt",
    "social.openSource": "Open Source",
    "social.endExplorer": "End Entdecker (Demnächst)",
    // German Blog/Updates translations
    "updates.title1": "Dev",
    "updates.title2": "Updates",
    "updates.subtitle": "Neueste Nachrichten und Entwicklungsfortschritt",
    "updates.filterAll": "Alle",
    "updates.filterNether": "NetherStuff",
    "updates.filterEnd": "EndStuff",
    "updates.soon": "Bald",
    "updates.delayed": "Verzögert",
    "updates.endstuff1Title": "EndStuff Entwicklung gestartet",
    "updates.endstuff1Desc":
      "Beginn der Arbeit an einer neuen End-Dimension Erweiterung. Planung einzigartiger Blöcke, Items und Spielmechaniken.",
    "updates.nether1Title": "Neue Nether-Blöcke hinzugefügt",
    "updates.nether1Desc":
      "Dekorative Nether-Blöcke und neue Crafting-Rezepte hinzugefügt. Verbesserte Kompatibilität mit anderen Mods.",
    "updates.nether2Title": "NeoForge 1.21 Unterstützung",
    "updates.nether2Desc":
      "NetherStuff für NeoForge Minecraft 1.21 aktualisiert. Bugfixes und Leistungsverbesserungen.",
    "updates.initialCommit": "Erster Commit",
    "updates.featureUpdate": "Feature Update",
    "updates.versionUpdate": "Versions Update",
    // German Timeline translations
    "timeline.title1": "Versions",
    "timeline.title2": "Historie",
    "timeline.subtitle": "Die Entwicklung meiner Mods über die Zeit",
    "timeline.upcoming": "Geplant",
    "timeline.endstuffDesc": "Erste Veröffentlichung der EndStuff Mod mit neuen End-Dimension Inhalten.",
    "timeline.nether12Desc": "Neue dekorative Blöcke und verbesserte Mod-Kompatibilität.",
    "timeline.nether11Desc": "NeoForge 1.21 Unterstützung mit Bugfixes und Leistungsverbesserungen.",
    "timeline.nether10Desc": "Erste Veröffentlichung der NetherStuff Mod auf Modrinth.",
    // German Metrics translations
    "metrics.title1": "Kompatibilitäts",
    "metrics.title2": "Matrix",
    "metrics.subtitle": "Versionsunterstützung und Mod-Loader Kompatibilität",
    "metrics.versionSupport": "Minecraft Versionsunterstützung",
    "metrics.fullSupport": "Volle Unterstützung",
    "metrics.supported": "Unterstützt",
    "metrics.legacy": "Veraltet",
    "metrics.unsupported": "Nicht unterstützt",
    "metrics.modLoaders": "Mod-Loader Kompatibilität",
    "metrics.primary": "Primär",
    "metrics.planned": "Geplant",
    "metrics.notPlanned": "Nicht geplant",
    "metrics.performanceImpact": "Performance Auswirkung",
    "metrics.cpuEfficiency": "CPU Effizienz",
    "metrics.cpuDesc": "Minimaler CPU-Overhead",
    "metrics.memoryUsage": "Speichernutzung",
    "metrics.memoryDesc": "Optimiert für wenig RAM",
    "metrics.compatibility": "Kompatibilität",
    "metrics.compatDesc": "Funktioniert mit den meisten Mods",
    "lang.experimental": "Experimentell",
  },
}

// Import Lucide Icons
const lucide = window.lucide

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  lucide.createIcons()

  // Set all dynamic links from config
  initializeLinks()

  // Load NetherStuff stats from API
  fetchNetherStuffStats()

  fetchEndStuffStats()

  // Initialize all features
  initKonamiCode()
  initMobileMenu()
  initNavbarScroll()
  initScrollReveal()
  initStarfield()
  initScrollToTop()

  initProjectCardEffects()

  initThemeToggle()
  initLanguageToggle()

  initUpdateFilters()
  initCounterAnimation()
  fetchCommunityStats()
})

// ============================================
// THEME TOGGLE
// ============================================
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle")
  const themeToggleMobile = document.getElementById("themeToggleMobile")
  const html = document.documentElement

  // Check for saved theme preference or default to dark
  const savedTheme = localStorage.getItem("theme") || "dark"
  setTheme(savedTheme)

  function setTheme(theme) {
    if (theme === "light") {
      html.classList.add("light")
      html.classList.remove("dark")
    } else {
      html.classList.remove("light")
      html.classList.add("dark")
    }
    localStorage.setItem("theme", theme)
    // Reinitialize Lucide icons to update visibility
    lucide.createIcons()
  }

  function toggleTheme() {
    const currentTheme = html.classList.contains("light") ? "light" : "dark"
    const newTheme = currentTheme === "light" ? "dark" : "light"
    setTheme(newTheme)
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme)
  }
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener("click", toggleTheme)
  }
}

// ============================================
// LANGUAGE TOGGLE
// ============================================
function initLanguageToggle() {
  const langToggle = document.getElementById("langToggle")
  const langToggleMobile = document.getElementById("langToggleMobile")
  const langLabel = document.getElementById("langLabel")
  const langLabelMobile = document.getElementById("langLabelMobile")

  // Check for saved language preference or default to English
  let currentLang = localStorage.getItem("language") || "en"
  setLanguage(currentLang)

  function setLanguage(lang) {
    currentLang = lang
    localStorage.setItem("language", lang)

    const label = lang === "en" ? "EN" : "DE"
    if (langLabel)
      langLabel.innerHTML =
        label +
        (lang === "de"
          ? ' <span class="lang-experimental-badge" title="' + TRANSLATIONS[lang]["lang.experimental"] + '">β</span>'
          : "")
    if (langLabelMobile)
      langLabelMobile.innerHTML =
        label +
        (lang === "de"
          ? ' <span class="lang-experimental-badge" title="' + TRANSLATIONS[lang]["lang.experimental"] + '">β</span>'
          : "")

    // Update all translatable elements
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n")
      if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
        // Handle HTML content with styled spans
        if (key === "hero.description") {
          el.innerHTML = TRANSLATIONS[lang][key]
            .replace("Minecraft Modding", '<span class="text-foreground font-semibold">Minecraft Modding</span>')
            .replace("Python", '<span class="text-foreground font-semibold">Python</span>')
            .replace("3D Modeling", '<span class="text-foreground font-semibold">3D Modeling</span>')
            .replace("3D-Modellierung", '<span class="text-foreground font-semibold">3D-Modellierung</span>')
        } else if (key === "about.p2") {
          el.innerHTML = TRANSLATIONS[lang][key]
            .replace("NeoForge", '<strong class="text-foreground">NeoForge</strong>')
            .replace("Blockbench", '<strong class="text-foreground">Blockbench</strong>')
        } else if (key === "footer.copyright") {
          el.innerHTML = TRANSLATIONS[lang][key].replace("♥", '<span class="text-red-500">♥</span>')
        } else {
          el.textContent = TRANSLATIONS[lang][key]
        }
      }
    })

    // Update placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder")
      if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
        el.placeholder = TRANSLATIONS[lang][key]
      }
    })

    // Update HTML lang attribute
    document.documentElement.lang = lang
  }

  function toggleLanguage() {
    const newLang = currentLang === "en" ? "de" : "en"
    setLanguage(newLang)
  }

  if (langToggle) {
    langToggle.addEventListener("click", toggleLanguage)
  }
  if (langToggleMobile) {
    langToggleMobile.addEventListener("click", toggleLanguage)
  }
}

// ============================================
// LINK INITIALIZATION
// ============================================
function initializeLinks() {
  // GitHub links
  const githubNavLink = document.getElementById("githubNavLink")
  const githubHeroLink = document.getElementById("githubHeroLink")
  const githubContactLink = document.getElementById("githubContactLink")

  if (githubNavLink) githubNavLink.href = CONFIG.GITHUB_PROFILE
  if (githubHeroLink) githubHeroLink.href = CONFIG.GITHUB_PROFILE
  if (githubContactLink) githubContactLink.href = CONFIG.GITHUB_PROFILE

  // Discord links
  const discordHeroLink = document.getElementById("discordHeroLink")
  const discordContactLink = document.getElementById("discordContactLink")

  if (discordHeroLink) discordHeroLink.href = CONFIG.DISCORD_USER
  if (discordContactLink) discordContactLink.href = CONFIG.DISCORD_USER

  // NetherStuff Modrinth link
  const netherstuffModrinthLink = document.getElementById("netherstuffModrinthLink")
  if (netherstuffModrinthLink) netherstuffModrinthLink.href = CONFIG.NETHERSTUFF_MODRINTH

  // GitHub Stats images
  const githubSnakeImg = document.getElementById("githubSnakeImg")
  const githubStatsImg = document.getElementById("githubStatsImg")
  const githubLangsImg = document.getElementById("githubLangsImg")
  const githubStreakImg = document.getElementById("githubStreakImg")

  if (githubSnakeImg) githubSnakeImg.src = CONFIG.GITHUB_SNAKE
  if (githubStatsImg) githubStatsImg.src = CONFIG.GITHUB_STATS
  if (githubLangsImg) githubLangsImg.src = CONFIG.GITHUB_LANGS
  if (githubStreakImg) githubStreakImg.src = CONFIG.GITHUB_STREAK
}

// ============================================
// NETHERSTUFF API FETCH (Stats Only)
// ============================================
async function fetchNetherStuffStats() {
  try {
    const response = await fetch(`${CONFIG.MODRINTH_API_BASE}/project/${CONFIG.NETHERSTUFF_SLUG}`, {
      headers: {
        "User-Agent": CONFIG.USER_AGENT,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const project = await response.json()

    // Update stats in the hardcoded card
    const downloadsEl = document.getElementById("netherstuffDownloads")
    const followersEl = document.getElementById("netherstuffFollowers")

    if (downloadsEl) downloadsEl.textContent = formatNumber(project.downloads) + " downloads"
    if (followersEl) followersEl.textContent = formatNumber(project.followers) + " followers"

    const descriptionEl = document.getElementById("netherstuffDescription")
    if (descriptionEl && project.description) {
      descriptionEl.textContent = project.description
    }
  } catch (error) {
    console.error("Error fetching NetherStuff stats:", error)
    // Show fallback text on error
    const downloadsEl = document.getElementById("netherstuffDownloads")
    const followersEl = document.getElementById("netherstuffFollowers")

    if (downloadsEl) downloadsEl.textContent = "Downloads unavailable"
    if (followersEl) followersEl.textContent = "Followers unavailable"
  }
}

// Download NetherStuff function
async function downloadNetherStuff() {
  try {
    const response = await fetch(`${CONFIG.MODRINTH_API_BASE}/project/${CONFIG.NETHERSTUFF_SLUG}/version`, {
      headers: {
        "User-Agent": CONFIG.USER_AGENT,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch versions")
    }

    const versions = await response.json()

    if (versions.length === 0) {
      alert("No versions available for download")
      return
    }

    const latestVersion = versions[0]
    const primaryFile = latestVersion.files.find((f) => f.primary) || latestVersion.files[0]

    if (primaryFile && primaryFile.url) {
      window.open(primaryFile.url, "_blank")
    } else {
      window.open(`${CONFIG.NETHERSTUFF_MODRINTH}/versions`, "_blank")
    }
  } catch (error) {
    console.error("Download error:", error)
    window.open(`${CONFIG.NETHERSTUFF_MODRINTH}/versions`, "_blank")
  }
}

// Make downloadNetherStuff globally available
window.downloadNetherStuff = downloadNetherStuff

// ============================================
// ENDSTUFF API FETCH (Stats Only)
// ============================================
async function fetchEndStuffStats() {
  try {
    const response = await fetch(`${CONFIG.MODRINTH_API_BASE}/project/${CONFIG.ENDSTUFF_SLUG}`, {
      headers: {
        "User-Agent": CONFIG.USER_AGENT,
      },
    })

    if (!response.ok) {
      // Project not found - show coming soon state
      console.log("EndStuff not yet available on Modrinth")
      return
    }

    const project = await response.json()

    // Update stats if project exists
    const downloadsEl = document.getElementById("endstuffDownloads")
    const followersEl = document.getElementById("endstuffFollowers")
    const descriptionEl = document.getElementById("endstuffDescription")

    if (downloadsEl) downloadsEl.textContent = formatNumber(project.downloads) + " downloads"
    if (followersEl) followersEl.textContent = formatNumber(project.followers) + " followers"
    if (descriptionEl && project.description) {
      descriptionEl.textContent = project.description
    }
  } catch (error) {
    console.log("EndStuff stats fetch failed - project likely not published yet")
    // Keep the "Coming Soon" state
  }
}

// Download EndStuff function (for when it becomes available)
async function downloadEndStuff() {
  try {
    const response = await fetch(`${CONFIG.MODRINTH_API_BASE}/project/${CONFIG.ENDSTUFF_SLUG}/version`, {
      headers: {
        "User-Agent": CONFIG.USER_AGENT,
      },
    })

    if (!response.ok) {
      alert("EndStuff is not yet available for download. Stay tuned!")
      return
    }

    const versions = await response.json()

    if (versions.length === 0) {
      alert("No versions available for download yet")
      return
    }

    const latestVersion = versions[0]
    const primaryFile = latestVersion.files.find((f) => f.primary) || latestVersion.files[0]

    if (primaryFile && primaryFile.url) {
      window.open(primaryFile.url, "_blank")
    } else {
      window.open(`${CONFIG.ENDSTUFF_MODRINTH}/versions`, "_blank")
    }
  } catch (error) {
    console.error("Download error:", error)
    alert("EndStuff is coming soon! Check back later.")
  }
}

// Make downloadEndStuff globally available
window.downloadEndStuff = downloadEndStuff

// ============================================
// PROJECT CARD 3D EFFECTS
// ============================================
function initProjectCardEffects() {
  const cards = document.querySelectorAll(".project-card")

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 20
      const rotateY = (centerX - x) / 20

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)"
    })
  })
}

// ============================================
// KONAMI CODE EASTER EGG
// ============================================
function initKonamiCode() {
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ]
  let konamiIndex = 0

  document.addEventListener("keydown", (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++

      if (konamiIndex === konamiCode.length) {
        activateEasterEgg()
        konamiIndex = 0
      }
    } else {
      konamiIndex = 0
    }
  })
}

function activateEasterEgg() {
  const message = document.getElementById("easterEggMessage")
  document.body.classList.add("easter-egg-active")
  message.classList.add("show")

  setTimeout(() => {
    message.classList.remove("show")
  }, 3000)

  setTimeout(() => {
    document.body.classList.remove("easter-egg-active")
  }, 6000)
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
  const menuBtn = document.getElementById("menuBtn")
  const mobileMenu = document.getElementById("mobileMenu")
  const mobileLinks = document.querySelectorAll(".mobile-link")
  let isMenuOpen = false

  function toggleMenu() {
    isMenuOpen = !isMenuOpen
    if (isMenuOpen) {
      mobileMenu.classList.remove("hidden")
      setTimeout(() => mobileMenu.classList.remove("scale-y-0"), 10)
    } else {
      mobileMenu.classList.add("hidden")
    }
  }

  if (menuBtn) {
    menuBtn.addEventListener("click", toggleMenu)
  }

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (isMenuOpen) toggleMenu()
    })
  })
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function initNavbarScroll() {
  const navbar = document.getElementById("navbar")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("shadow-lg", "bg-black/50")
    } else {
      navbar.classList.remove("shadow-lg", "bg-black/50")
    }
  })
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
let observer

function initScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el)
  })
}

// ============================================
// STARFIELD BACKGROUND
// ============================================
function initStarfield() {
  const canvas = document.getElementById("starfield")
  const ctx = canvas.getContext("2d")
  let stars = []
  let width, height
  let resizeTimeout

  function resize() {
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = width
    canvas.height = height
    initStars()
  }

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(resize, 200)
  })

  function initStars() {
    stars = []
    const starCount = Math.floor((width * height) / 8000)
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 2,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        speed: Math.random() * 0.3 + 0.1,
      })
    }
  }

  function animateStars() {
    ctx.fillStyle = "rgba(5, 5, 7, 0.4)"
    ctx.fillRect(0, 0, width, height)

    ctx.fillStyle = "white"
    stars.forEach((star) => {
      star.y += star.speed * (star.z * 0.5 + 0.5)

      if (star.y > height) {
        star.y = 0
        star.x = Math.random() * width
        star.z = Math.random() * 2
      }

      ctx.globalAlpha = star.opacity * (Math.sin(Date.now() * 0.001 + star.x * 0.01) * 0.5 + 0.5)
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.size * (star.z * 0.5 + 0.5), 0, Math.PI * 2)
      ctx.fill()
    })

    requestAnimationFrame(animateStars)
  }

  resize()
  animateStars()
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
function initScrollToTop() {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn")

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollToTopBtn.classList.add("visible")
    } else {
      scrollToTopBtn.classList.remove("visible")
    }
  })

  // Scroll to top on click
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// ============================================
// ============================================
function initUpdateFilters() {
  const filterBtns = document.querySelectorAll(".update-filter-btn")
  const updateCards = document.querySelectorAll(".update-card")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active button
      filterBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      const filter = btn.dataset.filter

      // Filter cards
      updateCards.forEach((card) => {
        if (filter === "all" || card.dataset.project === filter) {
          card.classList.remove("hidden")
          card.style.position = "relative"
        } else {
          card.classList.add("hidden")
        }
      })
    })
  })
}

// ============================================
// ============================================
function initCounterAnimation() {
  const counters = document.querySelectorAll(".counter")

  const observerOptions = {
    threshold: 0.5,
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target
        const target = Number.parseInt(counter.dataset.target) || 0
        animateCounter(counter, target)
        counterObserver.unobserve(counter)
      }
    })
  }, observerOptions)

  counters.forEach((counter) => {
    counterObserver.observe(counter)
  })
}

function animateCounter(element, target) {
  const duration = 2000
  const start = 0
  const startTime = performance.now()

  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Easing function
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    const current = Math.floor(easeOutQuart * target)

    element.textContent = formatNumber(current)

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
}

// ============================================
// ============================================
async function fetchCommunityStats() {
  try {
    // Fetch NetherStuff stats for totals
    const netherstuffResponse = await fetch(`${CONFIG.MODRINTH_API_BASE}/project/${CONFIG.NETHERSTUFF_SLUG}`, {
      headers: { "User-Agent": CONFIG.USER_AGENT },
    })

    if (netherstuffResponse.ok) {
      const project = await netherstuffResponse.json()

      // Update counters with data targets
      const downloadsCounter = document.getElementById("totalDownloadsCounter")
      const followersCounter = document.getElementById("totalFollowersCounter")

      if (downloadsCounter) {
        downloadsCounter.dataset.target = project.downloads
        animateCounter(downloadsCounter, project.downloads)
      }
      if (followersCounter) {
        followersCounter.dataset.target = project.followers
        animateCounter(followersCounter, project.followers)
      }
    }

    // Fetch GitHub stars
    const githubResponse = await fetch("https://api.github.com/users/KaiTooast/repos")
    if (githubResponse.ok) {
      const repos = await githubResponse.json()
      const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)

      const starsCounter = document.getElementById("githubStarsCounter")
      if (starsCounter) {
        starsCounter.dataset.target = totalStars
        animateCounter(starsCounter, totalStars)
      }
    }
  } catch (error) {
    console.error("Error fetching community stats:", error)
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

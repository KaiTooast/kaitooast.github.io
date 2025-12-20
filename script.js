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

  // Initialize all features
  initKonamiCode()
  initMobileMenu()
  initNavbarScroll()
  initScrollReveal()
  initStarfield()
  initScrollToTop()
})

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
// UTILITY FUNCTIONS
// ============================================
function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

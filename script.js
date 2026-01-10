// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
  GITHUB_PROFILE: "https://github.com/KaiTooast",
  DISCORD_USER: "https://discord.com/users/918149823587307580",
}

const lucide = window.lucide

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons()
  initMobileMenu()
  initNavbarScroll()
  initScrollReveal()
  initStarfield()
  initScrollToTop()
  initThemeToggle()
  initProjectCardEffects()
})

// ============================================
// THEME TOGGLE
// ============================================
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle")
  const themeToggleMobile = document.getElementById("themeToggleMobile")
  const html = document.documentElement

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
    lucide.createIcons()
  }

  function toggleTheme() {
    const currentTheme = html.classList.contains("light") ? "light" : "dark"
    const newTheme = currentTheme === "light" ? "dark" : "light"
    setTheme(newTheme)
  }

  if (themeToggle) themeToggle.addEventListener("click", toggleTheme)
  if (themeToggleMobile) themeToggleMobile.addEventListener("click", toggleTheme)
}


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

  if (menuBtn) menuBtn.addEventListener("click", toggleMenu)
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
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el))
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
      star.y += star.speed
      if (star.y > height) {
        star.y = 0
        star.x = Math.random() * width
      }
      ctx.globalAlpha = star.opacity
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
      ctx.fill()
    })
    ctx.globalAlpha = 1
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

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollToTopBtn.classList.add("visible")
    } else {
      scrollToTopBtn.classList.remove("visible")
    }
  })

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  })
}

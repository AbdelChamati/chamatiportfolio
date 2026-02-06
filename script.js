document.addEventListener("DOMContentLoaded", () => {
  console.log("JS loaded");

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const reveals = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");
const body = document.body;
const themeToggle = document.getElementById("themeToggle");


const cvBtn = document.getElementById('cvBtn');
const cvDownload = document.querySelector('.cv-download');
const heroTitle = document.getElementById("heroTitle");

/* Animation Title */

// split into words
// Split into words
const words = heroTitle.innerText.split(" ");
heroTitle.innerHTML = words
  .map(word => `<span class="word">${word}&nbsp;</span>`)
  .join("");

const wordElements = document.querySelectorAll("#heroTitle .word");

function animateWords() {
  wordElements.forEach((w, i) => {
    w.style.opacity = 0;
    w.style.transform = "translateY(20px)";
    w.style.animation = `none`; // reset
    setTimeout(() => {
      w.style.animation = `wordIn 0.6s forwards`;
      w.style.animationDelay = `${i * 0.15}s`;
    }, 50); // small delay to force restart
  });
}

// Loop continuously
setInterval(animateWords, words.length * 150 + 2000); // 2s pause after full reveal

// Initial run
animateWords();

/* Button */

if (cvBtn && cvDownload) {
    cvBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent window click from closing immediately
      cvDownload.classList.toggle('show');
    });

    // Close dropdown if clicked outside
    window.addEventListener('click', () => {
      cvDownload.classList.remove('show');
    });
  }

/* ================================================ */

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
    });
});

// ===== EMAILJS =====
(function () {
    emailjs.init("NwH6GBfaFp-U1Zzkc"); // <-- your public key
})();

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formStatus");
const submitButton = contactForm.querySelector("button");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Honeypot anti-spam
    if (contactForm.website.value !== "") {
        return;
    }

    submitButton.classList.add("loading");
    formMessage.textContent = "Sending message...";

    emailjs.sendForm(
        "gmail",    /* SERVICE ID */
        "template_eqgpmgz",  /* Template ID */
        this
    )
        .then(() => {
            formMessage.textContent = "✅ Message sent successfully!";
            contactForm.reset();
        })
        .catch((error) => {
            console.error(error);
            formMessage.textContent = "❌ Failed to send message. Please try again.";
        })
        .finally(() => {
            submitButton.classList.remove("loading");
        });
});


/* Reveal */
const revealOnScroll = () => {
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            el.classList.add("active");
        }
    });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* Scroll */

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});






/* ============================================= */

  if (!themeToggle) {
    console.error("❌ themeToggle button NOT found");
    return;
  }

  console.log("✅ themeToggle found");

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    console.log("🌙 Toggle clicked");

    body.classList.toggle("dark");

    const isDark = body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
  });
});

/* Button */




// Prevent scrolling on page load
// window.addEventListener("load", function () {
//   window.scrollTo(0, 0);

//   if (window.location.hash) {
//     var currentUrl = window.location.href;
//     var cleanUrl = currentUrl.substring(0, currentUrl.indexOf("#"));
//     history.replaceState({}, document.title, cleanUrl);
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  var i = 0;
  const txt =
    "Montreal-based programmer creating innovative, user-centric digital solutions for dynamic and forward-thinking organizations.";
  const speed = 50;

  function typeWriter() {
    if (i < txt.length) {
      document.getElementById("profile-description").innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  window.addEventListener("load", typeWriter);
  typeWriter();
});

// Turns the nav links white when the background is dark
document.addEventListener("DOMContentLoaded", function () {
  const logo = document.querySelectorAll(".logo a");
  const hamburgerIcon = document.querySelectorAll(".hamburger-icon span");
  const menuLinks = document.querySelectorAll(".menu-links a");
  const navLinks = document.querySelectorAll(".nav-links a"); // Select all nav links
  const sections = document.querySelectorAll("section"); // Assuming you have sections that determine the background
  const darkSectionIds = ["projects", "contact"]; // IDs of sections with dark backgrounds

  function updateNavLinkColors() {
    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;

    let isDarkBackground = false;
    sections.forEach((section) => {
      if (
        darkSectionIds.includes(section.id) &&
        scrollPosition >= section.offsetTop - 40 &&
        scrollPosition < section.offsetTop + section.offsetHeight - 40
      ) {
        isDarkBackground = true;
      }
    });

    navLinks.forEach((link) => {
      if (isDarkBackground) {
        link.classList.add("light-text");
      } else {
        link.classList.remove("light-text");
      }
    });

    logo.forEach((link) => {
      if (isDarkBackground) {
        link.classList.add("light-text");
      } else {
        link.classList.remove("light-text");
      }
    });

    hamburgerIcon.forEach((link) => {
      if (isDarkBackground) {
        link.classList.add("light-icon");
      } else {
        link.classList.remove("light-icon");
      }
    });

    menuLinks.forEach((link) => {
      if (isDarkBackground) {
        link.classList.add("light-text");
      } else {
        link.classList.remove("light-text");
      }
    });
  }

  window.addEventListener("scroll", updateNavLinkColors);
  updateNavLinkColors(); // Initial check on load
});

// Navigation hamburger menu
function toggleMenu() {
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const menuLinks = document.querySelector(".menu-links");
  hamburgerIcon.classList.toggle("open");
  menuLinks.classList.toggle("open");
}

// Functionality for project slider buttons
document.addEventListener("click", (e) => {
  let slideBtn;
  if (e.target.matches(".slide-btn")) {
    slideBtn = e.target;
  } else {
    slideBtn = e.target.closest(".slide-btn");
  }
  if (slideBtn != null) onHandleClick(slideBtn);
});

function onHandleClick(handle) {
  const slider = handle
    .closest(".project-slider")
    .querySelector(".project-list");
  const scrollAmount = 500; // Number of pixels to scroll

  if (handle.classList.contains("prev-btn")) {
    slider.scrollBy({
      top: 0,
      left: -scrollAmount,
      behavior: "smooth",
    });
  }

  if (handle.classList.contains("next-btn")) {
    slider.scrollBy({
      top: 0,
      left: scrollAmount,
      behavior: "smooth",
    });
  }
}

// Ensures that project slider buttons are visible only when needed
document.addEventListener("DOMContentLoaded", () => {
  const projectList = document.querySelector(".project-list");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const firstProject = document.getElementById("first-project");
  const lastProject = document.getElementById("last-project");

  function checkScrollPosition() {
    const maxScrollLeft = projectList.scrollWidth - projectList.clientWidth;
    const firstProjectMarginLeft = parseFloat(
      getComputedStyle(firstProject).paddingLeft
    );
    const lastProjectMarginRight = parseFloat(
      getComputedStyle(lastProject).paddingRight
    );

    if (projectList.scrollLeft <= firstProjectMarginLeft) {
      prevBtn.style.opacity = "0";
      prevBtn.style.pointerEvents = "none";
    } else {
      prevBtn.style.opacity = "1";
      prevBtn.style.pointerEvents = "auto";
    }

    if (projectList.scrollLeft >= maxScrollLeft - lastProjectMarginRight) {
      nextBtn.style.opacity = "0";
      nextBtn.style.pointerEvents = "none";
    } else {
      nextBtn.style.opacity = "1";
      nextBtn.style.pointerEvents = "auto";
    }
  }

  projectList.addEventListener("scroll", checkScrollPosition);
  checkScrollPosition();
});

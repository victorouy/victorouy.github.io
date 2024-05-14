// Prevent scrolling on page load
window.addEventListener("load", function () {
  window.scrollTo(0, 0);

  if (window.location.hash) {
    var currentUrl = window.location.href;
    var cleanUrl = currentUrl.substring(0, currentUrl.indexOf("#"));
    history.replaceState({}, document.title, cleanUrl);
  }
});

// Turns the nav links white when the background is dark
document.addEventListener("DOMContentLoaded", function () {
  const logo = document.querySelectorAll(".logo a");
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
        scrollPosition >= section.offsetTop - 45 &&
        scrollPosition < section.offsetTop + section.offsetHeight - 45
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
  }

  window.addEventListener("scroll", updateNavLinkColors);
  updateNavLinkColors(); // Initial check on load
});

// Navigation menu
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

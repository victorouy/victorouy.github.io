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

const initSlider = () => {
  const imageList = document.querySelector(".project-slider .project-list");
  const slideButtons = document.querySelectorAll(
    ".project-slider .slide-button"
  );
  const sliderScrollbar = document.querySelector(
    ".container .slider-scrollbar"
  );
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  // Handle scrollbar thumb drag
  scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;
    const maxThumbPosition =
      sliderScrollbar.getBoundingClientRect().width -
      scrollbarThumb.offsetWidth;

    // Update thumb position on mouse move
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;
      // Ensure the scrollbar thumb stays within bounds
      const boundedPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );
      const scrollPosition =
        (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    };
    // Remove event listeners on mouse up
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    // Add event listeners for drag interaction
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });
  // // Slide images according to the slide button clicks
  // slideButtons.forEach((button) => {
  //   button.addEventListener("click", () => {
  //     const direction = button.id === "prev-slide" ? -1 : 1;
  //     const scrollAmount = imageList.clientWidth * direction;
  //     imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
  //   });
  // });
  // // Show or hide slide buttons based on scroll position
  // const handleSlideButtons = () => {
  //   slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
  //   slideButtons[1].style.display =
  //     imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
  // };
  // Update scrollbar thumb position based on image scroll
  const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };
  // Call these two functions when image list scrolls
  imageList.addEventListener("scroll", () => {
    updateScrollThumbPosition();
    // handleSlideButtons();
  });
};
window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);

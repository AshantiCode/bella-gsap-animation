gsap.registerPlugin(ScrollTrigger);

function initNavigation() {
  const mainNavLinks = gsap.utils.toArray(".main-nav a");

  mainNavLinks.forEach((link) => {
    link.addEventListener("mouseleave", (e) => {
      // add class
      link.classList.add("animate-out");
      //remove after animate out done, 2. Varianten
      //   setTimeout(() => {
      //     link.classList.remove("animate-out");
      //   }, 300);

      link.ontransitionend = function () {
        link.classList.remove("animate-out");
      };
    });
  });
}

function init() {
  initNavigation();
}

window.addEventListener("load", function () {
  init();
});

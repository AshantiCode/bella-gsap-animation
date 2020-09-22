gsap.registerPlugin(ScrollTrigger);

function initNavigation() {
  const mainNavLinks = gsap.utils.toArray(".main-nav a");
  const mainNavLinksRev = gsap.utils.toArray(".main-nav a").reverse();

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

  function navAnimation(direction) {
    const scrollingDown = direction === 1;
    const links = scrollingDown ? mainNavLinks : mainNavLinksRev;

    return gsap.to(links, {
      duration: 0.3,
      stagger: 0.05,
      autoAlpha: () => (scrollingDown ? 0 : 1),
      y: () => (scrollingDown ? -20 : 0),
      ease: "power4.out",
    });
  }

  ScrollTrigger.create({
    start: 100,
    end: "bottom bottom-=30",
    toggleClass: {
      targets: "body",
      className: "has-scrolled",
    },
    onEnter: ({ direction }) => navAnimation(direction),
    onLeaveBack: ({ direction }) => navAnimation(direction),
    // markers: true,
  });
}

function initHeaderTilt() {
  document.querySelector("header").addEventListener("mousemove", moveImages);
}

function moveImages(e) {
  const { offsetX, offsetY, target } = e;
  const { clientWidth, clientHeight } = e.target;

  console.log(offsetX, offsetY, clientWidth, clientHeight);
}

function init() {
  initNavigation();
  initHeaderTilt();
}

window.addEventListener("load", function () {
  init();
});

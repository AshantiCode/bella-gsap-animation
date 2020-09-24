gsap.registerPlugin(ScrollTrigger);

const allLinks = gsap.utils.toArray(".portfolio__categories a")
const imageLarge = document.querySelector(".portfolio__image--l")
const imageSmall = document.querySelector(".portfolio__image--s")
const lInside = document.querySelector(".portfolio__image--l .image_inside")
const sInside = document.querySelector(".portfolio__image--s .image_inside")
const pageBackground = document.querySelector(".fill-background")

function initPortfolioHover() {
	allLinks.forEach(link => {
		link.addEventListener("mouseenter", createPortfolioHover)
		link.addEventListener("mouseleave", createPortfolioHover)
		link.addEventListener("mousemove", createPortfolioMove)

	})
};

function createPortfolioHover(e) {
	const activeLink = e.target
	const allSiblings = allLinks.filter(item => item !== activeLink)
	const {color, imagelarge, imagesmall } = activeLink.dataset

	if(e.type === "mouseenter") {
		const tl = gsap.timeline()
		tl
			.set(sInside, {backgroundImage: `url(${imagesmall})`})
			.set(lInside, {backgroundImage: `url(${imagelarge})`}, 0)
			.to([imageSmall, imageLarge], {autoAlpha: 1}, 0)
			.to(activeLink, {color: "#fff", autoAlpha: 1}, 0)
			.to(allSiblings, {color: "#fff", autoAlpha: 0.2}, 0)
			.to(pageBackground, {backgroundColor: color},0)
			
	} else if (e.type === "mouseleave") {
		const tl = gsap.timeline()
		tl
			.to([imageSmall, imageLarge], {autoAlpha: 0}, 0)
			.to(allLinks, {color: "#000", autoAlpha: 1},0)
			.to(pageBackground, {backgroundColor: "#ACB7AE"})

	
	}
}

function createPortfolioMove(e) {
	const {clientY} = e
	gsap.to(imageLarge, {
		duration: 1.2,
		y: getPortfolioOffset(clientY)/3,
		ease: "power3.out"
	})

	gsap.to(imageSmall, {
		duration: 1.5,
		y: getPortfolioOffset(clientY)/6,
		ease: "power3.out"
	})
}

function getPortfolioOffset(clientY) {
	return -(document.querySelector(".portfolio__categories").clientHeight - clientY);
}

function init(){
	initPortfolioHover()
}

window.addEventListener('load', function(){
    init();
});

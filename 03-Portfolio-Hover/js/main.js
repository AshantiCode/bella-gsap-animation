gsap.registerPlugin(ScrollTrigger);


const allLinks = gsap.utils.toArray(".portfolio__categories a")
const pageBackground = document.querySelector(".fill-background")
const largeImage = document.querySelector(".portfolio__image--l")
const smallImage = document.querySelector(".portfolio__image--s")
const lInside = document.querySelector(".portfolio__image--l .image_inside")
const sInside = document.querySelector(".portfolio__image--s .image_inside")

function initPortfolioHover() {
	
	allLinks.forEach(link => {
		link.addEventListener("mouseenter", createPortfolioHover)
		link.addEventListener("mouseleave", createPortfolioHover)

	})
};

function createPortfolioHover(e) {
	const activeLink = e.target
	const allSiblings = allLinks.filter(item => item !== activeLink)
	const { color, imagelarge, imagesmall} = e.target.dataset

	if(e.type === "mouseenter") {
		const tl = gsap.timeline()

		tl
			.set(sInside, {backgroundImage: `url(${imagesmall})`})
			.set(lInside,{backgroundImage: `url(${imagelarge})`})
			.to([smallImage, largeImage], {autoAlpha: 1},0)
			.to(allSiblings, {color: "#fff", autoAlpha: 0.2},0)
			.to(activeLink, {color: "#fff", autoAlpha: 1}, 0)
			.to(pageBackground, {backgroundColor: `${color}`})

	} else if (e.type === "mouseleave") {
		const tl = gsap.timeline()
		tl
			.to([smallImage, largeImage], {autoAlpha: 0},0)
			.to(pageBackground, {backgroundColor: "#ACB7AE"},0)
			.to(allLinks, {color: "#000", autoAlpha: 1},0)
	
	}
}






function init(){
	initPortfolioHover()
}

window.addEventListener('load', function(){
    init();
});

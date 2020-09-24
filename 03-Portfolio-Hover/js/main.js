gsap.registerPlugin(ScrollTrigger);


const links = gsap.utils.toArray(".portfolio__categories a")

function initLinkHover() {
	
	links.forEach(link => {
		link.addEventListener("mouseenter", hoverEffekt)
		// link.addEventListener("mouseleave", hoverEffekt)

	})
};

function hoverEffekt(e) {
	// console.log(e.target)
	const imgLMask = document.querySelector(".portfolio__image--l")
	const imgSMask = document.querySelector(".portfolio__image--s")
	const imgInsideL = document.querySelector(".portfolio__image--l .image_inside")
	const imgInsideS = document.querySelector(".portfolio__image--s .image_inside")
	const imageWrapper = document.querySelector(".image-wrapper")
	const activeLink = e.target
	const activeLinkPos = activeLink.offsetTop
	// const activeImgL = activeLink.attributes[2].value
	const activeImgS = activeLink.dataset.imagesmall
	const activeImgL = activeLink.dataset.imagelarge

	console.log({activeLink})
	// console.log({activeImgL});
	// console.log({activeImgS});

	if(e.type === "mouseenter") {
		const tl = gsap.timeline({defaults: {duration: 0.7, ease: "power3.out"}})

		tl
			.to(links, {color: "#fff", opacity: 0.2})
			.to(activeLink, {color: "#fff", opacity: 1}, 0)
			.to(imageWrapper, {y: -activeLinkPos})
			.to(imgInsideL, {autoAlpha: 1, backgroundImage: `url(${activeImgL})`},0)
			.to(imgInsideS, {autoAlpha: 1, backgroundImage: `url(${activeImgS})`},0)
			.to(imgLMask, {autoAlpha: 1, opacity: 1}, 0)
			.to(imgSMask, {autoAlpha: 1, opacity: 1}, 0)
	// changing the backgrounimage/ make images visible (autoalpha?)
	// change background color

	} else if (e.type === "mouseleave") {
		const tl = gsap.timeline({defaults: {duration: 1, ease: "power3.out"}})
		
	//fade font color back to default
	//fade background color back two default
	}
}






function init(){
    initLinkHover()
}

window.addEventListener('load', function(){
    init();
});

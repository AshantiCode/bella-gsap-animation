gsap.registerPlugin(ScrollTrigger);


const links = gsap.utils.toArray(".portfolio__categories a")

function initLinkHover() {
	
	links.forEach(link => {
		link.addEventListener("mouseenter", hoverEffekt)
		link.addEventListener("mouseleave", hoverEffekt)

	})
};

function hoverEffekt(e) {
	// console.log(e.target)
	const imgL = document.querySelector(".portfolio__image--l")
	const imgS = document.querySelector(".portfolio__image--s")
	const categories = document.querySelector(".portfolio__categories")
	const activeLink = e.target

	if(e.type === "mouseenter") {
		const tl = gsap.timeline({defaults: {duration: 1, ease: "power3.out"}})

		tl
			.to(links, {color: "#fff", opacity: 0.2})
			.to(activeLink, {color: "#fff", opacity: 1}, 0)
		//change font color to pure white
	//all the others 0.2 opacite
	// changing the backgrounimage/ make images visible (autoalpha?)
	// change background color

	} else if (e.type === "mouseleave") {
//hiding thw 2 images
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

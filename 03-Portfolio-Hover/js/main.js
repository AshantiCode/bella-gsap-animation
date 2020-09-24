gsap.registerPlugin(ScrollTrigger);



function initLinkHover() {
	const links = gsap.utils.toArray(".portfolio__categories a")
	
	links.forEach(link => {
		link.addEventListener("mouseenter", hoverEffekt)
		link.addEventListener("mouseleave", hoverEffekt)

	})
	// on mouseenter
	//change font color to pure white
	//all the others 0.2 opacite
	// changing the backgrounimage/ make images visible (autoalpha?)
	// change background color

	//on mouseleave
	//hiding thw 2 images
	//fade font color back to default
	//fade background color back two default
};

function hoverEffekt(e) {
	console.log(e.type)
	if(e.type === mouseenter) {
		//change font color to pure white
	//all the others 0.2 opacite
	// changing the backgrounimage/ make images visible (autoalpha?)
	// change background color

	} else if (e.type === mouseleave) {
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

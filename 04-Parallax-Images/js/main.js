gsap.registerPlugin(ScrollTrigger);


function initImageParallax() {
	//get all the sections with parallax img
	const withParallax = gsap.utils.toArray("#with-parallax")

	withParallax.forEach(section => {
		//get the image from each section
		const blogPost=  document.querySelector(".blog__image")
		const image =  section.querySelector("img")
		const {color} = section.dataset
		console.log(color);

		//create tween for the image

		const tl =  gsap.timeline() 
		tl
		.to(image, {
			yPercent: 25,
			ease: "none",
			scrollTrigger: {
				trigger: section,
				start: "top center+=20%",
				end: "bottom top",
				scrub: true
			}
		})
		
	})
} //end init Parallax

function initPinSteps() {
	ScrollTrigger.create({
		trigger: ".fixed-nav",
		start: "top center",
		endTrigger: ".stage4",
		end: "center center",
		pin: true,
		markers: true
	})
}

function init(){
	initImageParallax()
	initPinSteps()
}

window.addEventListener('load', function(){
    init();
});

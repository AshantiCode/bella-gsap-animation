gsap.registerPlugin(ScrollTrigger);


function initImageParallax() {
	//get all the sections with parallax img
	const withParallax = gsap.utils.toArray("#with-parallax")

	withParallax.forEach(section => {
		//get the image from each section
		const blogPost=  document.querySelector(".blog__image")
		const image =  section.querySelector("img")
		console.log(image);

		//create tween for the image
		gsap.to(image, {
			yPercent: 20,
			ease: "none",
			scrollTrigger: {
				trigger: section,
				start: "top center+=20%",
				end: "bottom top+=100",
				markers: true,
				scrub: true
			}
		})
	})

	
	
}


function init(){
	initImageParallax()
	//select all the sections with the right class
	// get image inside of it
	// tween for each images
	
    // start here

}

window.addEventListener('load', function(){
    init();
});

gsap.registerPlugin(ScrollTrigger);


function initImageParallax() {
	//get all the sections with parallax img
	const withParallax = gsap.utils.toArray(".with-parallax")

	withParallax.forEach(section => {
		//get the image from each section
		const image =  section.querySelector("img")

		//create tween for the image parallax effeckt
		gsap.to(image, {
			yPercent: 25,
			ease: "none",
			scrollTrigger: {
				trigger: section,
				start: "top center+=20%",
				end: "bottom top",
				scrub: true
			}
		})
	}) //end with parallax
} //end init Parallax

function initPinSteps() {
	ScrollTrigger.create({
		trigger: ".fixed-nav",
		start: "top center",
		endTrigger: ".stage4",
		end: "center center",
		pin: true,
	})

	// get viewport height
	const getVh = () => {
		const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
		return vh;
	}

	// update body color function , the GSAP Way, but this
	// time we make it with CSS Variables
	function updateBodyColor(color) {
		// gsap.to(".fill-background", {backgroundColor: color})   //gsap way
		document.documentElement.style.setProperty("--bcg-fill-color", color, )
	}

	// reset to default bodycolor on scrool back up
	function  resetBodyColor(defColor) {
		document.documentElement.style.setProperty("--bcg-fill-color", defColor, )
	}

	// get the stages and links for setting the active classes
	const stages = gsap.utils.toArray(".stage")
	stages.forEach((stage, index) => {
		const navLinks = gsap.utils.toArray(".fixed-nav li")
		const color = stage.dataset.color

	//add is-active class when section scrolls into view + bodycolor
		ScrollTrigger.create({
			trigger: stage,
			start: "top center",
			end: () =>`+=${stage.clientHeight + getVh/10}`,
			toggleClass: {
				targets: navLinks[index],
				className: "is-active"
			},
			markers: true,
			onEnter: ()=> updateBodyColor(color),
			onEnterBack: ()=> updateBodyColor(color),
			onLeaveBack: ()=> resetBodyColor("#acb7ae")
		})
	})
}

function init(){
	initImageParallax()
	initPinSteps()
}

window.addEventListener('load', function(){
    init();
});

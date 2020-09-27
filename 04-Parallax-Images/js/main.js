gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


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
	// Pin left navigation
	ScrollTrigger.create({
		trigger: ".fixed-nav",
		start: "top center",
		endTrigger: "#stage4",
		end: "center center",
		pin: true,
	})

	// get viewport height
	const getVh = () => {
		const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
		return vh;
	}

	// update body color function , gsap && CSS way
	function updateBodyColor(color) {
		// gsap.to(".fill-background", {backgroundColor: color})   //gsap way
		document.documentElement.style.setProperty("--bcg-fill-color", color, )
	}

	// reset to default bodycolor on scrool back up to first element
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
			end: () =>`+=${stage.clientHeight+ getVh() / 10}`,
			toggleClass: {
				targets: navLinks[index],
				className: "is-active",
			},
			onEnter: ()=> updateBodyColor(color),
			onEnterBack: ()=> updateBodyColor(color),
			onLeaveBack: ()=> resetBodyColor("#acb7ae")
		})
	})
}

function initScrollTo() {
	
	const links = gsap.utils.toArray("li a")
	links.forEach(link => {
		const target =  link.getAttribute("href")
		
		link.addEventListener("click", (e) => {
			e.preventDefault()
			gsap.to(window, {
				duration: 1.5,
				scrollTo: target,
				ease: "power2.out"
			})
		})
	})
}

function init(){
	initImageParallax()
	initPinSteps()
	initScrollTo()
}

window.addEventListener('load', function(){
    init();
});

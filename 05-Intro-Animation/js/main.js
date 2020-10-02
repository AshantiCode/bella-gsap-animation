gsap.registerPlugin(ScrollTrigger);

const select = (el) => document.querySelector(el)
const selectAll = (el) => document.querySelectorAll(el)

const loader = select(".loader")
const loaderInner = select(".loader .inner")
const progressBar = select(".loader .progress")

// show loader on page load
gsap.set(loader, {autoAlpha: 1})

// scale loader down to create a progress bar PROGRESS CONTAINER
gsap.set(loaderInner, {scaleY: 0.005, transformOrigin: "bottom"})

// tween that shows the progress of loading images MOVING PROGRESS BAR
gsap.to(progressBar, {duration: 3, delay: 2, scaleX: 0, ease:"none", transformOrigin: "right"})



function initLoader() {
	const image = select(".loader__image img")
	const mask = select(".loader__image--mask")
	const line1 = select(".loader__title--mask:nth-child(1) span")
	const line2 = select(".loader__title--mask:nth-child(2) span")
	const lines = selectAll(".loader__title--mask")
	
	const loaderContent = select(".loader__content")
	// Loader In Timeline
	const tlLoaderIn = gsap.timeline({
		defaults: {
			duration: 1.1,
			ease: "power2.out",
		},
		onComplete: () => select("body").classList.remove("is-loading")
	})
	// Loader Out Timeline
	const tlLoaderOut = gsap.timeline({
		defaults: {
			duration: 1.2,
			ease: "power2.inOut",
		}, 
		delay: 1
	})

	// Loader In Tween
	tlLoaderIn
		.set([loader, loaderContent], {autoAlpha: 1})
		.from(loaderInner, {
			scaleY:0,
			transformOrigin: "bottom"
		}, 0.3)
		.addLabel("revealImage")
		.from(mask, {yPercent: 100}, "revealImage-=0.6")
		.from(image, {yPercent: -50}, "revealImage-=0.6")
		.from([line1, line2], {yPercent: 100, stagger: 0.1}, "revealImage-=0.4")

	
	// Loader Out Tween
	tlLoaderOut
		.to(lines, {yPercent: -100, stagger: 0.2}, 0)
		.to([loader, loaderContent], {yPercent: -100}, 0.2)
		.from("#main", {y: 150, ease: "power3.out"}, 0.2)


	//Mastertimeline
	tlLoaderMaster = gsap.timeline()
	tlLoaderMaster
		.add(tlLoaderIn)
		.add(tlLoaderOut)
		
}

// function init(){
    
//     initLoader()

// }

// window.addEventListener('load', function(){
//     init();
// });

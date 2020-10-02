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
const progressTween = gsap.to(progressBar, {scaleX: 0, ease:"none", transformOrigin: "right"})

// setup variables
// https://codepen.io/desandro/pen/hlzaw
let loadedImageCount = 0, imageCount;
const container = select('#main');
 
// setup Images loaded
const imgLoad = imagesLoaded( container );
imageCount = imgLoad.images.length;
 
// set the initial progress to 0
updateProgress(0);
 
// triggered after each item is loaded
imgLoad.on( 'progress', function() {
    // increase the number of loaded images
    loadedImageCount++;
    // update progress
    updateProgress( loadedImageCount );
});
 
// update the progress of our progressBar tween
function updateProgress( value ) {
    // console.log(value/imageCount)
    // tween progress bar tween to the right value
    gsap.to(progressTween, {progress: value/imageCount, duration: 0.3, ease: 'power1.out'})
}
 
// do whatever you want when all images are loaded
imgLoad.on( 'done', function( instance ) {
    // we will simply init our loader animation onComplete
    gsap.set(progressBar, {autoAlpha: 0, onComplete: initLoader});
});




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

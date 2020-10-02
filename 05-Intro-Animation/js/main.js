gsap.registerPlugin(ScrollTrigger);

const select = (el) => document.querySelector(el)
const selectAll = (el) => document.querySelectorAll(el)

function initLoader() {

	const tlLoaderIn = gsap.timeline({
		defaults: {
			duration: 1.1,
			ease: "power2.out",
		}
	})

	const loaderInner = select(".loader .inner")
	const image = select(".loader__image img")
	const mask = select(".loader__image--mask")
	const line1 = select(".loader__title--mask:nth-child(1) span")
	const line2 = select(".loader__title--mask:nth-child(2) span")

	tlLoaderIn
		.from(loaderInner, {
			scaleY:0,
			transformOrigin: "bottom"
		}, 0.3)
		.addLabel("revealImage")
		.from(mask, {yPercent: 100}, "revealImage-=0.6")
}

function init(){
    
    initLoader()

}

window.addEventListener('load', function(){
    init();
});

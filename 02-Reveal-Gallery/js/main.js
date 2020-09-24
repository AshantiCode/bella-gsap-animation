gsap.registerPlugin(ScrollTrigger);
const columns = gsap.utils.toArray(".rg__column");

function initHoverReveal() {

    columns.forEach((column) => {
        // get the el we want to animate
        column.imageBlock = column.querySelector(".rg__image");
        column.mask = column.querySelector(".rg__image--mask");
        column.text = column.querySelector(".rg__text");
        column.textCopy = column.querySelector(".rg__text--copy");
        column.textMask = column.querySelector(".rg__text--mask");
		column.textP = column.querySelector(".rg__text--copy p");
		column.image = column.querySelector(".rg__column img")

		//get the color for each column
		const colColor = column.attributes[1].value
		

        // reset their initial position (images are not visisble on
        // page load
        gsap.set([column.imageBlock, column.textMask], { yPercent: -101 });
		gsap.set([column.mask, column.textP], { yPercent: 100 });
		gsap.set(column.image, {scale: 1.2})

        column.addEventListener("mouseenter", createHoverReveal);
        column.addEventListener("mouseleave", createHoverReveal);
    });
}

function getTextCopyHeight(textCopy) {
	return textCopy.clientHeight
}

function createHoverReveal(e) {
    // console.log(e.target);
	const section = document.querySelector(".reveal-gallery")
    const { imageBlock, mask, text, textCopy, textMask, textP, image } = e.target;
	const sectionColor = e.target.attributes[1].value;

    let tl = gsap.timeline({
        defaults: {duration: 1, ease: "power4.out",
        },
    });

    if (e.type === "mouseenter") {
		tl
		.to([mask, imageBlock, textMask, textP], { yPercent: 0,})
		.to(text, {y: () => -getTextCopyHeight(textCopy)/ 2}, 0 ) // moves text up half of its height
		.to(image, {duration: 1.2, scale:1}, 0)
		.to(section, {backgroundColor: sectionColor}, 0)
    } else if (e.type === "mouseleave") {
		tl
		.to([mask, textP], { yPercent: 100 })
		.to([imageBlock, textMask], { yPercent: -101 }, 0)
		.to(text, {y: 0},0)
		.to(image, {scale:1.2}, 0)
    }

    return tl;
}


// function init() {
//     initHoverReveal();
// }

// window.addEventListener("load", function () {
//     init();
// });

// ******  Media Queries  *********************************************
// ********************************************************************

//define a breakpoint, over 768px animation should play, under, not.
const mq = window.matchMedia("(min-width: 768px)")

// add change listener
mq.addEventListener("change", handleWidthChange)

//run function again on reload
handleWidthChange(mq)

// remove gsap inlinestyles when resizing from web to mobile
function removeInlineStyles(elements) {
	//stop all tweens while hitting breakpoint
	gsap.killTweensOf("*")

	if (elements.length) {
		elements.forEach(el => {
			el && gsap.set(el, {clearProps: "all"})
		})
	}
}

//function media quer change
function handleWidthChange(mq) {
	//width is over 768px
	if(mq.matches) {
		initHoverReveal()

	} else {
		//width is lower than 768px
		console.log("we are on mobile")

		// remove added eventlistener
		columns.forEach(column => {
			column.removeEventListener("mouseenter", createHoverReveal)
			column.removeEventListener("mouseleave", createHoverReveal)
			const {imageBlock, mask, text, textCopy, textMask, textP, image} = column
			removeInlineStyles([imageBlock, mask, text, textCopy, textMask, textP, image])
		})
	}
}
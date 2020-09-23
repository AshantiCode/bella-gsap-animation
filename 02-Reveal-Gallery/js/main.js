gsap.registerPlugin(ScrollTrigger);

function initHoverReveal() {
    const columns = gsap.utils.toArray(".rg__column");

    columns.forEach((column) => {
        // get the el we want to animate
        column.imageBlock = column.querySelector(".rg__image");
        column.mask = column.querySelector(".rg__image--mask");
        column.text = column.querySelector(".rg__text");
        column.textCopy = column.querySelector(".rg__text--copy");

        // reset their initial position (images are not visisble on
        // page load
        gsap.set(column.imageBlock, { yPercent: -101 });
        gsap.set(column.mask, { yPercent: 100 });

        column.addEventListener("mouseenter", createHoverReveal);
        column.addEventListener("mouseleave", createHoverReveal);
    });
}

function getTextCopyHeight(textCopy) {
	return textCopy.clientHeight
}

function createHoverReveal(e) {
    // console.log(e.target);

    const { imageBlock, mask, text, textCopy } = e.target;

    let tl = gsap.timeline({
        defaults: {duration: 0.7, ease: "power4.out",
        },
    });

    if (e.type === "mouseenter") {
		tl
		// .to([mask, imageBlock], {duration: 1, yPercent: 0,})
		.to(text, {y: () => -getTextCopyHeight(textCopy)/ 2}, 0 ) // moves text up half of its height
			
    } else if (e.type === "mouseleave") {
		tl
		// .to(mask, { yPercent: 100 })
		// .to(imageBlock, { yPercent: -101 }, 0)
		.to(text, {y: 0},0)
    }

    return tl;
}

function init() {
    initHoverReveal();
}

window.addEventListener("load", function () {
    init();
});

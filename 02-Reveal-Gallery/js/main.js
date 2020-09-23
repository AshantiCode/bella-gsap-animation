gsap.registerPlugin(ScrollTrigger);

function initHoverReveal() {
    const columns = gsap.utils.toArray(".rg__column");

    columns.forEach((column) => {
        // get the el we want to animate
        column.imageBlock = column.querySelector(".rg__image");
        column.mask = column.querySelector(".rg__image--mask");
        column.text = column.querySelector(".rg__text");
        column.textCopy = column.querySelector(".rg__text--copy");
        column.textMask = column.querySelector(".rg__text--mask");
		column.textP = column.querySelector(".rg__text--copy p");
		column.image = column.querySelector(".rg__column img")

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

    const { imageBlock, mask, text, textCopy, textMask, textP, image } = e.target;

    let tl = gsap.timeline({
        defaults: {duration: 1, ease: "power4.out",
        },
    });

    if (e.type === "mouseenter") {
		tl
		.to([mask, imageBlock, textMask, textP], { yPercent: 0,})
		.to(text, {y: () => -getTextCopyHeight(textCopy)/ 2}, 0 ) // moves text up half of its height
		.to(image, {duration: 1.2, scale:1}, 0)
    } else if (e.type === "mouseleave") {
		tl
		.to([mask, textP], { yPercent: 100 })
		.to([imageBlock, textMask], { yPercent: -101 }, 0)
		.to(text, {y: 0},0)
		.to(image, {scale:1.2}, 0)
    }

    return tl;
}

function init() {
    initHoverReveal();
}

window.addEventListener("load", function () {
    init();
});

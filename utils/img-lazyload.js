let lazylozd = function (classname) {
    let imgList = [...document.querySelectorAll(classname)];
    console.log(document.querySelectorAll(classname));
    console.log(imgList);
    let observe = new IntersectionObserver(entries => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio > 0) {
                entry.target.src = entry.target.dataset.src;
                entry.target.style.opacity = 1;
                observe.unobserve(entry.target);
            }
        })
    });
    imgList.forEach(img => {
        observe.observe(img)
    })
};
export {
    lazylozd
}
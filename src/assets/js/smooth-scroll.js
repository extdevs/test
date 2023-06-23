export default function smoothScroll() {
    let anchorHrefs = document.querySelectorAll('a[href*="#"]:not([href="#"])');

    anchorHrefs.forEach(function(el, index){
        el.addEventListener('click', function(e){
            e.preventDefault();

            let target = el.getAttribute('href');
            let targetEl = document.querySelector(target);
            let headerEl = document.querySelector('.site-header');

            if(targetEl){
                window.scrollTo({
                    top: window.scrollY + targetEl.getBoundingClientRect().top - (headerEl ? headerEl.getBoundingClientRect().height : 0),
                    behavior: 'smooth'
                });
            }
        });
    });
}

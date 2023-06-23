export default function viewAnimation() {
    // Components loading animations
    let elementsToObserve = document.querySelectorAll('.view-animation');

    // intersection observer not support on ie11
    let isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

    elementsToObserve.forEach(function(el, index){
        if(isIE11){
            el.classList.add('animated');
        }else{
            new IntersectionObserver(
                function (entries) {
                    if (entries[0].isIntersecting === true) {
                        entries[0].target.classList.add('animated')
                    }
                },
            { threshold: [.5] }
            ).observe(el);
        }
    });
}

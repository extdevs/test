export default function accordion() {
    const slideDown = elem => elem.style.height = `${elem.scrollHeight}px`;
    const slideUp = elem => elem.style.height = `0px`;

    let accordionTitles = document.querySelectorAll('.accordion__title');
    let activeContent = getActiveContentEl();

    if(activeContent){
    	slideDown(activeContent);
    }

    accordionTitles.forEach(function(el, index){
    	el.addEventListener('click', function(){

    		if(el.classList.contains('active')){
				let thisContent = getActiveContentEl();
    			el.classList.remove('active');
    			slideUp(thisContent);
    		}else{
                // hide active el
                let activeTitle = getActiveTitleEl();

                if(activeTitle){
                    let alreadyActive = getActiveContentEl();
                    slideUp(alreadyActive);
                    activeTitle.classList.remove('active');
                }

    			el.classList.add('active');
                let thisContent = getActiveContentEl();
    			slideDown(thisContent);
    		}
    	});
    });

    function getActiveTitleEl(){
        return document.querySelector('.accordion__title.active');
    }

    function getActiveContentEl(){
    	return document.querySelector('.accordion__title.active + .accordion__content');
    }
}

export default function stickyHeader() {

	let headerEl = document.querySelector('.site-header');

	if(!headerEl){
		return;
	}

	_checkScrolled();

	window.addEventListener('scroll', function(){
		_checkScrolled();
	});

	function _checkScrolled(){
		if(window.scrollY >= 30){
			headerEl.classList.add('scrolled');
		}else{
			headerEl.classList.remove('scrolled');
		}
	}
}

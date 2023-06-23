export default function phoneConcat() {
	let headerPhones = document.querySelectorAll('.phone-text');

	setTimeout(function () {
		_initPhoneConcat();
	}, 2000);

	function _initPhoneConcat(){
		headerPhones.forEach(function(el, index){
			let emEl = el.querySelector('em');

			if(!emEl){
				return;
			}

			let unsliced = emEl.textContent;
			let sliced = unsliced.slice(0, -2) + '...';

			emEl.textContent = sliced;

			let linked = 'tel:' + unsliced.replace(/\s/g, '')

			el.addEventListener('click', function(){
				if (window.innerWidth < 1000) {
					window.location.href = linked
				} else {
					emEl.textContent = unsliced;
				}
			});
		});
	}
}

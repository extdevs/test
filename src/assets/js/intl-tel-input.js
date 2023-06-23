import intlTelInput from 'intl-tel-input'

export default function initTelInputs() {
	let phoneInputs = document.querySelectorAll('.intl-phone');

	if(!phoneInputs.length){
		return;
	}

	window.itiFields = [];

	phoneInputs.forEach(function(el, index){
		el.dataset.intlid = index;
		el.value = "";

		let ogName = el.getAttribute('name');

		itiFields[index] = intlTelInput(el, {
		    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
		    preferredCountries: ['au','us','ca','gb','nz'],
			geoIpLookup: function(callback) {
				fetch("https://ipapi.co/json")
					.then(function(res) { return res.json(); })
					.then(function(data) { callback(data.country_code); })
					.catch(function() { callback("au"); });
			},
		    hiddenInput: ogName,
		    autoPlaceholder: 'aggressive',
		});

		el.setAttribute('name', ogName+'[short]');

		// Update the hidden field with the true value whenever the values change
		let hiddenField = el.closest('form').querySelector('[name='+ogName+']');
		['input', 'countrychange'].forEach(eventType => {
			el.addEventListener(eventType, event => {
				hiddenField.value = itiFields[index].getNumber();
			});
		});
	});
}

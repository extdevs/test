import { Step } from './multistep/inc/step'
import { MultiStep } from './multistep/index'

export default function multistep() {
	const stepValidation = {
		basic: (input) => {
			return input.value.length > 0
		},
		email: (input) => {
			let matches = input.value.match(
				/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
			)
			return matches && matches.length > 0
		},
		radio: (input) => {
			let checked = document.querySelector(
				`input[name="${input.name}"]:checked`
			)
			let checkWrap = document.querySelector('.step.active .checked')
			if (checkWrap) {
				checkWrap.classList.toggle('checked')
			}
			if (checked) {
				checked.parentNode.classList.add('checked')
			}

			if (checked && checked.value === 'skip') {
				return 2
			}
			return checked && checked.value.length > 0
		},
		phone: (input) => {
			if(!input.value || input.value == ""){
				return;
			}
			
			var reg = new RegExp(/^[0-9\s-+()]*$/m);  
			return reg.test(input.value);
		},
		checkbox: (input) => {
			let checked = document.querySelector(
				`input[name="${input.name}"]:checked`
			)
			return checked && checked.value.length > 0
		},
	}
	customElements.define('step-item', Step)
	customElements.define('multi-step', MultiStep, { extends: 'form' })

	customElements.whenDefined('step-item').then(() => {
		document.querySelectorAll('step-item').forEach((el) => {
			el.validators = stepValidation
		})
	})

	customElements.whenDefined('multi-step').then(() => {
		var form = document.querySelector('form[is=multi-step]')

		if (form) {
			form.classList.add('ready')
			form.addEventListener('stepChange', (e) => {
				window.dataLayer || (window.dataLayer = [])
				window.dataLayer.push({
					event: 'gtm.multiStepChange',
					step: e.detail.step.index,
				})
				
				_blurInputs();
			})

			function _blurInputs(){
				let allInputs = document.querySelectorAll('input');

				allInputs.forEach(function(el, index){
					el.blur();
				});
			}
		}
	})
}

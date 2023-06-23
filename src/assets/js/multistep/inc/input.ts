import { getParameter } from './functions'

/**
 * @description wrapper for Inputs within a step, it adds validation and error handling
 */
export class InputItem {
	error: HTMLDivElement
	input: HTMLInputElement
	valid: boolean
	constructor(error: HTMLDivElement, input: HTMLInputElement) {
		this.error = error
		this.input = input
		this.valid = this.input.getAttribute('data-validate') ? false : true
		this.setupError()
		this.getParam()
	}

	get name() {
		return this.input.name
	}

	get map() {
		return this.input.getAttribute('data-map')
	}

	get validator() {
		return this.input.getAttribute('data-validate')
	}

	/**
	 * @description Sets up the error messages for the input. Checks where the label is, and
	 */
	setupError() {
		this.error.classList.add('hidden')
		if(this.error.innerHTML == '') return;
		if (
			this.input.nextElementSibling &&
			this.input.nextElementSibling.tagName == 'LABEL' &&
			this.input.nextElementSibling.getAttribute('for') == this.input.id
		) {
			this.input.nextElementSibling.insertAdjacentElement(
				'afterend',
				this.error
			)
		} else if (this.input.parentElement?.classList.contains('radio-wrap')) {
			this.input.parentElement?.insertAdjacentElement('afterend', this.error)
		} else {
			this.input.insertAdjacentElement('afterend', this.error)
		}
	}

	/**
	 * @description triggers the change event on the input
	 */
	change() {
		let change = new Event('change', { bubbles: true })
		this.input.dispatchEvent(change)
	}

	/**
	 * @description Helper function to get the parameter from the url
	 */
	getParam() {
		let param = getParameter(this.input.name)
		if (
			(this.input.type == 'radio' || this.input.type == 'checkbox') &&
			param
		) {
			if (param == this.input.value) {
				this.input.checked = true
			}
		} else if (param) {
			this.input.value = param
		}
		this.change()
	}

	/**
	 * @description Maps the value of the input to another input, or marked HTML
	 */
	mapValue() {
		if (this.map) {
			let mappedText = document.querySelectorAll(
				'[data-receive="' + this.map + '"]'
			)
			let mappedInputs = document.querySelectorAll(
				'[name="' + this.map + '"]'
			) as NodeListOf<HTMLInputElement>
			if (mappedText) {
				mappedText.forEach((element) => {
					element.innerHTML = this.input.value
				})
			}
			if (mappedInputs) {
				mappedInputs.forEach((element) => {
					element.value = this.input.value
					let change = new Event('change', { bubbles: true })
					element.dispatchEvent(change)
				})
			}
		}
	}

	/**
	 *
	 * @param func {function} - The function to run on the input
	 * @param hideError Whether or not to hide the error message on invalid input
	 * @returns {boolean} Whether or not the input is valid
	 */
	test(func: Function, hideError: boolean = false) {
		let passed = func(this.input)
		passed = passed == null || passed == undefined ? false : passed
		if (!passed && !hideError) {
			this.showError()
		} else if (passed) {
			this.hideError()
			this.mapValue()
		}
		this.valid = typeof passed !== 'number' ? passed : true

		return passed
	}

	hideError() {
		this.input.classList.remove('error')
		this.error.classList.add('hidden')
	}
	showError() {
		this.input.classList.add('error')
		this.error.classList.remove('hidden')
	}
}

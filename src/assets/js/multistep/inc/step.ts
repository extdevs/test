import { InputItem } from './input'
import { Validators, defaultValidators } from './types/validators'
import { SkipQueue } from './interface/SkipQueue'

/**
 * @class Step
 * @description This is a step, it is a wrapper for a set of inputs.
 * @example <step-item></step-item>
 * @property index {number} - The index of the step
 * @property active {boolean} - Whether or not the step is active
 * @property inputs {NodeListOf<InputItem>} - The inputs in the step
 * @property validators {Validators} - The validators for the step
 * @property skipQueue {SkipQueue} - The queued skips, this is determined by the inputs
 */
export class Step extends HTMLElement {
	validators: Validators
	inputs: InputItem[]
	skipQueue: SkipQueue

	constructor() {
		super()
		this.inputs = []
		this.skipQueue = {}
		this.valid = 'false'
		this.inputElements = this.querySelectorAll(
			'input, textarea, select'
		) as NodeListOf<HTMLInputElement>
		this.validators = Object.assign({}, defaultValidators)
		this.validateAll()
		this.listen()
	}

	set inputElements(items: NodeListOf<HTMLInputElement>) {
		this.inputElements.forEach((item) => {
			//  We don't care about it if there isn't validation
			let error = document.createElement('div')
			let message = item.getAttribute('data-error')
			error.classList.add('field-error')
			if (message) {
				error.innerText = message
			}
			this.inputs.push(new InputItem(error, item as HTMLInputElement))
			this.skipQueue[item.getAttribute('name')] = -1
		})
	}

	get inputElements(): NodeListOf<HTMLInputElement> {
		return this.querySelectorAll(
			'input, textarea, select'
		) as NodeListOf<HTMLInputElement>
	}

	get valid() {
		return this.getAttribute('valid')
	}

	get isNotRadioOnly() {
		return this.inputs.some((item) => {
			item.input.type != 'radio'
		})
	}

	set valid(val) {
		let next = this.querySelector('[data-next]')
		this.setAttribute('valid', val)
		val = JSON.parse(val)
		if (Boolean(val) && next) {
			next.removeAttribute('disabled')
		} else if (!Boolean(val)) {
			// Invalid state upon input change, might want to do something here
		}
	}

	get nextButton() {
		return this.querySelector('[data-next]')
	}

	get active() {
		return this.classList.contains('active')
	}

	set active(val) {
		if (val) {
			this.classList.add('active')
		} else {
			this.classList.remove('active')
		}
	}

	get index() {
		return Number(this.getAttribute('index'))
	}

	set index(index: number) {
		this.setAttribute('index', String(index))
	}

	/**
	 * This is a helper function to group all of the radios validity by the name attribute
	 * @param name {string} - The name of the radio group
	 */
	mapRadios(name: string) {
		this.inputs.forEach((child) => {
			if (child.input.type == 'radio' && child.name == name) {
				child.valid = true
				child.hideError()
			}
		})
	}

	/**
	 * This is a helper function to validate all of the inputs, not bound to events
	 */
	validateAll() {
		this.inputs.forEach((item) => {
			if (this.validators.hasOwnProperty(item.validator)) {
				item.test(this.validators[item.validator], true)
			}
		})
		this.checkValidity()
	}

	/**
	 * @description This handles all events fired by the user
	 * @param index {number} - The index of the input
	 */
	listenHandler(index: number) {
		let tester = this.inputs[index].validator

		if (tester && this.validators.hasOwnProperty(tester)) {
			let res = this.inputs[index].test(this.validators[tester])
			this.skipQueue[this.inputs[index].name] =
				typeof res == 'number' ? res : -1
			if (
				this.inputs[index].valid &&
				this.inputs[index].input.type == 'radio'
			) {
				this.mapRadios(this.inputs[index].name)
			}
		} else {
			// No validation, make it valid
			this.inputs[index].valid = true
		}
		this.checkValidity()
	}

	/**
	 * @description Listen for all of the events, this starts all of our validation checks
	 */
	listen() {
		for (var i = 0; i < this.inputs.length; i++) {
			let func = this.listenHandler.bind(this, i)
			this.inputs[i].input.addEventListener('input', func)
			this.inputs[i].input.addEventListener('blur', func)
			if (
				this.inputs[i].input.type == 'radio' ||
				this.inputs[i].input.type == 'checkbox'
			) {
				this.inputs[i].input.addEventListener('click', func)
				this.inputs[i].input.addEventListener('change', func)
			}
		}
	}

	/**
	 * @returns void
	 * @description Forces validation on each input
	 */
	forceValidation() {
		for (let i = 0; i < this.inputs.length; i++) {
			this.listenHandler(i)
		}
	}

	/**
	 * @returns {boolean} Whether or not the step is valid
	 */
	checkValidity() {
		for (let i = 0; i < this.inputs.length; i++) {
			if (this.inputs[i].valid !== true) {
				this.valid = 'false'
				return
			}
		}
		this.valid = 'true'
	}

	/**
	 * @function showErrors
	 * @description Show the errors for the step
	 */
	showErrors() {
		this.inputs.forEach((child) => {
			if (!child.valid) {
				child.showError()
			}
		})
	}
}

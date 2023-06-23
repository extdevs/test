function checkThankyou() {
	// Check for the local storage item, can either be a "1", or "true"
	if (Boolean(localStorage.getItem('kk-thanks-' + window.location.host))) {
		localStorage.removeItem('kk-thanks-' + window.location.host)
		return true
	}
	// Check for the preview string if we don't have a local storage item
	return window.location.href.indexOf('kk_preview_ty') != -1
}

function runThankyou(element) {

	var bar = element.querySelector('.thank-you-popup__bar--progress')
	var items = element.querySelectorAll('.thank-you-popup__item')

	// The popup will show for 8 seconds in total
	var showDuration = 8000 / items.length

	// Divide the bar, increment it to the first %
	bar.style.maxWidth = 100 / items.length - 1 + '%'

	var i = 0
	var interval = setInterval(function () {
		// Second last item, fade out the last one quicker
		// This would normally be a "Done" message
		if (i == items.length - 2) {
			setTimeout(function () {
				clearInterval(interval)
				hideThankyou();
			}, showDuration / 3)
		}
		if (i < items.length - 1) {
			i++
            // Hide the previous one
			items[i - 1].classList.remove('active')
            // Set the bar width, dependent on the number of items
			bar.style.maxWidth = ((i + 1) * 100) / items.length + '%'
			bar.style.transitionDuration = showDuration - 100
            // Set the next one as active
			items[i].classList.add('active')
		}
	}, showDuration)
}

function showThankyou() {
	var ty = document.querySelector('#thank-you-message')
	if (checkThankyou() && ty) {
		ty.classList.add('active')
		runThankyou(ty)
	}
}

function hideThankyou() {
    var ty = document.querySelector('#thank-you-message')
    if (ty) {
        ty.classList.remove('active')
    }
}

export default function kkThankYou() {
	showThankyou()
}

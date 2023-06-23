/**
 * Global JS here
 * Page specific JS shouldn't go here
 */
import contentLoaded from './vendor/contentloaded.js'
import images from './images.js'
import phoneConcat from './phone-concatenation.js'
import polyfill from './polyfills.js'
import sliders from './sliders.js'
import smoothScroll from './smooth-scroll.js'
import stickyHeader from './sticky-header.js'
import videos from './video-embeds.js'
import viewAnimation from './view-animation.js'
import date from './date.js'

contentLoaded(window, function (e) {
	document.body.classList.add('ready');
	viewAnimation();
	polyfill()
	phoneConcat()
	images()
	sliders()
	smoothScroll()
	stickyHeader()
	videos()
	date()
})

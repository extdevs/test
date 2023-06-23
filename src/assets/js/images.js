import IntersectionObserver from 'intersection-observer-polyfill'

class LazyLoad {
	settings = {
		src: 'data-src',
		srcset: '[data-srcset]',
		selector: '.lazyload',
		root: null,
		rootMargin: '0px',
		threshold: 0,
	}

	init() {
		this.images = document.querySelectorAll(this.settings.selector)

		let self = this
		let observerConfig = {
			root: null,
			rootMargin: this.settings.rootMargin,
			threshold: [this.settings.threshold],
		}

		this.observer = new IntersectionObserver(function (entries) {
			Array.prototype.forEach.call(entries, function (entry) {
				if (entry.isIntersecting) {
					self.observer.unobserve(entry.target)
					let src = entry.target.getAttribute(self.settings.src)
					let sourceSet = entry.target.parentNode.querySelectorAll(
						self.settings.srcset
					)
					if (sourceSet.length > 0) {
						for (let i = 0; i < sourceSet.length; i++) {
							sourceSet[i].srcset =
								sourceSet[i].getAttribute('data-srcset')
						}
					}
					if ('img' === entry.target.tagName.toLowerCase()) {
						if (src) {
							entry.target.src = src
						}
					} else {
						entry.target.style.backgroundImage = 'url(' + src + ')'
					}
				}
			})
		}, observerConfig)

		Array.prototype.forEach.call(this.images, function (image) {
			self.observer.observe(image)
		})
	}

	loadAndDestroy() {
		if (!this.settings) {
			return
		}
		this.loadImages()
		this.destroy()
	}

	loadImages() {
		if (!this.settings) {
			return
		}

		let self = this
		Array.prototype.forEach.call(this.images, function (image) {
			let src = image.getAttribute(self.settings.src)
			let sourceSet = image.parentNode.querySelectorAll(
				self.settings.srcset
			)
			if (sourceSet.length > 0) {
				for (let i = 0; i < sourceSet.length; i++) {
					sourceSet[i].srcset =
						sourceSet[i].getAttribute('data-srcset')
				}
			}
			if ('source' === entry.target.tagName.toLowerCase()) {
				if (srcset) {
					entry.target.srcset = srcset
				}
			}
			if ('img' === image.tagName.toLowerCase()) {
				if (src) {
					image.src = src
				}
			} else {
				image.style.backgroundImage = "url('" + src + "')"
			}
		})
	}

	destroy() {
		if (!this.settings) {
			return
		}
		this.observer.disconnect()
		this.settings = null
	}
}

export default function images() {
	if (document.querySelector('.lazyload')) {
		var lazy = new LazyLoad()
		lazy.init()
	}
}

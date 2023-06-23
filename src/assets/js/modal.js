import MicroModal from 'micromodal'

const microModalSettings = {
	openTrigger: 'data-mm-target',
	closeTrigger: 'data-mm-dismiss',
	openClass: 'is-open',
	onShow: () => {
		document.body.classList.add('modal-open');

		let modalVideoButton = document.querySelector('.modal.is-open .play-button');

		if(modalVideoButton){
			_playVideo(modalVideoButton);
		}
	},
	onClose: () => {
		document.body.classList.remove('modal-open');

		let activeVideo = document.querySelector('.video-preview-container iframe:not([src="about:blank"])');
		
        if(activeVideo){
            activeVideo.src = 'about:blank';
            activeVideo.closest('.video-preview-container').classList.remove('playing');
        }
	},
}

export function initModals() {
	MicroModal.init(microModalSettings)
}

export function exitIntent() {
	var exitHappened = 0
	let eiModal = [].slice.call(document.querySelectorAll('.modal--ei'));

	eiModal.map((modal) => {
		return setTimeout(function () {
			document.addEventListener('mouseout', function (evt) {
				if (
					((evt.toElement === null && evt.relatedTarget === null) ||
						(typeof evt.toElement == 'undefined' &&
							evt.relatedTarget === null)) &&
					exitHappened < 1
				) {
					if (!document.querySelector('.modal.is-open')) {
						MicroModal.show(modal.id, microModalSettings)
						exitHappened = 1
					}
				}
			})
		}, 4000)
	})
}

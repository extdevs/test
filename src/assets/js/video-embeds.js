export default function videos() {

	window._playVideo = function(el){
		let thisID = el.dataset.videoId;
		let iframeHTML = '';

		if(thisID){
			if(el.classList.contains('vimeo')){

				iframeHTML = '<iframe src="https://player.vimeo.com/video/' + thisID +
				'?title=0&byline=0&portrait=0?&autoplay=1" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>';
			
			}else if(el.classList.contains('wistia')){

				iframeHTML = '<iframe src="https://fast.wistia.net/embed/iframe/' + thisID +
				'?controlsVisibleOnLoad=true&autoplay=1" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>';

                _wq.push({ 
                    id: thisID, 
                    onReady: function(video) {
                    video.play();
                }});
			
			}else{

				iframeHTML = '<iframe src="https://www.youtube.com/embed/' + thisID +
				'?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

			}


			el.parentNode.querySelector('iframe').remove();
			el.parentNode.insertAdjacentHTML('afterbegin', iframeHTML);
			el.parentNode.classList.add('playing');

		}else{
			console.log('No Video ID Provided');
		}
	}

	let videoTriggers = document.querySelectorAll('.inline-video-trigger');

	videoTriggers.forEach(function(el, index){
		el.addEventListener('click', function(){
			_playVideo(el);
		});
	});
}

const inView = require('in-view');


window.addEventListener('DOMContentLoaded', function(e){
	
	// After 45 seconds, stop the video
	const videoTimer = setTimeout(function(){
		document.querySelector('.intro__video video').pause();
	}, 45000)

	// lazyloading the images
	let imageSize = "";
	if (window.innerWidth > 800){
		imageSize = "desktop";
	} else if (window.innerWidth > 450){
		imageSize = "tablet";
	} else {
		imageSize = "mobile";
	}

    // Let's set our lazyload offset to 500px below the viewport. 
    inView.offset(-500);

    inView('.profile__image--blur')
        .on('enter', el => {
            let src = el.getAttribute('src');
            el.setAttribute('src', src.replace('thumbs', imageSize));
            el.classList.remove('profile__image--blur');
        });

    // power the audio buttons
	const audioButtons = [].slice.call(document.querySelectorAll('.profile__quote-icon'));
	audioButtons.forEach(a => {
		a.addEventListener('click', function(e){

			// Grab the currently selected audio element
			const audioEl = this.parentNode.querySelector('.profile__quote-audio');

			if (!audioEl.paused){
				// If the button clicked is a playing element, then just stop the audio.
				audioEl.pause();
				audioEl.currentTime = 0; // This puts it back to the beginning so it will start over if played again.
				this.classList.remove('profile__quote-icon--active');

			} else {
				// If we have clicked on a new button ...

				// Toggle active state for button
				if (document.querySelector('.profile__quote-icon.profile__quote-icon--active') !== null) {
					document.querySelector('.profile__quote-icon.profile__quote-icon--active').classList.remove('profile__quote-icon--active');
				}
				this.classList.add('profile__quote-icon--active');


				// Stop any/all playing audios
				const audioEls = [].slice.call(document.querySelectorAll('.profile__quote-audio'));
				audioEls.forEach(audio => {
					audio.pause();
					audioEl.currentTime = 0;
				});
				
				// play the one the user chose
				audioEl.play();
			}
		})
	})

});

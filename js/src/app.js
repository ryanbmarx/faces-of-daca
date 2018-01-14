const inView = require('in-view');


window.addEventListener('DOMContentLoaded', function(e){

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

	const audioButtons = [].slice.call(document.querySelectorAll('.profile__quote-icon'));
	audioButtons.forEach(a => {
		a.addEventListener('click', function(e){
			// The currently selected audio element
			const audioEl = this.parentNode.querySelector('.profile__quote-audio');

			if (!audioEl.paused){
				// If the button clicked is a playing element, then just stop it.
				audioEl.pause();
				audioEl.currentTime = 0;
				this.classList.remove('profile__quote-icon--active');

			} else {
				// If we have clicked on a new button ...

				// Toggle active state for button
				if (document.querySelector('.profile__quote-icon.profile__quote-icon--active') != null) {
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

})

// TODO: Make start at beginning
// TODO: On audio end, revert button

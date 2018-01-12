window.addEventListener('DOMContentLoaded', function(e){

	const audioButtons = [].slice.call(document.querySelectorAll('.profile__quote-icon'));
	audioButtons.forEach(a => {
		a.addEventListener('click', function(e){
			
			// Toggle active state for button
			if (document.querySelector('.profile__quote-icon.profile__quote-icon--active') != null) {
				document.querySelector('.profile__quote-icon.profile__quote-icon--active').classList.remove('profile__quote-icon--active');
			}
			this.classList.add('profile__quote-icon--active');

			const audioEl = this.parentNode.querySelector('.profile__quote-audio');

			// Stop any/all playing audios
			const audioEls = [].slice.call(document.querySelectorAll('.profile__quote-audio'));
			audioEls.forEach(audio => audio.pause());
			
			// play the one the user chose
			audioEl.play();
		})
	})

})
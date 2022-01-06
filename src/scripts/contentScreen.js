import { PAGES } from '../data/content'
import { VoiceEqualizer } from './VoiceEqualizer';

const main = document.getElementById('content-screen-main')
const footer = document.getElementById('content-screen-footer')

const Narration = document.getElementById('Narration')
const ArtNouveau = document.getElementById('ArtNouveau')
const Flacon = document.getElementById('Flacon')
const Parfum = document.getElementById('Parfum')
const Bouchon = document.getElementById('Bouchon')
const Maestria = document.getElementById('Maestria')
Narration.style.display = "none"
ArtNouveau.style.display = "none"
Flacon.style.display = "none"
Parfum.style.display = "none"
Bouchon.style.display = "none"
Maestria.style.display = "none"

let currentPageId

// const audio = document.createElement('audio')
// const mainTitle = document.createElement('h2')
// const mainContent = document.createElement('div')

const updatePage = () => {
	let page = PAGES[currentPageId]
	currentPageId++
	console.log(currentPageId)

	/**
	 * POUR CHAQUE GROUPE DE 3 PAGES
	 */

	// Narration
	if ( currentPageId >= 1 && currentPageId <= 3 ) {
		Narration.style.display = "block"
		ArtNouveau.style.display = "none"
		Flacon.style.display = "none"
		Parfum.style.display = "none"
		Bouchon.style.display = "none"
		Maestria.style.display = "none"
	}

	// ArtNouveau
	else if ( currentPageId >= 4 && currentPageId <= 6 ) {
		Narration.style.display = "none"
		ArtNouveau.style.display = "block"
		Flacon.style.display = "none"
		Parfum.style.display = "none"
		Bouchon.style.display = "none"
		Maestria.style.display = "none"
	}

	// Flacon
	else if ( currentPageId >= 7 && currentPageId <= 9 ) {
		Narration.style.display = "none"
		ArtNouveau.style.display = "none"
		Flacon.style.display = "block"
		Parfum.style.display = "none"
		Bouchon.style.display = "none"
		Maestria.style.display = "none"
	}
	else if ( currentPageId >= 10 && currentPageId <= 12 ) {
		Narration.style.display = "none"
		ArtNouveau.style.display = "none"
		Flacon.style.display = "none"
		Parfum.style.display = "block"
		Bouchon.style.display = "none"
		Maestria.style.display = "none"
	}

	else if ( currentPageId >= 13 && currentPageId <= 15 ) {
		Narration.style.display = "none"
		ArtNouveau.style.display = "none"
		Flacon.style.display = "none"
		Parfum.style.display = "none"
		Bouchon.style.display = "block"
		Maestria.style.display = "none"
	}

	else if ( currentPageId >= 16 ) {
		Narration.style.display = "none"
		ArtNouveau.style.display = "none"
		Flacon.style.display = "none"
		Parfum.style.display = "none"
		Bouchon.style.display = "none"
		Maestria.style.display = "block"
	}

	switch (currentPageId) {
		case 1:
			new VoiceEqualizer("/sounds/voice.mp3");
			break
	}

	/**
	 * POUR CHAQUE PAGE - SOUS-TITRES
	 */
	if (page.footer.title && page.footer.chapo) {
		footer.innerHTML = `
			<div class="footer__intro">
				<p class="footer__title">${page.footer.title}</p>
				<p class="footer__chapo">${page.footer.chapo}</p>
			</div>
		`
	}
	else if (page.footer.subtitles) {
		footer.innerHTML = `
			<div class="footer__subtitles">
				<div class="lalique"><img src="./styles/images/lalique_placeholder.png" alt=""></div>
				<p>${page.footer.subtitles}</p>
			</div>
		`
	}
	else {
		footer.replaceChildren()
	}
}

document.addEventListener('DOMContentLoaded', function(){
	currentPageId = 0
	updatePage()

	const nextButton = document.getElementById("next")
	nextButton.onclick = updatePage
}, false);


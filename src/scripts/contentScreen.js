import { PAGES } from '../data/content'
import { VoiceEqualizer } from './VoiceEqualizer';

// const main = document.getElementById('content-screen-main')
const footer = document.getElementById('content-screen-footer')

const nextButton = document.getElementById("next")

const Narration = document.getElementById('Narration')
const ArtNouveau = document.getElementById('ArtNouveau')
const Flacon = document.getElementById('Flacon')
const Parfum = document.getElementById('Parfum')
const Bouchon = document.getElementById('Bouchon')
const Maestria = document.getElementById('Maestria')
const eqCanvas = document.getElementById('eq-canvas')
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
	console.log('currentPageId: ', currentPageId)

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

	// Parfum
	else if ( currentPageId >= 10 && currentPageId <= 12 ) {
		Narration.style.display = "none"
		ArtNouveau.style.display = "none"
		Flacon.style.display = "none"
		Parfum.style.display = "block"
		Bouchon.style.display = "none"
		Maestria.style.display = "none"
	}

	// Bouchon
	else if ( currentPageId >= 13 && currentPageId <= 15 ) {
		Narration.style.display = "none"
		ArtNouveau.style.display = "none"
		Flacon.style.display = "none"
		Parfum.style.display = "none"
		Bouchon.style.display = "block"
		Maestria.style.display = "none"
	}

	// 3D
	else if ( currentPageId >= 16 ) {
		Narration.style.display = "none"
		ArtNouveau.style.display = "none"
		Flacon.style.display = "none"
		Parfum.style.display = "none"
		Bouchon.style.display = "none"
		Maestria.style.display = "block"
	}

	/**
	 * SON - CHAQUE PAGE
	 */
	switch (currentPageId) {
		case 1:
			new VoiceEqualizer("/sounds/N_01.mp3");
			break;
		case 2:
			new VoiceEqualizer("/sounds/N_02.mp3");
			break;
		case 3:
			new VoiceEqualizer("/sounds/N_03.mp3");
			break;
		case 4:
			new VoiceEqualizer("/sounds/A_01.mp3");
			break;
		case 5:
			new VoiceEqualizer("/sounds/A_02.mp3");
			break;
		case 6:
			new VoiceEqualizer("/sounds/A_03.mp3");
			break;
		case 7:
			new VoiceEqualizer("/sounds/F_01.mp3");
			break;
		case 8:
			new VoiceEqualizer("/sounds/F_02.mp3");
			break;
		case 9:
			new VoiceEqualizer("/sounds/F_03.mp3");
			break;
		case 10:
			new VoiceEqualizer("/sounds/P_01.mp3");
			break;
		case 11:
			new VoiceEqualizer("/sounds/P_02.mp3");
			break;
		case 12:
			new VoiceEqualizer("/sounds/P_03.mp3");
			break;
		case 13:
			new VoiceEqualizer("/sounds/B_01.mp3");
			break;
		case 14:
			new VoiceEqualizer("/sounds/B_02.mp3");
			break;
		case 15:
			new VoiceEqualizer("/sounds/B_03.mp3");
			break;
		case 16:
			new VoiceEqualizer("/sounds/3d_01.mp3");
			break;
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

	nextButton.onclick = updatePage
}, false);


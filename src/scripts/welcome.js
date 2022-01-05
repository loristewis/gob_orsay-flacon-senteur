import Logo_Gobelins from './../styles/images/Logo_Gobelins.png'
import Loading from './../styles/images/Loading.png'
import Logo_Orsay from './../styles/images/Logo_Orsay.png'
import Logo_Projet from './../styles/images/logo.svg'

const welcomeScreen = document.getElementById("welcome-screen")

const startButton = document.getElementById("start-button")

const loadingScreen = document.getElementById("loading-screen")
const titleScreen = document.getElementById("title-screen")

let loadingText = 'Chargement...'

loadingScreen.innerHTML = `
<div class="content-wrapper content-wrapper__loading">
	<div class="logos-wrapper">
		<img src="${Logo_Gobelins}" alt="Gobelins, l'école de l'image">
		<img src="${Loading}" alt="">
		<img src="${Logo_Orsay}" alt="Musée d'Orsay">
	</div>
	<div class="text-wrapper">${loadingText}</div>
</div>
`

titleScreen.innerHTML = `
<div class="content-wrapper content-wrapper__title">
	<div class="title-wrapper">
		<h1 class="logo-wrapper"><img src="${Logo_Projet}" alt="Flacon à senteur"></h1>
		<p>Découvrez l’Art nouveau à travers<br>la conception d’un bijou fabriqué par <span class="bagerich">René LALIQUE</span></p>
	</div>
	<div id="start-button">Commencer</div>
	<ul class="names">
		<li>Bartholomé CHASSAC</li>
		<li>Loris BIRKEMEYER</li>
		<li>Pierre NOTTIN</li>
		<li>Quentin SÉNÉCAL</li>
		<li>Sami BOUTALEB</li>
	</ul>
</div>
`

titleScreen.style.visibility = "hidden"

loadingScreen.onclick = () => {
	loadingScreen.style.visibility = "hidden"
	titleScreen.style.visibility = "visible"
}

titleScreen.onclick = () => {
	welcomeScreen.style.display = "none"
}



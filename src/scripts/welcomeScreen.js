const welcomeScreen = document.getElementById("welcome-screen");
const contentScreen = document.getElementById("content-screen");

// const startButton = document.getElementById("start-button")

const loadingScreen = document.getElementById("loading-screen");
const titleScreen = document.getElementById("title-screen");

document.addEventListener(
  "DOMContentLoaded",
  function () {
    titleScreen.style.visibility = "hidden";

    loadingScreen.onclick = () => {
      loadingScreen.style.visibility = "hidden";
      titleScreen.style.visibility = "visible";
    };

    // titleScreen.onclick = () => {
    //   welcomeScreen.style.display = "none";
    //   contentScreen.style.visibility = "visible";
    // };

<<<<<<< HEAD
    /** DEBUG - ACCÈS DIRECT CONTENU */
    // welcomeScreen.style.display = "none";
    // contentScreen.style.visibility = "visible";
  },
  false
);
=======
	/** DEBUG - ACCÈS DIRECT CONTENU */
	// welcomeScreen.style.display = "none";	contentScreen.style.visibility = "visible"

}, false);
>>>>>>> 6013ad794cccef0ba306c2c638f3ec92ac163cc3

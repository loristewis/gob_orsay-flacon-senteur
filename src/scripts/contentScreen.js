import { PAGES, svgPath } from "../data/content";
import { VoiceEqualizer } from "./VoiceEqualizer";
import Scene2D from "./2d";
import Scene3D from "./3d";
import ee from "./utils/eventsSetUp";

const main = document.getElementById("content-screen-main");
const footer = document.getElementById("content-screen-footer");
const userInterface = document.getElementById("content-screen");

const drawCanvas = document.querySelector("canvas.draw-canvas");
const webglCanvas = document.querySelector("canvas.webgl");

const Narration = document.getElementById("Narration");
const ArtNouveau = document.getElementById("ArtNouveau");
const Flacon = document.getElementById("Flacon");
const Parfum = document.getElementById("Parfum");
const Bouchon = document.getElementById("Bouchon");
const Maestria = document.getElementById("Maestria");
Narration.style.display = "none";
ArtNouveau.style.display = "none";
Flacon.style.display = "none";
Parfum.style.display = "none";
Bouchon.style.display = "none";
Maestria.style.display = "none";

let currentPageId;
let audioVoiceInstance, canvasDrawingInstance, canvas3dInstance;

canvas3dInstance = new Scene3D();

// const audio = document.createElement('audio')
// const mainTitle = document.createElement('h2')
// const mainContent = document.createElement('div')

const updatePage = () => {
  currentPageId++;
  // console.log("update page");
  let page;
  if (currentPageId !== 0) {
    page = PAGES[currentPageId - 1];
  }

  console.log(currentPageId);

  /**
   * POUR CHAQUE GROUPE DE 3 PAGES
   */

  // Narration
  if (currentPageId >= 1 && currentPageId <= 3) {
    Narration.style.display = "block";
    ArtNouveau.style.display = "none";
    Flacon.style.display = "none";
    Parfum.style.display = "none";
    Bouchon.style.display = "none";
    Maestria.style.display = "none";
  }

  // ArtNouveau
  else if (currentPageId >= 4 && currentPageId <= 6) {
    Narration.style.display = "none";
    ArtNouveau.style.display = "block";
    Flacon.style.display = "none";
    Parfum.style.display = "none";
    Bouchon.style.display = "none";
    Maestria.style.display = "none";
  }

  // Flacon
  else if (currentPageId >= 7 && currentPageId <= 9) {
    Narration.style.display = "none";
    ArtNouveau.style.display = "none";
    Flacon.style.display = "block";
    Parfum.style.display = "none";
    Bouchon.style.display = "none";
    Maestria.style.display = "none";
  } else if (currentPageId >= 10 && currentPageId <= 12) {
    Narration.style.display = "none";
    ArtNouveau.style.display = "none";
    Flacon.style.display = "none";
    Parfum.style.display = "block";
    Bouchon.style.display = "none";
    Maestria.style.display = "none";
  } else if (currentPageId >= 13 && currentPageId <= 15) {
    Narration.style.display = "none";
    ArtNouveau.style.display = "none";
    Flacon.style.display = "none";
    Parfum.style.display = "none";
    Bouchon.style.display = "block";
    Maestria.style.display = "none";
  } else if (currentPageId >= 16) {
    Narration.style.display = "none";
    ArtNouveau.style.display = "none";
    Flacon.style.display = "none";
    Parfum.style.display = "none";
    Bouchon.style.display = "none";
    Maestria.style.display = "block";
  }

  // HANDLE AUDIO
  if (currentPageId >= 1) {
    if (audioVoiceInstance && currentPageId >= 2) audioVoiceInstance.destroy();
    audioVoiceInstance = new VoiceEqualizer(
      `/sounds/${page.audio}.mp3`,
      currentPageId
    );
  }

  //HANDLE CANVAS DRAWING
  //DRAW FLACON
  if (currentPageId === 7) {
    drawCanvas.style.zIndex = 999;
    canvasDrawingInstance = new Scene2D(
      svgPath.flacon,
      window.innerWidth * 0.07,
      200,
      20
    );
    canvasDrawingInstance.init();
  }

  //FILL FLACON
  document.addEventListener("click", (e) => {
    if (e.target !== document.getElementById("next") && currentPageId == 10) {
      ee.emit("fillFlacon", "flacon the flacon");
      setTimeout(() => {
        updatePage();
        //fillFlacon animation duration + 0.2
      }, 1200);
    }
  });

  //EVENT LISTENERS
  ee.on("drawingCompleted", (info) => {
    console.log("event received");
    if (info == "flacon drawing end" && currentPageId == 7) {
      drawCanvas.style.zIndex = -1;
      // webglCanvas.style.zIndex = 999;

      //HIDE background to enable 3D scene
      userInterface.style.background = "unset";

      //Not working, should call destroy method
      canvasDrawingInstance = null;
      canvas3dInstance.addGroup();
      updatePage();
    }
    // console.log(info);
  });

  /**
   * POUR CHAQUE PAGE - SOUS-TITRES
   */
  if (currentPageId !== 0) {
    // console.log(page);
    if (page.footer.title && page.footer.chapo) {
      footer.innerHTML = `
				 <div class="footer__intro">
					 <p class="footer__title">${page.footer.title}</p>
					 <p class="footer__chapo">${page.footer.chapo}</p>
				 </div>
			 `;
    } else if (page.footer.subtitles) {
      footer.innerHTML = `
				 <div class="footer__subtitles">
					 <div class="lalique"><img src="./styles/images/lalique_placeholder.png" alt=""></div>
					 <p>${page.footer.subtitles}</p>
				 </div>
			 `;
    } else {
      footer.replaceChildren();
    }
  }
};

document.addEventListener(
  "DOMContentLoaded",
  function () {
    // currentPageId = -1;
    // TODO DELETE
    currentPageId = 6;
    updatePage();

    const nextButton = document.getElementById("next");
    const welcomeButton = document.getElementById("start-button");
    nextButton.onclick = updatePage;
    welcomeButton.onclick = updatePage;
  },
  false
);

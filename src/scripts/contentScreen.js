import { PAGES } from "../data/content";
import { VoiceEqualizer } from "./VoiceEqualizer";
import Scene2D from "./2d";

const main = document.getElementById("content-screen-main");
const footer = document.getElementById("content-screen-footer");

const drawCanvas = document.querySelector("canvas.draw-canvas");

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
let audioVoiceInstance, canvasDrawingInstance;

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
    if (currentPageId >= 2) audioVoiceInstance.destroy();
    audioVoiceInstance = new VoiceEqualizer(
      `/sounds/${page.audio}.mp3`,
      currentPageId
    );
  }

  //HANDLE CANVAS DRAWING
  if (currentPageId >= 7) {
    drawCanvas.style.zIndex = 999;
    canvasDrawingInstance = new Scene2D(
      `M473.8853,265.29a1584.1862,1584.1862,0,0,0-35-180c-.74-3-5-24.14-9.73-43q-10.14-5.5-20.63-10.28a355.6413,355.6413,0,0,0-94.59-27.63A413.9094,413.9094,0,0,0,252.8853,0c-9.74,0-19.49.34-29.19,1a516.8948,516.8948,0,0,0-78.3,11.19,548.6731,548.6731,0,0,0-58.67,16.31q-9.91,3.38-19.67,7.16c-4.7,1.84-9.53,3.37-14.11,5.55a2.49,2.49,0,0,0-1,.7,2.68,2.68,0,0,0-.38,1c-3.64,14.06-6.12,28.37-9.68,42.46a1584.2039,1584.2039,0,0,0-35,180c-26.07,196.76,24.56,374.63,106.85,552.4,23,49.67,52.34,121.18,103.53,148.47a53.67,53.67,0,0,0,25.45,6.76c60.33,0,105-113.59,124.32-155.23C449.3253,640.06,499.9553,462.13,473.8853,265.29Zm-135.69,539.13c-1.89,4.05-4,8.71-6.19,13.67-10.19,22.75-25.6,57.12-44,84.24-16.82,24.71-33.31,38.89-45.26,38.89a22.421,22.421,0,0,1-10.49-3c-37.65-20.07-64.41-78.64-84-121.42-1.95-4.23-3.84-8.37-5.68-12.35-94.12-203.29-126.26-368.27-104.21-535,7.44-56.3,19-115.63,34.31-176.36,1.86-7.35,3.41-14.62,4.91-21.63.47-2.14.92-4.24,1.38-6.33,5.7-2.21,11.76-4.41,18-6.55a519.4671,519.4671,0,0,1,55.32-15.4,487.8786,487.8786,0,0,1,73.46-10.51c9.11-.59,18.26-.89,27.18-.89h0a384.1114,384.1114,0,0,1,56.29,4.07A322.66,322.66,0,0,1,395.3853,61c2.07,1,4.17,1.93,6.27,3,1.91,8.35,3.58,16.14,4.75,21.57,1,4.36,1.33,6.19,1.65,7.46v.12c15.32,60.73,26.87,120.06,34.31,176.36C464.4553,436.18,432.3153,601.15,338.1953,804.42Z`,
      240,
      480,
      40
    );
    canvasDrawingInstance.init();
  }

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
    currentPageId = -1;
    updatePage();

    const nextButton = document.getElementById("next");
    const welcomeButton = document.getElementById("start-button");
    nextButton.onclick = updatePage;
    welcomeButton.onclick = updatePage;
  },
  false
);

const lalique = "René LALIQUE (1860-1945)";

export const svgPath = {
  flacon: `M213.28,118.32A688,688,0,0,0,198,39.88c-.32-1.31-2.18-10.52-4.25-18.74q-4.43-2.38-9-4.48a156.11,156.11,0,0,0-41.32-12,180.23,180.23,0,0,0-26.66-1.9c-4.26,0-8.52.14-12.75.43A225.37,225.37,0,0,0,69.8,8a238.91,238.91,0,0,0-25.63,7.1q-4.34,1.49-8.59,3.12c-2.06.81-4.17,1.47-6.17,2.42A1.18,1.18,0,0,0,29,21a1.14,1.14,0,0,0-.17.43c-1.59,6.13-2.67,12.37-4.23,18.51A688.26,688.26,0,0,0,9.3,118.35C-2.09,204.1,20,281.6,56,359.07c10,21.65,22.86,52.81,45.22,64.7a23.37,23.37,0,0,0,11.12,2.94c26.35,0,45.86-49.49,54.3-67.64C202.55,281.63,224.67,204.1,213.28,118.32ZM154,353.25c-.82,1.77-1.75,3.8-2.7,6-4.45,9.91-11.19,24.89-19.22,36.71-7.35,10.77-14.55,16.95-19.77,16.95a9.94,9.94,0,0,1-4.58-1.31c-16.45-8.75-28.14-34.27-36.69-52.91-.86-1.85-1.68-3.65-2.49-5.38C27.45,264.68,13.41,192.79,23.05,120.13A679.68,679.68,0,0,1,38,43.28c.81-3.2,1.49-6.37,2.15-9.42.2-.94.4-1.85.6-2.76,2.49-1,5.14-1.92,7.86-2.86a227.05,227.05,0,0,1,24.17-6.71A213,213,0,0,1,104.89,17c4-.26,8-.39,11.87-.39a168.6,168.6,0,0,1,24.59,1.78A140.73,140.73,0,0,1,179,29.3c.91.43,1.82.84,2.74,1.3.83,3.64,1.56,7,2.07,9.4.44,1.9.59,2.7.73,3.25v.06a679.25,679.25,0,0,1,15,76.85C209.16,192.79,195.12,264.68,154,353.25Z`,
  bouchon: `M97.75,16.37v.06l4.44,0a58,58,0,0,1,14.06,1.54,8.82,8.82,0,0,1,3.4,1.45c.24.55.61,1.8.88,2.74A42.31,42.31,0,0,0,124,31,53.9,53.9,0,0,0,134.1,43.68a129.66,129.66,0,0,0,13.5,10.93c2.27,1.67,4.43,3.26,6.44,4.88,13.14,10.53,20,20.07,23.09,31.87.15.61.29,1.3.42,2a192.87,192.87,0,0,0-74.28-14.36c-35.77,0-65.94,9-82.23,15,.17-.83.37-1.74.63-2.74,3-11.8,10-21.34,23.08-31.87,2-1.62,4.17-3.21,6.45-4.88A129.66,129.66,0,0,0,64.7,43.68,53.9,53.9,0,0,0,74.84,31a42.31,42.31,0,0,0,3.42-8.83c.27-.94.64-2.19.88-2.74a8.82,8.82,0,0,1,3.4-1.45,72.62,72.62,0,0,1,15.21-1.57m1.76-15A91.14,91.14,0,0,0,79,3.36c-5.19,1.27-10.31,4-12.87,8.57C64,15.65,63.72,20,61.67,23.77a38.7,38.7,0,0,1-7.36,9.09c-5.8,5.57-12.67,9.9-18.94,14.93C21.88,58.6,11.51,70.69,7.15,87.62,6,92,4.77,98.37,5.71,103.65a9.88,9.88,0,0,0,13.58,7.26,225.12,225.12,0,0,1,84-16.86c25.18,0,53.32,4.76,81.09,19a6.83,6.83,0,0,0,3,.85c7.43,0,6.15-19,4.25-26.32-4.36-16.93-14.73-29-28.22-39.83-6.27-5-13.14-9.36-19-14.93a39,39,0,0,1-7.36-9.09c-2-3.75-2.36-8.12-4.44-11.84-2.56-4.57-7.68-7.3-12.87-8.57a73.69,73.69,0,0,0-17.6-2l-4.55,0,3.46,0h1.71c-1.08,0-2.19,0-3.32,0Z`,
};

export const PAGES = [
  {
    name: "Narration_01",
    audio: "N_01",
    footer: {
      title: "René LALIQUE (1860-1945)",
      chapo:
        "Bien le bonjour ! Je suis René LALIQUE, un maître verrier, bijoutier, joalier et médailleur français du XIXe siècle.",
    },
  },
  {
    name: "Narration_02",
    audio: "N_02",
    footer: {
      title: "René LALIQUE (1860-1945)",
      chapo:
        "Aujourd’hui, vous allez m’aider à reproduire l’un de mes bijoux préféré, le Flacon à Senteur. ",
    },
  },
  {
    name: "Narration_03",
    audio: "N_03",
    footer: {
      title: "René LALIQUE (1860-1945)",
      chapo: "Mais avant cela, je vais vous expliquer ce qu’est l’Art nouveau.",
    },
  },
  {
    name: "ArtNouveau_01",
    audio: "A_01",
    footer: {
      subtitles:
        "L’Art nouveau apparait à la fin du XIXe siècle, c’est un mouvement artistique\n" +
        "que l’on peut qualifier “à la mode” jusqu’à la Première Guerre Mondiale.",
    },
  },
  {
    name: "ArtNouveau_02",
    audio: "A_02",
    footer: {
      subtitles:
        "Ce style s’inspire principalement de 3 choses : la faune, la flore et la femme.",
    },
  },
  {
    name: "ArtNouveau_03",
    audio: "A_03",
    footer: {
      subtitles:
        "Je me suis illustré dans la joiallerie mais l’Art nouveau a aussi inspiré\n" +
        "l’architecture, la peinture, l’ébénisterie ou la verrerie.",
    },
  },
  {
    name: "Flacon_01",
    audio: "F_01",
    footer: {
      subtitles:
        "Tout d’abord, faconnez le verre du flacon.\n" +
        "Pour ce faire, dessinez les contours du verre avec votre curseur.",
    },
  },
  {
    name: "Flacon_02",
    audio: "F_02",
    footer: {
      // subtitles: "Bien joué mon cher !",
      subtitles: "Élémentaire, n'est-ce pas ?",
    },
  },
  {
    name: "Flacon_03",
    audio: "F_03",
    footer: {
      subtitles:
        "Vous pouvez remarquer que le flacon s’inspire du monde aquatique,\n" +
        "La forme ovoide du verre represente un calamar, \n" +
        "ou l’on peut distinguer 4 gravures de poissons",
    },
  },
  {
    name: "Parfum_01",
    audio: "P_01",
    footer: {
      subtitles:
        "Après le verre, vient l’étape du parfum !\n" +
        "Pour cela, cliquez sur le flacon avec votre curseur.",
    },
  },
  {
    name: "Parfum_02",
    audio: "P_02",
    footer: {
      // subtitles: "Humm ça sent bon !",
      subtitles: "Humm, quelle réussite !",
    },
  },
  {
    name: "Parfum_03",
    audio: "P_03",
    footer: {
      subtitles:
        "Mes parfums furent notamment vendus auprès de femmes issues de la noblesse. Par exemple ce “Flacon à Senteurs” fut produit pour Nina Alexandrovna Konchine.",
    },
  },
  {
    name: "Bouchon_01",
    audio: "B_01",
    footer: {
      subtitles:
        "Et maintenant le clou du spectacle, le bouchon du flacon ! Dessinez les contours du bouchon avec votre curseur.",
    },
  },
  {
    name: "Bouchon_02",
    audio: "B_02",
    footer: {
      // subtitles: "Chapeau l’artiste !",
      subtitles: "Bien joué ! Je n'aurais pas mieux fait.",
    },
  },
  {
    name: "Bouchon_03",
    audio: "B_03",
    footer: {
      subtitles:
        "Vous pouvez voir que le bouchon est en or fondu et qu’il est ciselé.\n" +
        "Ici j’ai aussi représenté des algues, dans un esprit qui rappelle le rococo.",
    },
  },
  {
    name: "Modelisation_3D",
    audio: "3d_01",
    footer: {
      subtitles:
        "Et bien mon ami, quelle maestria ! \n" +
        "Vous avez réussi à produire votre premier flacon, bravo !",
    },
  },
];

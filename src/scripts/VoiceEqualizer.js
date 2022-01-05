import Particles from "./Particles";

class VoiceEqualizer {
  constructor(audioUrl) {
    this.canvas = document.querySelector(".eq-canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.image = document.querySelector("#portrait-eq");
    this.imageWidth = this.image.getBoundingClientRect().width;
    this.testCounter = 0;
    this.circleRadius = this.imageWidth / 2 + 15;
    this.offsetEq = 10;

    this.audioUrl = audioUrl;
    this.oldVoiceLvl = [];
    this.particlesState = Array(100);

    this.ctx = this.canvas.getContext("2d");
    console.log(document.querySelector("button"));
    document
      .querySelector("button")
      .addEventListener("click", this.setUpAudio.bind(this));
    // this.init();
    this.setUpCanvas();
  }

  setUpCanvas() {
    this.ctx.beginPath();
    this.ctx.arc(
      this.canvas.width / 2,
      this.canvas.height / 2,
      this.circleRadius,
      0,
      2 * Math.PI
    );
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  setUpAudio() {
    this.audio = new Audio();
    this.isPlaying = false;

    this.audio.src = this.audioUrl;
    this.audio.muted = false;
    this.audio.autoplay = false;

    this.audio.addEventListener("loadeddata", () => {
      // document.querySelector("#audio").append(this.audio);

      this.audioContext = new AudioContext();
      this.analyser = this.audioContext.createAnalyser();
      this.source = this.audioContext.createMediaElementSource(this.audio);

      this.source.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
      this.audio.play();
      this.loop();
    });

    // window.setTimeout(() => {
    // }, 1500);
    // document.addEventListener("click", () => {
    //   this.isPlaying ? this.audio.play() : this.audio.pause();
    //   this.isPlaying = !this.isPlaying;
    //   // this.loop();
    // });
  }

  loop() {
    const fbc_array = new Uint8Array(this.analyser.frequencyBinCount);
    const bar_count = this.canvas.width;
    const bar_count_circle = 100;

    this.analyser.getByteFrequencyData(fbc_array);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "#ffffff";

    this.setUpCanvas();
    // console.log((Math.PI * 2) / 100);

    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;

    for (let i = 0; i < bar_count_circle; i++) {
      const angle = ((Math.PI * 2) / bar_count_circle) * i;
      const bar_pos = i * 4;
      const bar_width = 2;
      const bar_height = Math.max(Math.pow(fbc_array[i], 2) * 0.0015, 5);
      this.ctx.beginPath();

      //EQ line
      const startX =
        centerX + Math.cos(angle) * (this.circleRadius + this.offsetEq);
      const startY =
        centerY + Math.sin(angle) * (this.circleRadius + this.offsetEq);

      const endX =
        centerX +
        Math.cos(angle) * (this.circleRadius + this.offsetEq + bar_height);
      const endY =
        centerY +
        Math.sin(angle) * (this.circleRadius + this.offsetEq + bar_height);

      this.ctx.moveTo(startX, startY);
      this.ctx.lineTo(endX, endY);

      this.ctx.lineWidth = 5;
      this.ctx.lineCap = "round";

      this.ctx.stroke();
      this.ctx.closePath();

      // Particle
      const particleX =
        centerX +
        Math.cos(angle) * (this.circleRadius + this.offsetEq * 3 + bar_height);
      const particleY =
        centerY +
        Math.sin(angle) * (this.circleRadius + this.offsetEq * 3 + bar_height);

      if (
        this.particlesState[i] !== undefined &&
        this.particlesState[i] &&
        this.particlesState[i][0] === true
      ) {
        this.particlesState[i][1].draw();
        this.particlesState[i][2] += 0.005;
        if (this.particlesState[i][2] % 1 <= 0.0008)
          this.particlesState[i][0] = false;
      }

      if (
        bar_height > 30 &&
        (this.particlesState[i] === undefined ||
          this.particlesState[i][0] === false)
      ) {
        const particle = new Particles(
          particleX,
          particleY,
          this.ctx,
          angle,
          this.circleRadius + this.offsetEq * 3 + bar_height,
          centerX,
          centerY
        );

        // const particle = new Particles(this.ctx, particleX, particleY);
        particle.initNew();

        this.particlesState[i] = [true, particle, 0];
      }

      this.testCounter += 0.0001;
      this.oldVoiceLvl = bar_height;

      // this.ctx.beginPath();
      // this.ctx.lineWidth = bar_width;
      // this.ctx.strokeStyle = "white";
      // this.ctx.moveTo(bar_pos, this.canvas.height);
      // this.ctx.lineTo(bar_pos, this.canvas.height - bar_height);
      // this.ctx.stroke();
      // this.ctx.closePath();

      // this.ctx.fillRect(bar_pos, this.canvas.height, bar_width, bar_height);
    }
    requestAnimationFrame(this.loop.bind(this));
  }
}

new VoiceEqualizer("/sounds/voice.mp3");

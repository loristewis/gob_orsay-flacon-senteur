class Particles {
  constructor(
    particleX,
    particleY,
    context,
    angle,
    baseRadius,
    centerX,
    centerY
  ) {
    this.ctx = context;

    this.centerX = centerX;
    this.centerY = centerY;

    this.angle = angle;
    this.baseRadius = baseRadius;
    // this.x = particleX;
    this.x = centerX + Math.cos(angle) * baseRadius;
    // this.y = particleY;
    this.y = centerY + Math.sin(angle) * baseRadius;
    this.size = 1;
    // console.log(
    //   centerX + Math.cos(angle) * baseRadius,
    //   centerY + Math.sin(angle) * baseRadius
    // );
    this.lifespan = 3 * Math.random();
    this.lifespanRef = this.lifespan;
    this.progress = 1;

    this.multipleParticles = Math.ceil(Math.random() * 5);
    this.multipleParticlesSettings = [];

    for (let i = 0; i < this.multipleParticles; i++) {
      this.multipleParticlesSettings.push([
        i * (Math.random() * 25),
        i * (Math.random() * 25),
        i === 0 ? this.size : Math.random() * 3,
      ]);
    }
    // this.multipleParticles.forEach((el, i) => {
    //   this.multipleParticlesSettings.push([
    //     i * (Math.random() * 5),
    //     i * (Math.random() * 5),
    //   ]);
    // });
  }

  initNew() {
    this.draw();
  }

  draw() {
    for (let i = 0; i < this.multipleParticles; i++) {
      this.update();
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(
        this.x + this.multipleParticlesSettings[i][0],
        this.y + this.multipleParticlesSettings[i][1],
        this.multipleParticlesSettings[i][2],
        0,
        2 * Math.PI
      );
      this.ctx.fillStyle = `white`;
      this.ctx.globalAlpha = Math.max(this.progress, 0.001);
      this.ctx.fill();
      this.ctx.closePath();
      this.ctx.restore();
    }
  }

  update() {
    this.lifespan -= 0.01;
    this.progress = this.lifespan / this.lifespanRef;
    this.x = this.centerX + Math.cos(this.angle) * (this.baseRadius += 0.25);
    this.y = this.centerY + Math.sin(this.angle) * (this.baseRadius += 0.25);
  }
}
export default Particles;

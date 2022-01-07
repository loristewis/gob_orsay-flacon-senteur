import ee from "./utils/eventsSetUp";

//2D Canvas
// `M473.8853,265.29a1584.1862,1584.1862,0,0,0-35-180c-.74-3-5-24.14-9.73-43q-10.14-5.5-20.63-10.28a355.6413,355.6413,0,0,0-94.59-27.63A413.9094,413.9094,0,0,0,252.8853,0c-9.74,0-19.49.34-29.19,1a516.8948,516.8948,0,0,0-78.3,11.19,548.6731,548.6731,0,0,0-58.67,16.31q-9.91,3.38-19.67,7.16c-4.7,1.84-9.53,3.37-14.11,5.55a2.49,2.49,0,0,0-1,.7,2.68,2.68,0,0,0-.38,1c-3.64,14.06-6.12,28.37-9.68,42.46a1584.2039,1584.2039,0,0,0-35,180c-26.07,196.76,24.56,374.63,106.85,552.4,23,49.67,52.34,121.18,103.53,148.47a53.67,53.67,0,0,0,25.45,6.76c60.33,0,105-113.59,124.32-155.23C449.3253,640.06,499.9553,462.13,473.8853,265.29Zm-135.69,539.13c-1.89,4.05-4,8.71-6.19,13.67-10.19,22.75-25.6,57.12-44,84.24-16.82,24.71-33.31,38.89-45.26,38.89a22.421,22.421,0,0,1-10.49-3c-37.65-20.07-64.41-78.64-84-121.42-1.95-4.23-3.84-8.37-5.68-12.35-94.12-203.29-126.26-368.27-104.21-535,7.44-56.3,19-115.63,34.31-176.36,1.86-7.35,3.41-14.62,4.91-21.63.47-2.14.92-4.24,1.38-6.33,5.7-2.21,11.76-4.41,18-6.55a519.4671,519.4671,0,0,1,55.32-15.4,487.8786,487.8786,0,0,1,73.46-10.51c9.11-.59,18.26-.89,27.18-.89h0a384.1114,384.1114,0,0,1,56.29,4.07A322.66,322.66,0,0,1,395.3853,61c2.07,1,4.17,1.93,6.27,3,1.91,8.35,3.58,16.14,4.75,21.57,1,4.36,1.33,6.19,1.65,7.46v.12c15.32,60.73,26.87,120.06,34.31,176.36C464.4553,436.18,432.3153,601.15,338.1953,804.42Z`;
export default class Scene2D {
  constructor(path, offsetX, offsetY, steps, drawType) {
    this.drawCanvas = document.querySelector("canvas.draw-canvas");
    this.drawCanvas.width = window.innerWidth;
    this.drawCanvas.height = window.innerHeight;
    this.ctx = this.drawCanvas.getContext("2d");

    this.drawType = drawType;

    //DEBUG CUBE
    // this.ctx.rect(50, 50, 200, 200);
    // this.ctx.fillStyle = "red";
    // this.ctx.fill();

    this.drawCompleted = false;

    this.figurePath = path;
    // const transformX = this.drawCanvas.width / 2 - 240;
    this.transformX = this.drawCanvas.width / 2 - offsetX;
    // const transformY = this.drawCanvas.height / 2 - 480;
    this.transformY = this.drawCanvas.height / 2 - offsetY;
    this.drawStep = steps;
    this.drawThreshold = 50;

    this.coord = { x: 0, y: 0 };
    this.prevPos = {
      x: 0,
      y: 0,
    };
    this.currentPos = {
      x: 0,
      y: 0,
    };
    this.colorProgress = 0;
  }

  init() {
    this.ctx.save();
    this.ctx.translate(this.transformX, this.transformY);
    this.drawFigure();
    this.setUpListeners();

    this.drawCanvas.style.setProperty("pointer-events", "auto");
  }

  drawFigure() {
    this.figure = new Path2D(this.figurePath);
    // this.ctx.fillStyle = "#F2EFEB";
    this.ctx.fillStyle = "#525759";
    this.ctx.clip(this.figure);
    this.ctx.fill(this.figure);
  }

  setUpListeners() {
    document.addEventListener("mousedown", this.startDrawing.bind(this));
    document.addEventListener("mouseup", this.stopDrawing.bind(this));
  }
  startDrawing(event) {
    this.reposition(event);
    document.addEventListener("mousemove", this.draw.bind(this));
  }
  stopDrawing() {
    console.log("stop");
    document.removeEventListener("mousemove", this.draw.bind(this));
  }
  draw(event) {
    let { clientX, clientY } = event;
    if (
      this.ctx.isPointInPath(this.figure, clientX, clientY) &&
      !this.drawCompleted
    ) {
      if (Math.abs(this.prevPos.x - this.currentPos.x) > this.drawThreshold) {
        this.prevPos.x = this.currentPos.x;
        this.colorProgress++;
      } else if (
        Math.abs(this.prevPos.y - this.currentPos.y) > this.drawThreshold
      ) {
        this.prevPos.y = this.currentPos.y;
        this.colorProgress++;
      }

      if (this.colorProgress > this.drawStep) {
        this.drawingCompleted();
      }
      this.currentPos.x = this.coord.x;
      this.currentPos.y = this.coord.y;

      this.ctx.beginPath();
      this.ctx.lineWidth = 40;
      this.ctx.lineCap = "round";
      this.ctx.strokeStyle = "white";
      this.ctx.moveTo(this.coord.x, this.coord.y);
      this.reposition(event);

      this.ctx.lineTo(this.coord.x, this.coord.y);
      this.ctx.stroke();
    }
  }
  reposition(event) {
    this.coord.x = event.clientX - this.transformX;
    this.coord.y = event.clientY - this.transformY;
  }

  drawingCompleted() {
    document.removeEventListener("mousemove", this.draw);
    document.removeEventListener("mousedown", this.startDrawing.bind(this));
    document.removeEventListener("mouseup", this.stopDrawing.bind(this));

    this.drawCompleted = true;
    this.drawCanvas.style.setProperty("pointer-events", "none");
    this.ctx.clearRect(
      -100,
      -100,
      window.innerWidth * 1.5,
      window.innerHeight * 1.5
    );
    setTimeout(() => {
      this.ctx.clearRect(
        -100,
        -100,
        window.innerWidth * 1.5,
        window.innerHeight * 1.5
      );
    }, 1);
    this.ctx.restore();

    this.drawType == "flacon"
      ? ee.emit("drawingCompleted", "flacon")
      : ee.emit("drawingCompleted", "bouchon");
  }
}

// const drawCanvas = document.querySelector("canvas.draw-canvas");
// drawCanvas.width = window.innerWidth;
// drawCanvas.height = window.innerHeight;

// const ctx = drawCanvas.getContext("2d");
// ctx.rect(50, 50, 200, 200);
// ctx.fillStyle = "red";
// ctx.fill();

// const scene1 = new Scene2D(
//   `M473.8853,265.29a1584.1862,1584.1862,0,0,0-35-180c-.74-3-5-24.14-9.73-43q-10.14-5.5-20.63-10.28a355.6413,355.6413,0,0,0-94.59-27.63A413.9094,413.9094,0,0,0,252.8853,0c-9.74,0-19.49.34-29.19,1a516.8948,516.8948,0,0,0-78.3,11.19,548.6731,548.6731,0,0,0-58.67,16.31q-9.91,3.38-19.67,7.16c-4.7,1.84-9.53,3.37-14.11,5.55a2.49,2.49,0,0,0-1,.7,2.68,2.68,0,0,0-.38,1c-3.64,14.06-6.12,28.37-9.68,42.46a1584.2039,1584.2039,0,0,0-35,180c-26.07,196.76,24.56,374.63,106.85,552.4,23,49.67,52.34,121.18,103.53,148.47a53.67,53.67,0,0,0,25.45,6.76c60.33,0,105-113.59,124.32-155.23C449.3253,640.06,499.9553,462.13,473.8853,265.29Zm-135.69,539.13c-1.89,4.05-4,8.71-6.19,13.67-10.19,22.75-25.6,57.12-44,84.24-16.82,24.71-33.31,38.89-45.26,38.89a22.421,22.421,0,0,1-10.49-3c-37.65-20.07-64.41-78.64-84-121.42-1.95-4.23-3.84-8.37-5.68-12.35-94.12-203.29-126.26-368.27-104.21-535,7.44-56.3,19-115.63,34.31-176.36,1.86-7.35,3.41-14.62,4.91-21.63.47-2.14.92-4.24,1.38-6.33,5.7-2.21,11.76-4.41,18-6.55a519.4671,519.4671,0,0,1,55.32-15.4,487.8786,487.8786,0,0,1,73.46-10.51c9.11-.59,18.26-.89,27.18-.89h0a384.1114,384.1114,0,0,1,56.29,4.07A322.66,322.66,0,0,1,395.3853,61c2.07,1,4.17,1.93,6.27,3,1.91,8.35,3.58,16.14,4.75,21.57,1,4.36,1.33,6.19,1.65,7.46v.12c15.32,60.73,26.87,120.06,34.31,176.36C464.4553,436.18,432.3153,601.15,338.1953,804.42Z`,
//   240,
//   480,
//   40
// );

// scene1.init();

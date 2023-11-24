const Application = PIXI.Application,
  Graphics = PIXI.Graphics;

const app = new Application({ antialias: true, resizeTo: window });

document.body.appendChild(app.view);

const graphics = new Graphics();

// 1) Rectangle
graphics.beginFill(0xde3249);
graphics.drawRect(50, 50, 100, 100);
graphics.endFill();

// 2) Rectangle + line style 1
graphics.lineStyle(2, 0xfeeb77, 1); // 마지막 속성: alpha
graphics.beginFill(0x650a5a);
graphics.drawRect(200, 50, 100, 100);
graphics.endFill();

// 3) Rectangle + line style 2
graphics.lineStyle(10, 0xffbd01, 1);
graphics.beginFill(0xc34288);
graphics.drawRect(350, 50, 100, 100);
graphics.endFill();

// 4) Rectangle2
graphics.lineStyle(2, 0xffffff, 1);
graphics.beginFill(0xaa4f08);
graphics.drawRect(530, 50, 140, 100);
graphics.endFill();

// 5) Circle
graphics.lineStyle(0); // 현재 lineStyle을 초기화 to make circle without outline
graphics.beginFill(0xde3249, 1); // 마지막 속성: alpha
graphics.drawCircle(100, 250, 50);
graphics.endFill();

// 6) Circle + line style 1
graphics.lineStyle(2, 0xfeeb77, 1);
graphics.beginFill(0x650a5a);
graphics.drawCircle(250, 250, 50);
graphics.endFill();

// 7) Circle + line style 2
graphics.lineStyle(10, 0xffbd01, 1);
graphics.beginFill(0xc34288);
graphics.drawCircle(400, 250, 50);
graphics.endFill();

// 8) Ellipse
graphics.lineStyle(2, 0xffffff, 1);
graphics.beginFill(0xaa4f08);
graphics.drawEllipse(600, 250, 80, 50);
graphics.endFill();

// 9) Draw a shape
graphics.beginFill(0xff3300);
graphics.lineStyle(4, 0xffd900);
graphics.moveTo(50, 350);
graphics.lineTo(250, 350);
graphics.lineTo(100, 400);
graphics.lineTo(50, 350);
graphics.closePath();
graphics.endFill();

// 10) Draw a rounded rectangle
graphics.lineStyle(2, 0xff00ff);
graphics.beginFill(0x650a5a, 0.25);
graphics.drawRoundedRect(50, 440, 100, 100, 16);
graphics.endFill();

// 11) Draw star
graphics.lineStyle(2, 0xffffff);
graphics.beginFill(0x35cc5a, 1);
graphics.drawStar(360, 370, 5, 50);
graphics.endFill();

// 12) Draw star 2
graphics.beginFill(0xffcc5a);
graphics.drawStar(280, 510, 7, 50);
graphics.endFill();

// 13) Draw star 3
graphics.lineStyle(4, 0xffffff);
graphics.beginFill(0x55335a);
graphics.drawStar(470, 450, 4, 50);
graphics.endFill();

// 14) Draw polygon
const path = [600, 370, 700, 460, 780, 420, 730, 570, 590, 520];
graphics.lineStyle(0);
graphics.beginFill(0x3500fa);
graphics.drawPolygon(path);
graphics.endFill();

app.stage.addChild(graphics);

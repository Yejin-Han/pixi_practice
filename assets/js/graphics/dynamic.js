const Application = PIXI.Application,
  Graphics = PIXI.Graphics,
  Sprite = PIXI.Sprite;

const app = new Application({ antialias: true, resizeTo: window });

document.body.appendChild(app.view);

const sprite = Sprite.from("https://pixijs.com/assets/bg_rotate.jpg");
const container = new PIXI.Container();
sprite.width = 50;
sprite.height = 50;
container.addChild(sprite);

container.x = app.screen.width - 100;
container.y = app.screen.height - 100;
app.stage.addChild(container);

const rect = new PIXI.Rectangle(
  container.x,
  container.y,
  sprite.width,
  sprite.height
);

app.stage.eventMode = "static";
app.stage.hitArea = rect; // 이벤트 실행 가능한 영역을 rect로 제한 (기하학적 모양이어야 함!)
// app.stage.hitArea = app.screen; (전체화면)

const graphics = new Graphics();

// set a fill and line style
graphics.beginFill(0xff3300);
graphics.lineStyle(10, 0xffd900, 1);

// draw a shape
graphics.moveTo(50, 50);
graphics.lineTo(250, 50);
graphics.lineTo(100, 100);
graphics.lineTo(250, 220);
graphics.lineTo(50, 220);
graphics.lineTo(50, 50);
graphics.closePath();
graphics.endFill();

// set a fill and line style
graphics.lineStyle(10, 0xff0000, 0.8);
graphics.beginFill(0xff700b, 1);

// draw a second shape
graphics.moveTo(210, 300);
graphics.lineTo(450, 320);
graphics.lineTo(570, 350);
graphics.quadraticCurveTo(600, 0, 480, 100);
graphics.lineTo(330, 120);
graphics.lineTo(410, 200);
graphics.lineTo(210, 300);
graphics.closePath();
graphics.endFill();

// draw a rectangle
graphics.lineStyle(2, 0x0000ff, 1);
graphics.drawRect(50, 250, 100, 100);

// draw a circle
graphics.lineStyle(0);
graphics.beginFill(0xffff0b, 0.5);
graphics.drawCircle(470, 200, 100);
graphics.endFill();

graphics.lineStyle(20, 0x33ff00);
graphics.moveTo(30, 30);
graphics.lineTo(600, 300);

app.stage.addChild(graphics);

// Moving shape //
const thing = new Graphics();

app.stage.addChild(thing);
thing.x = 400;
thing.y = 300;

let cnt = 0;

// Just click on the stage to draw random lines
// 현재 hitArea가 rect로 지정되어 있으므로, app 전체에 이벤트를 설정해도 rect에서만 반응함
// window.app = app; (여러 스크립트 파일에서 전역변수로 사용하기 위함)
app.stage.on("pointertap", () => {
  graphics.lineStyle(Math.random() * 50, Math.random() * 0xffffff, 1);
  graphics.moveTo(
    Math.random() * app.screen.width,
    Math.random() * app.screen.height
  );
  graphics.bezierCurveTo(
    Math.random() * app.screen.width,
    Math.random() * app.screen.height,
    Math.random() * app.screen.width,
    Math.random() * app.screen.height,
    Math.random() * app.screen.width,
    Math.random() * app.screen.height
  );
});

app.ticker.add(() => {
  cnt += 0.1;

  thing.clear();
  thing.lineStyle(10, 0xff0000, 1);
  thing.beginFill(0xffff00, 0.5);

  thing.moveTo(-120 + Math.sin(cnt) * 20, -100 + Math.cos(cnt) * 20);
  thing.lineTo(120 + Math.cos(cnt) * 20, -100 + Math.sin(cnt) * 20);
  thing.lineTo(120 + Math.sin(cnt) * 20, 100 + Math.cos(cnt) * 20);
  thing.lineTo(-120 + Math.cos(cnt) * 20, 100 + Math.sin(cnt) * 20);
  thing.lineTo(-120 + Math.sin(cnt) * 20, -100 + Math.cos(cnt) * 20);
  thing.closePath();

  thing.rotation = cnt * 0.1;
  thing.rotation %= Math.PI * 2;
});

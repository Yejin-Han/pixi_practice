const Application = PIXI.Application,
  Texture = PIXI.utils.TextureCache,
  Assets = PIXI.Assets,
  Sprite = PIXI.Sprite;

//Create a Pixi Application
const app = new Application({
  width: 256, // default: 800
  height: 256, // default: 600
  antialias: true, // default: false
  transparent: false, // default: false
  resolution: 1, // default: 1
});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

// 색상변경, 사이즈 변경
app.renderer.backgroundColor = 0x061639;
console.log(app.renderer.view.width, app.renderer.view.height);

app.renderer.autoDensity = true; // 캔버스 크기가 해상도와 일치하도록 조정
app.renderer.resize(512, 512);
console.log(app.renderer.view.width, app.renderer.view.height);

// 캔버스가 전체 창을 채우고 resize 시 캔버스 크기가 자동으로 조정
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;
app.resizeTo = window;
console.log(PIXI);

/*
// 브라우저 창 크기에 맞게 줄어듦
const scale = scaleToWindow(app.renderer.view, 0x909090);

window.addEventListener("resize", function (event) {
  scaleToWindow(app.renderer.view, 0x909090);
});
 */

async function loadAssets() {
  const cat = await Assets.load("./assets/images/cat.png");
  const penguin = await Assets.load("./assets/images/1.png");
  setup();
}

function setup() {
  const texture = Texture["./assets/images/cat.png"];
  const sprite = new Sprite(texture);
  app.stage.addChild(sprite);

  // (src 변경) sprite.texture = Texture["./assets/images/1.png"];
  // (삭제) app.stage.removeChild(sprite);
  // (가리기) sprite.visible = false;

  sprite.x = 96;
  sprite.y = 96;
  // sprite.width = 80;
  // sprite.height = 120;
  // sprite.scale.x = 2;
  // sprite.scale.y = 2;
  sprite.scale.set(1.5, 1.5);
  sprite.anchor.set(0.5, 0.5);
  sprite.rotation = 0.5;
}

loadAssets();

async function loadSprites() {
  const tileset = await Assets.load("./assets/images/tileset.png");
  setup2();
}

function setup2() {
  const texture = Texture["./assets/images/tileset.png"];
  const rectangle = new PIXI.Rectangle(192, 128, 64, 64);
  texture.frame = rectangle;

  const rocket = new Sprite(texture);
  rocket.x = 96;
  rocket.y = 256;

  app.stage.addChild(rocket);

  app.renderer.render(app.stage);
}

loadSprites();

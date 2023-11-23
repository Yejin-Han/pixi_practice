const Application = PIXI.Application,
  Assets = PIXI.Assets,
  Container = PIXI.Container,
  Texture = PIXI.Texture,
  Sprite = PIXI.Sprite;

const app = new Application({ resizeTo: window });

document.body.appendChild(app.view);

app.stop();

// load resources
Assets.load("https://pixijs.com/assets/spritesheet/monsters.json").then(
  onAssetsLoaded
);

// holder to store aliens
const aliens = [];
const alienFrames = [
  "eggHead.png",
  "flowerTop.png",
  "helmlok.png",
  "skully.png",
];

let cnt = 0;

// create an empty container
const alienContainer = new Container();

alienContainer.x = 400;
alienContainer.y = 300;

// make the stage interactive
app.stage.eventMode = "static";
app.stage.addChild(alienContainer);

function onAssetsLoaded() {
  // add a bunch of aliens with textures from image paths
  for (let i = 0; i < 100; i++) {
    const frameName = alienFrames[i % 4];

    // create an alien using the frame name
    const alien = Sprite.from(frameName);

    alien.tint = Math.random() * 0xffffff;

    alien.x = Math.random() * 800 - 400;
    alien.y = Math.random() * 600 - 300;
    alien.anchor.x = alien.anchor.y = 0.5;
    aliens.push(alien);
    alienContainer.addChild(alien);
  }

  app.start();
}

let flag = false;
// Combines both mouse click + touch tap
app.stage.on("pointertap", () => {
  alienContainer.cacheAsBitmap = !alienContainer.cacheAsBitmap; // 순간의 snapshat으로 고정
  /* 
  아래와 같이 하면 애니메이션 아예 멈춤
  if (flag) {
    app.start();
  } else {
    app.stop();
  }
  flag = !flag;
   */
});

app.ticker.add(() => {
  // let's rotate the aliens a little bit
  for (let i = 0; i < 100; i++) {
    const alien = aliens[i];

    alien.rotation += 0.1;
  }

  cnt += 0.01;

  alienContainer.scale.x = Math.sin(cnt);
  alienContainer.scale.y = Math.sin(cnt);
  alienContainer.rotation += 0.01;
});

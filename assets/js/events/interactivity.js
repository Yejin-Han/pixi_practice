const Application = PIXI.Application,
  Texture = PIXI.Texture,
  Sprite = PIXI.Sprite;

const app = new Application({ resizeTo: window });

document.body.appendChild(app.view);

// create a background
const bg = Sprite.from("https://pixijs.com/assets/bg_button.jpg");

bg.width = app.screen.width;
bg.height = app.screen.height;

app.stage.addChild(bg);

// create some textures from an image path
const textureBtn = Texture.from("https://pixijs.com/assets/button.png");
const textureBtnDown = Texture.from(
  "https://pixijs.com/assets/button_down.png"
);
const textureBtnOver = Texture.from(
  "https://pixijs.com/assets/button_over.png"
);

const btns = [];

const btnPos = [175, 75, 655, 75, 410, 325, 150, 465, 685, 445];

for (let i = 0; i < 5; i++) {
  const btn = new Sprite(textureBtn);

  btn.anchor.set(0.5);
  btn.x = btnPos[i * 2];
  btn.y = btnPos[i * 2 + 1];

  // make the button interactive
  btn.eventMode = "static";
  btn.cursor = "pointer";

  btn
    .on("pointerdown", onBtnDown)
    .on("pointerup", onBtnUp)
    .on("pointerupoutside", onBtnUp)
    .on("pointerover", onBtnOver)
    .on("pointerout", onBtnOut);

  btns.push(btn);
  app.stage.addChild(btn);
}

btns[0].scale.set(1.2);
btns[2].rotation = Math.PI / 10;
btns[3].scale.set(0.8);
btns[4].scale.set(0.8, 1.2);
btns[4].rotation = Math.PI;

function onBtnDown() {
  this.isdown = true;
  this.texture = textureBtnDown;
  this.alpha = 1;
}

function onBtnUp() {
  this.isdown = false;
  if (this.isOver) {
    this.texture = textureBtnOver;
  } else {
    this.texture = textureBtn;
  }
}

function onBtnOver() {
  this.isOver = true;
  if (this.isdown) {
    return;
  }
  this.texture = textureBtnOver;
}

function onBtnOut() {
  this.isOver = false;
  if (this.isdown) {
    return;
  }
  this.texture = textureBtn;
}

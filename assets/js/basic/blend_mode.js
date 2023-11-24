const Application = PIXI.Application,
  Assets = PIXI.Assets,
  Rectangle = PIXI.Rectangle,
  Texture = PIXI.Texture,
  Sprite = PIXI.Sprite;

const app = new Application({ resizeTo: window });

document.body.appendChild(app.view);

// create a background sprite
const bg = Sprite.from("https://pixijs.com/assets/bg_rotate.jpg");

bg.width = app.screen.width;
bg.height = app.screen.height;
app.stage.addChild(bg);

// create an array to store a reference to the dudes
const dudeArray = [];
const totdudes = 20;

for (let i = 0; i < totdudes; i++) {
  // create a new Sprite that uses the image name that we just generated as its source
  const dude = Sprite.from("https://pixijs.com/assets/flowerTop.png");

  dude.anchor.set(0.5);

  // set a random scale for the dude
  dude.scale.set(0.8 + Math.random() * 0.3);
  dude.x = Math.floor(Math.random() * app.screen.width);
  dude.y = Math.floor(Math.random() * app.screen.height);

  // change the default blend mode of the sprite
  dude.blendMode = PIXI.BLEND_MODES.ADD;

  // create some extra properties that will control movement
  dude.direction = Math.random() * Math.PI * 2;

  // this number will be used to modify the direction of the dude over time
  dude.turningSpeed = Math.random() - 0.8;

  // create a random speed for the dude between 2 - 4
  dude.speed = 2 + Math.random() * 2;

  dudeArray.push(dude);
  app.stage.addChild(dude);
}

// create a bounding box for the little dudes
const dudeBoundsPadding = 100;

const dudeBounds = new Rectangle(
  -dudeBoundsPadding,
  -dudeBoundsPadding,
  app.screen.width + dudeBoundsPadding * 2,
  app.screen.height + dudeBoundsPadding * 2
);

app.ticker.add(() => {
  // iterate through the dudes and update the positions
  for (let i = 0; i < dudeArray.length; i++) {
    const dude = dudeArray[i];

    dude.direction += dude.turningSpeed * 0.01;
    dude.x += Math.sin(dude.direction) * dude.speed;
    dude.y += Math.cos(dude.direction) * dude.speed;
    dude.rotation = -dude.direction - Math.PI / 2;

    // wrap the dudes by testing their bounds
    if (dude.x < dudeBounds.x) {
      dude.x += dudeBounds.width;
    } else if (dude.x > dudeBounds.x + dudeBounds.width) {
      dude.x -= dudeBounds.width;
    }

    if (dude.y < dudeBounds.y) {
      dude.y += dudeBounds.height;
    } else if (dude.y > dudeBounds.y + dudeBounds.height) {
      dude.y -= dudeBounds.height;
    }
  }
});

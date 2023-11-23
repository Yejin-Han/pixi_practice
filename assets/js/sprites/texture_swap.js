const Application = PIXI.Application,
  Texture = PIXI.Texture,
  Sprite = PIXI.Sprite;

const app = new Application({ background: "#1099bb", resizeTo: window });

document.body.appendChild(app.view);

let isFlower = true;

const texture = Texture.from("https://pixijs.com/assets/flowerTop.png");
const texture2 = Texture.from("https://pixijs.com/assets/eggHead.png");

// create a new Sprite using the texture
const character = new Sprite(texture);

// center the sprites anchor point
character.anchor.set(0.5);

// move the sprite to the center of the screen
character.x = app.screen.width / 2;
character.y = app.screen.height / 2;

app.stage.addChild(character);

// make the sprite interactive
character.eventMode = "static";
character.cursor = "pointer";

character.on("pointertap", () => {
  isFlower = !isFlower;
  // Dynamically swap the texture
  character.texture = isFlower ? texture : texture2;
});

app.ticker.add(() => {
  character.rotation += 0.02;
  character.rotation %= Math.PI * 2;
});

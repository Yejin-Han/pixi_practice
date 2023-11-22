const Application = PIXI.Application,
  Container = PIXI.Container,
  Texture = PIXI.utils.TextureCache,
  Assets = PIXI.Assets,
  Sprite = PIXI.Sprite;

const app = new Application({ backgroundAlpha: 0, resizeTo: window });

document.body.appendChild(app.view);

// create a new Sprite from an image path
const bunny = Sprite.from("https://pixijs.com/assets/bunny.png");

// center the sprite's anchor point
bunny.anchor.set(0.5);

// move the sprite to the center of the screen
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

app.stage.addChild(bunny);

app.ticker.add(() => {
  // just for fun, let's rotate mr rabbit a little
  bunny.rotation += 0.1;
});

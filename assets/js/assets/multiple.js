const Application = PIXI.Application,
  Assets = PIXI.Assets,
  Sprite = PIXI.Sprite;

const app = new PIXI.Application({ background: "#1099bb", resizeTo: window });
document.body.appendChild(app.view);

// Add the assets to load
Assets.add("flowerTop", "https://pixijs.com/assets/flowerTop.png");
Assets.add("eggHead", "https://pixijs.com/assets/eggHead.png");

// Load the assets and get a resolved promise once both are loaded
const texturesPromise = Assets.load(["flowerTop", "eggHead"]); // => Promise<{flowerTop: Texture, eggHead: Texture}>

// When the promise resolves, we have the texture
texturesPromise.then((textures) => {
  // create a new Sprite from the resolved loaded Textures
  const flower = Sprite.from(textures.flowerTop);

  flower.anchor.set(0.5);
  flower.x = app.screen.width * 0.25;
  flower.y = app.screen.height / 2;
  app.stage.addChild(flower);

  const egg = Sprite.from(textures.eggHead);

  egg.anchor.set(0.5);
  egg.x = app.screen.width * 0.75;
  egg.y = app.screen.height / 2;
  app.stage.addChild(egg);
});

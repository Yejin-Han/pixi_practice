const Application = PIXI.Application,
  Assets = PIXI.Assets,
  Sprite = PIXI.Sprite;

const app = new PIXI.Application({ background: "#1099bb", resizeTo: window });
document.body.appendChild(app.view);

// Add the assets to load
Assets.add("flowerTop", "https://pixijs.com/assets/flowerTop.png");
Assets.add("eggHead", "https://pixijs.com/assets/eggHead.png");

// Allow the assets to load in the background
// Backgroundload는 실제로 load되기 전에 미리 기저에 load되어 로딩 시간을 줄이기 위함
Assets.backgroundLoad(["flowerTop", "eggHead"]);

//If the backgroundload hasn't loaded this asset yet, calling load forces this asset to load now
Assets.load("eggHead").then((texture) => {
  // auxiliar flag for toggling the texture
  let isEggHead = true;

  // create a new Sprite from the resolved loaded texture
  const character = new Sprite(texture);

  character.anchor.set(0.5);
  character.x = app.screen.width / 2;
  character.y = app.screen.height / 2;
  character.eventMode = "static";
  character.cursor = "pointer";

  app.stage.addChild(character);

  character.on("pointertap", async () => {
    isEggHead = !isEggHead;
    // These promise are already resolved in the cache
    character.texture = await Assets.load(isEggHead ? "eggHead" : "flowerTop");
  });
});

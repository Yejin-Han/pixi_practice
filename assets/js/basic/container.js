const Application = PIXI.Application,
  Container = PIXI.Container,
  Texture = PIXI.utils.TextureCache,
  Assets = PIXI.Assets,
  Sprite = PIXI.Sprite;

const app = new Application({
  background: "#1099bb",
  resizeTo: window,
});

document.body.appendChild(app.view);

const container = new Container();
app.stage.addChild(container);

async function loadAssets() {
  await Assets.load("https://pixijs.com/assets/bunny.png");
  const texture = Texture["https://pixijs.com/assets/bunny.png"];

  // Create a 5x5 grid of bunnies
  for (let i = 0; i < 25; i++) {
    const bunny = new Sprite(texture);

    bunny.anchor.set(0.5);
    bunny.x = (i % 5) * 40;
    bunny.y = Math.floor(i / 5) * 40;
    container.addChild(bunny);
  }
}

loadAssets();

// Move container to the center
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

// Center bunny sprite in local container coordinates
container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;

// Listen for animate update
app.ticker.add((delta) => {
  // rotate the container
  // use delta to create frame-independent transform
  container.rotation -= 0.01 * delta;
});

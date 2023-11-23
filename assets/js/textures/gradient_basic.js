const Application = PIXI.Application,
  Texture = PIXI.Texture,
  Sprite = PIXI.Sprite;

const app = new Application({ antialias: true, resizeTo: window });

document.body.appendChild(app.view);

function createGradTexture() {
  // adjust it if somehow you need better quality for very big images
  const quality = 256;
  const canvas = document.createElement("canvas");

  canvas.width = quality;
  canvas.height = 1; // linear gradient를 생성하기 위한 최적의 방법

  const ctx = canvas.getContext("2d");

  // use canvas2d API to create gradient
  const grd = ctx.createLinearGradient(0, 0, quality, 0);
  grd.addColorStop(0, "rgba(255, 255, 255, 0)");
  grd.addColorStop(0.3, "cyan");
  grd.addColorStop(0.7, "red");
  grd.addColorStop(1, "green");

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, quality, 1);

  return Texture.from(canvas);
}

const gradTexture = createGradTexture();

const sprite = new Sprite(gradTexture);

sprite.position.set(100, 100);
sprite.rotation = Math.PI / 8;
sprite.width = 500;
sprite.height = 50;
app.stage.addChild(sprite);

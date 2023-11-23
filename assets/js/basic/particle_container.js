const Application = PIXI.Application,
  Assets = PIXI.Assets,
  ParticleContainer = PIXI.ParticleContainer,
  Rectangle = PIXI.Rectangle,
  Texture = PIXI.Texture,
  Sprite = PIXI.Sprite;

const app = new Application({ resizeTo: window });

document.body.appendChild(app.view);

const sprites = new ParticleContainer(10000, {
  scale: true,
  position: true,
  rotation: true,
  uvs: true, // 한 spritesheet에서 여러개의 particles를 가져와서 하나의 sprite로 사용한다면 true, 각각 독립적인 sprite로 사용한다면 false 로 두라고 하는데 사실 잘 모르겠따.
  alpha: true,
});

app.stage.addChild(sprites);

// create an array to store all the sprites
const bubbles = [];

// app.renderer가 PIXI.Renderer의 인스턴스인지 아닌지 파악하여 처리량을 다르게 설정
// 참고로 PIXI.Renderer -> WebGL Renderer, 아니라면 자동으로 PIXI.CanvasRenderer로 대체됨
const totSprites = app.renderer instanceof PIXI.Renderer ? 300 : 100;

for (let i = 0; i < totSprites; i++) {
  // create a new Sprite
  const bubble = Sprite.from(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/bubble256.png"
  );

  bubble.anchor.set(0.5);
  bubble.oriScale = 0.05 + Math.random() * 0.3;
  bubble.scale.set(bubble.oriScale);
  bubble.x = Math.random() * app.screen.width;
  bubble.y = Math.random() * app.screen.height;

  bubble.tint = generateBrightColor();

  // create a random direction in radians
  bubble.direction = Math.random() * Math.PI * 2;

  // modify the direction of the sprite over time
  bubble.turningSpeed = Math.random() - 0.8;

  // create a random speed between (0 - 2) * 0.2, and theses bubbles are slow
  bubble.speed = (2 + Math.random() * 2) * 0.2;
  bubble.offset = Math.random() * 100;

  bubbles.push(bubble);
  sprites.addChild(bubble);
}

// create a bounding box for the bubbles
const boundsPadding = 100;
const boundsBox = new Rectangle(
  -boundsPadding,
  -boundsPadding,
  app.screen.width + boundsPadding * 2,
  app.screen.height + boundsPadding * 2
);

let tick = 0;
let movingSpeed = 0;

app.ticker.add(() => {
  // iterate through the sprites and update their position
  for (let i = 0; i < bubbles.length; i++) {
    const bubble = bubbles[i];

    bubble.scale.x = bubble.scale.y =
      bubble.oriScale * (1 - Math.sin(tick + bubble.offset) * 0.05);
    bubble.direction += bubble.turningSpeed * 0.01;
    bubble.x += Math.sin(bubble.direction) * (bubble.speed * bubble.scale.y);
    bubble.y += Math.cos(bubble.direction) * (bubble.speed * bubble.scale.y);

    // wrap the bubbles
    if (bubble.x < boundsBox.x) {
      bubble.x += boundsBox.width;
    } else if (bubble.x > boundsBox.x + boundsBox.width) {
      bubble.x -= boundsBox.width;
    }
    if (bubble.y < boundsBox.y) {
      bubble.y += boundsBox.height;
    } else if (bubble.y > boundsBox.y + boundsBox.height) {
      bubble.y -= boundsBox.height;
    }
  }

  tick += 0.05;
  tick %= Math.PI * 2;
  movingSpeed += 0.1;
  movingSpeed %= Math.PI * 2;
});

function generateBrightColor() {
  // 각 채널에 대해 100~255 범위의 값을 랜덤하게 생성
  const red = Math.floor(Math.random() * 155 + 100);
  const green = Math.floor(Math.random() * 155 + 100);
  const blue = Math.floor(Math.random() * 155 + 100);

  // RGB 값을 하나의 16진수 색상 값으로 결합
  return (red << 16) + (green << 8) + blue;
}

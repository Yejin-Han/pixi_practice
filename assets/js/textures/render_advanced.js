const Application = PIXI.Application,
  Assets = PIXI.Assets,
  Texture = PIXI.Texture,
  RenderTexture = PIXI.RenderTexture,
  Sprite = PIXI.Sprite,
  Container = PIXI.Container;

const app = new Application({ resizeTo: window });

document.body.appendChild(app.view);

const stageSize = {
  width: app.screen.width,
  height: app.screen.height,
};

// create 2 renderTextures
// these dynamic textures will be used to draw the scene into itself
let renderTexture = RenderTexture.create(stageSize);
let renderTexture2 = RenderTexture.create(stageSize);
const currTexture = renderTexture;

// create a new Sprite that uses the renderTexture we created above
const outputSprite = new Sprite(currTexture);

// align the Sprite
outputSprite.x = 400;
outputSprite.y = 300;
outputSprite.anchor.set(0.5);

// add to stage
app.stage.addChild(outputSprite);

const stuffContainer = new Container();

stuffContainer.x = 400;
stuffContainer.y = 300;

app.stage.addChild(stuffContainer);

// create an array of image ids (panda, rainbow, unicorn, smile, guitar, candy, watermelon, radio)
const objs = [
  "https://pixijs.com/assets/rt_object_01.png",
  "https://pixijs.com/assets/rt_object_02.png",
  "https://pixijs.com/assets/rt_object_03.png",
  "https://pixijs.com/assets/rt_object_04.png",
  "https://pixijs.com/assets/rt_object_05.png",
  "https://pixijs.com/assets/rt_object_06.png",
  "https://pixijs.com/assets/rt_object_07.png",
  "https://pixijs.com/assets/rt_object_08.png",
];

// create an array of items
const items = [];

// create some items and randomly position them in the stuff container
for (let i = 0; i < 20; i++) {
  const item = Sprite.from(objs[i % objs.length]);

  item.x = Math.random() * 400 - 200;
  item.y = Math.random() * 400 - 200;
  item.anchor.set(0.5);
  stuffContainer.addChild(item);
  items.push(item);
}

// used for spinning!
let cnt = 0;

app.ticker.add(() => {
  for (let i = 0; i < items.length; i++) {
    // rotate each item
    const item = items[i];
    item.rotation += 0.1;
    item.rotation %= Math.PI * 2;
  }
  cnt += 0.01;
  cnt %= Math.PI * 2;

  // swap the buffers (핑퐁 렌더링 / 더블 버퍼링)
  // 이전 프레임의 결과를 이용, 연속적인 애니메이션 효과나 흐름 -> 복잡한 시각적 효과 생성, 렌더링 품질 향상, 화면 깜빡임 방지
  // 여기서는 이전 프레임의 장면이 현재 프레임에도 부분적으로 남아있는 것처럼 보이게 하여 부드러운 효과를 줌
  const tmp = renderTexture;
  renderTexture = renderTexture2;
  renderTexture2 = tmp;

  // set the new texture
  outputSprite.texture = renderTexture;

  // twist this up!
  stuffContainer.rotation -= 0.01;
  outputSprite.scale.set(1 + Math.sin(cnt) * 0.2);

  // render the stage to the texture
  // the 'true' clears the texture before the content is rendered
  app.renderer.render(app.stage, {
    renderTexture: renderTexture2,
    clear: false, // 텍스트를 지우지 않고 렌더링
  });
});

const Application = PIXI.Application,
  Assets = PIXI.Assets,
  Texture = PIXI.Texture,
  RenderTexture = PIXI.RenderTexture,
  Sprite = PIXI.Sprite,
  Container = PIXI.Container;

const app = new Application({ background: "#1099bb", resizeTo: window });

document.body.appendChild(app.view);

const container = new Container();

app.stage.addChild(container);

const texture = Texture.from("https://pixijs.com/assets/bunny.png");

for (let i = 0; i < 25; i++) {
  const bunny = new Sprite(texture);

  bunny.x = (i % 5) * 30;
  bunny.y = Math.floor(i / 5) * 30;
  bunny.rotation = Math.random() * (Math.PI * 2);
  container.addChild(bunny);
}

const rt = RenderTexture.create({
  // 변하지 않는 복잡한 장면을 한 번 렌더링하고 여러 곳에서 재사용하여 성능 향상
  width: 300,
  height: 300,
  scaleMode: PIXI.SCALE_MODES.LINEAR,
  resolution: 1,
});

// container의 내용이 rt에 렌더링되지 않으면 sprite은 임시적 빈 상태
const sprite = new Sprite(rt);

// container에 추가되어 있던 원본 texture을 기준으로 움직임
sprite.x = 450;
sprite.y = 60;
app.stage.addChild(sprite);

/*
 * All the bunnies are added to the container with the addChild method
 * when you do this, all the bunnies become children of the container, and when a container moves,
 * so do all its children.
 * This gives you a lot of flexibility and makes it easier to position elements on the screen
 */
container.x = 100;
container.y = 60;

// ticker의 콜백 함수를 통해 container의 내용을 rt에 지속적으로 반복하여 렌더링
app.ticker.add(() => {
  app.renderer.render(container, { renderTexture: rt });
});

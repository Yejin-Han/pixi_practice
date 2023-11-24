const Application = PIXI.Application,
  Assets = PIXI.Assets,
  Rectangle = PIXI.Rectangle,
  Texture = PIXI.Texture,
  Sprite = PIXI.Sprite,
  SimplePlane = PIXI.SimplePlane;

const app = new Application({ background: "#1099bb", resizeTo: window });

document.body.appendChild(app.view);

Assets.load("https://pixijs.com/assets/bg_grass.jpg").then((texture) => {
  const plane = new SimplePlane(texture, 10, 10); // 10, 10 vertices로 plane을 잘게 쪼개서 생성

  plane.width = 800;
  plane.height = 550;
  plane.x = plane.y = 100;
  app.stage.addChild(plane);

  // Get the buffer for the vertice positions
  // geometry : 객체의 형태와 구조 정의 (ex. 꼭지점, 모서리, 면 등)
  // getBuffer : 기하학적 정보를 저장하는 구조
  // aVertexPosition : 가져오려는 버퍼의 이름(꼭지점 위치 데이터)
  const buffer = plane.geometry.getBuffer("aVertexPosition");

  // Listen for animate update
  let timer = 0;
  app.ticker.add(() => {
    // Randomize the vertice positions a bit to create movement
    for (let i = 0; i < buffer.data.length; i++) {
      buffer.data[i] += Math.sin(timer / 10 + i) * 0.5;
    }
    buffer.update();
    timer++;
  });
});

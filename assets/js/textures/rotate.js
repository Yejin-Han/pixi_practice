const Application = PIXI.Application,
  Assets = PIXI.Assets,
  Texture = PIXI.Texture,
  Sprite = PIXI.Sprite,
  Rectangle = PIXI.Rectangle,
  Text = PIXI.Text;

const app = new Application({ resizeTo: window });

document.body.appendChild(app.view);

Assets.load("https://pixijs.com/assets/flowerTop.png").then((texture) => {
  // created rotated textures
  const textures = [texture];
  const D8 = PIXI.groupD8; // 객체의 회전과 미러링을 위한 변환들을 제공

  for (let rotate = 1; rotate < 16; rotate++) {
    const h = D8.isVertical(rotate)
      ? texture.frame.width
      : texture.frame.height;
    const w = D8.isVertical(rotate)
      ? texture.frame.height
      : texture.frame.width;

    const { frame } = texture;
    const crop = new Rectangle(texture.frame.x, texture.frame.y, w, h);
    const trim = crop;
    let rotatedTexture;

    if (rotate % 2 === 0) {
      rotatedTexture = new Texture(
        texture.baseTexture,
        frame,
        crop,
        trim,
        rotate
      );
    } else {
      // HACK to avoid exception
      // PIXI doesn't like diamond-shaped UVs, because they are different in canvas and webGL.
      rotatedTexture = new Texture(
        texture.baseTexture,
        frame,
        crop,
        trim,
        rotate - 1
      );
      rotatedTexture.rotate++;
    }
    textures.push(rotatedTexture);
  }

  const offsetX = (app.screen.width / 16) | 0; // | 0 은 소수점 이하를 버리는 효과
  const offsetY = (app.screen.height / 8) | 0;
  const gridW = (app.screen.width / 4) | 0;
  const gridH = (app.screen.height / 5) | 0;

  // 4x4 grid layout
  // normal rotations and mirrors
  for (let i = 0; i < 16; i++) {
    // create a new Sprite using rotated texture
    const dude = new Sprite(textures[i < 8 ? i * 2 : (i - 8) * 2 + 1]); // 짝수 : 홀수

    dude.scale.x = 0.5;
    dude.scale.y = 0.5;
    // show it in grid
    dude.x = offsetX + gridW * (i % 4);
    dude.y = offsetY + gridH * ((i / 4) | 0);
    app.stage.addChild(dude);
    const text = new Text(`rotate = ${dude.texture.rotate}`, {
      fontFamily: "Courier New",
      fontSize: "12px",
      fill: "white",
      align: "left",
    });

    text.x = dude.x;
    text.y = dude.y - 20;
    app.stage.addChild(text);
  }
});

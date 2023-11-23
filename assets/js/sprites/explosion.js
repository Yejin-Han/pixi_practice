const Application = PIXI.Application,
  Assets = PIXI.Assets,
  Texture = PIXI.Texture,
  AnimatedSprite = PIXI.AnimatedSprite;

const app = new Application({ resizeTo: window });

document.body.appendChild(app.view);

Assets.load("https://pixijs.com/assets/spritesheet/mc.json").then(() => {
  // create an array to store the textures
  const explosionTextures = [];
  for (let i = 0; i < 26; i++) {
    const texture = Texture.from(`Explosion_Sequence_A ${i + 1}.png`);
    explosionTextures.push(texture);
  }
  for (let i = 0; i < 100; i++) {
    // create an explosion AnimatedSprite
    const explosion = new AnimatedSprite(explosionTextures);
    explosion.animationSpeed = 0.6;

    explosion.x = Math.random() * app.screen.width;
    explosion.y = Math.random() * app.screen.height;
    explosion.anchor.set(0.5);
    explosion.rotation = Math.random() * Math.PI;
    explosion.scale.set(0.75 + Math.random() * 0.5);
    explosion.gotoAndPlay((Math.random() * 26) | 0); // 시작할 frameNumber를 정해서 시작
    app.stage.addChild(explosion);
  }

  // start animating
  // 보통은 Application 인스턴스가 생성될 때 ticker가 자동으로 시작되므로 별도 호출할 필요 X
  // 이미 진행 중인 ticker에 AnimatedSprite와 같은 애니메이션 요소를 추가하면 자동으로 애니메이션 시작
  // -> 주로 ticker을 중지했다가 다시 시작할 때 필요
  app.start();
});

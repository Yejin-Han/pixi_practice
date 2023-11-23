const Application = PIXI.Application,
  Assets = PIXI.Assets,
  Texture = PIXI.Texture,
  AnimatedSprite = PIXI.AnimatedSprite;

const app = new Application({ background: "#1099bb", resizeTo: window });

document.body.appendChild(app.view);

Assets.load("https://pixijs.com/assets/spritesheet/fighter.json").then(() => {
  // create an array of textures from an image path
  const frames = [];

  for (let i = 0; i < 30; i++) {
    const val = i < 10 ? `0${i}` : i;

    // magically works since the spritesheet was loaded with the pixi laoder
    frames.push(Texture.from(`rollSequence00${val}.png`));
  }

  // create an AnimatedSprite
  const anim = new AnimatedSprite(frames);

  /**
   * An AnimatedSprite inherits all the properties of a PIXI Sprite
   * so you can change its position, its anchor, mask it, etc.
   */
  anim.x = app.screen.width / 2;
  anim.y = app.screen.height / 2;
  anim.anchor.set(0.5);
  anim.animationSpeed = 0.5;
  anim.play();

  app.stage.addChild(anim);

  // Animate the rotation
  app.ticker.add(() => {
    anim.rotation += 0.01;
    anim.rotation %= Math.PI * 2;
  });
});

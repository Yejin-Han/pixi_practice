const Application = PIXI.Application,
  Assets = PIXI.Assets,
  Text = PIXI.Text,
  TextStyle = PIXI.TextStyle;

const app = new Application({ background: "#1099bb", resizeTo: window });

document.body.appendChild(app.view);

// Load them google fonts before starting
window.WebFontConfig = {
  google: {
    families: ["Snippet"],
  },
  active() {
    init();
  },
};

/* eslint-disable */
// include the web-font loader script
(function () {
  const wf = document.createElement("script");
  wf.src = `${
    document.location.protocal === "https:" ? "https" : "http"
  }://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`;
  wf.type = "text/javascript";
  wf.async = "true";
  const s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(wf, s);
})();
/* eslint-enabled */

function init() {
  // create some white text using the Snippet webfont
  const textSample = new PIXI.Text(
    'PixiJS text using the\ncustom "Snippet" Webfont',
    {
      fontFamily: "Snippet",
      fontSize: 50,
      fill: "white",
      align: "left",
    }
  );
  textSample.position.set(50, 200);
  app.stage.addChild(textSample);
}

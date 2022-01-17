import * as alt from 'alt';
import * as game from 'natives';


let loaded = false;
let opened = false;
let currentMouseState = null;

let view = new alt.WebView("http://resource/html/index.html");

view.on('clientEvalExecute', (evalcode) => {
  eval(evalcode);
})
view.on('serverEvalExecute', (evalcode) => {
  alt.emitServer('serverEvalExecute', evalcode);
})

view.on('editorReady', () => {
  loaded = true;
});

view.on('editorOpened', (active) => {
    opened = active;
    alt.toggleGameControls(!active);
    if(currentMouseState !== active){
      alt.showCursor(active)
      currentMouseState = active;
    }
    if(active)
      view.focus();
})





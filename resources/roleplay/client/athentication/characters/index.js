import alt from 'alt-client';
import native from 'natives';
import * as chat from 'chat';
import {createPedEditCamera,destroyPedEditCamera} from './camera'
let charview= new alt.WebView('http://resource/client/athentication/characters/html/index.html',true);
/****start the web view**** */
alt.on('islogin',()=>{
    charview.emit('showpage');
    alt.emitServer('sessionUsername',alt.getMeta('sessionUsername'));  
    alt.showCursor(true);
    charview.focus();
})
/*****showing char after creation**** */


alt.onServer('sessionData',(args)=>{
        charview.emit('CharacterInfo',args)
});


/*****send new char data***** */
charview.on('NewCharacter',(CharName,CharSurname,date,MomName,FatherName,sex) => {
    alt.emitServer('NewCharacter',alt.getMeta('sessionUsername'),CharName,CharSurname,date,MomName,FatherName,sex)});
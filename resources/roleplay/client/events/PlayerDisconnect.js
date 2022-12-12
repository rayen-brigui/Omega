import alt from 'alt-client';
import native from 'natives';
import * as chat from 'chat';
import * as notify from '../system/notification/notification';

alt.on('disconnect',()=>{
    
    alt.emitServer('Desconnecting','rahi tneket');
})
import * as alt from 'alt-server';
import * as chat from 'chat';
import './Auth';


alt.on('playerConnect', showAuthWindow);

function showAuthWindow(player) {
    alt.emitClient(player, 'auth:Open');
    alt.log(`[CONNECTION]${player.name} has connected!`);
};
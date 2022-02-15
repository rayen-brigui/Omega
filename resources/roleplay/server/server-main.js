import * as alt from 'alt-server';
import './authentication/Auth';
import './authentication/characters/characters'
import './authentication/character_creator/creator'

// alt:V Files to Load
// Commands
import './commands/respawn';
import './commands/utility';
import './commands/vehicle';
import './commands/weapon';
// Configuration Files
import './configuration/config';
//Database
import './Database/Database'
//Playere HUD
import './PlayerHud/player'

// Events
import './events/playerConnect';
import './events/playerDeath';
import './events/playerDisconnect';
// Prototypes
import './prototypes/player';
// Systems
import './systems/notification'
// Utility
import './utility/array';
import './utility/vector';




/*

alt.on('playerConnect', showAuthWindow);

function showAuthWindow(player) {
    alt.emitClient(player, 'auth:Open');
    alt.log(`[CONNECTION]${player.name} has connected!`);
};


*/

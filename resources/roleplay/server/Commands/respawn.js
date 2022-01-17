import * as chat from 'chat';
import { DEFAULT_CONFIG } from '../configuration/config';
import { randomPositionAround } from '../utility/vector';

chat.registerCmd('respawn', handleRespawn);
chat.registerCmd('spawn', (player, modelName) => {
    if (!modelName) {
        modelName = 'mp_m_freemode_01';
    }

    player.spawn(player.pos.x, player.pos.y, player.pos.z, 0);

    try {
        player.model = modelName;
    } catch (err) {
        player.send(player, 'Invalid Model. Using default.');
        player.model = 'mp_m_freemode_01';
    }
});

function handleRespawn(player) {
    const currentposition = player.pos;
    const randomPosition = randomPositionAround(DEFAULT_CONFIG.SPAWN, DEFAULT_CONFIG.SPAWN_RANGE);
    //player.spawn(randomPosition.x, randomPosition.y, randomPosition.z, 0);
    
    //spawn player in his currrent position
    //player.spawn(currentposition.x, currentposition.y, currentposition.z, 0);
    player.spawn(player.pos.x, player.pos.y,player.pos.z);
    player.clearBloodDamage();
    
    player.giveWeapon(0x5a96ba4, 9999, true);
    const id = player.id;
    console.log(player.id);
    console.log(player.ip);
    console.log(player.hwidHash);
    player.setWeather(0);
    const social = player.socialId;
    console.log(social);
    player.send(`You were respawned.`);

};


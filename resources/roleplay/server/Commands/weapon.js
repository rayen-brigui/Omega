import { registerCmd } from 'chat';
import * as chat from 'chat';
import { HASH_BY_NAME } from '../gamedata/weapons';

chat.registerCmd('weapon', summonWeapon);
chat.registerCmd('wep', summonWeapon);
chat.registerCmd('addwep',summonWeapon);

function summonWeapon(player, args) {
    if (!args || !args[0]) {
        player.send(`/weapon <name>`);
        return;
    }

    const weaponName = args[0];
    if (!Object.keys(HASH_BY_NAME).includes(weaponName)) {
        player.send(`{FF0000}${args[0]} is not a valid weapon.`);
        return;
    }

    player.giveWeapon(HASH_BY_NAME[weaponName], 999, true);
}

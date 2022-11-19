import alt from 'alt-server';
import chalk from 'chalk';
import * as sm from 'simplymongo';
import { findselectedchar } from '../Database/Database';

alt.log(chalk.greenBright('Loaded: events/playerDisconnect'));
alt.on('playerDisconnect', playerDisconnect);

async function playerDisconnect(player) {
    if (!player || !player.valid) {
        return;
    }
    const db = sm.getDatabase();
   
    const user=player.getMeta('SessionUsername');
    const data=await findselectedchar(user);
     const res= await db.updatePartialData(data[0]._id, { lastlocation:player.pos }, 'characters');
    
    
    alt.log(`${player.name} has disconnected from the server.`);
    alt.log(player.pos);
    
}

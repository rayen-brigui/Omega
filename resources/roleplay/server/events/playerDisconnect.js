import alt from 'alt-server';
import chalk from 'chalk';
import * as sm from 'simplymongo';
import { findselectedchar ,findselectedcharById} from '../Database/Database';

alt.log(chalk.greenBright('Loaded: events/playerDisconnect'));
alt.on('playerDisconnect', playerDisconnect);
alt.onClient('Desconnecting',(player,arg)=>{
  alt.log(arg);
  /* 
    const db = sm.getDatabase();
    const x=player.pos.x;
    const y=player.pos.y;
    const z=player.pos.z;
    await findselectedcharById(arg).then(async(res)=>{
        alt.log(res);
        await db.updatePartialData(res._id, { lastlocation:{x,y,z} }, 'characters');
    });
    */
    
})
async function playerDisconnect(player) {
    if (!player || !player.valid) {
        return;
    }
   
}

import alt from 'alt-server';
import { ER_NATIVE_FCT_NAME_COLLISION } from '../../../../node_modules/mysql/lib/protocol/constants/errors';
import { registerCmd } from 'chat';
import { getForwardVectorServer } from '../utility/vector';


import * as chat from 'chat';

chat.registerCmd('veh', handleAddVehicle);

chat.registerCmd('fix', player =>{

if (player.vehicle.valid) {
   const cvehicle=player.vehicle;                   //fix a vehicle
   cvehicle.repair();
}
});




function handleAddVehicle(player, args) {
    if (!args || !args[0]) {
        player.send(`/veh <name>`);
        return;
    }
    const fwd = getForwardVectorServer(player.rot);
    const vehicleName = args[0];
    try { 
        if(player.vehicle) {
            player.vehicle.destroy();
        }
        
        const cvehicle = new alt.Vehicle(
            vehicleName,
            player.pos.x + fwd.x * 3,
            player.pos.y + fwd.y * 3,
            player.pos.z+1,
            0,
            0,
            0
        );
        cvehicle.engineOn = true;
          cvehicle.numberPlateText="RB"
          
            player.setIntoVehicle( cvehicle,1);  
        
        
        player.send(`{00FF00}${vehicleName} was successfully spawned.`);
    } catch (err) {
        console.log(err);
        player.send(`{FF0000}${vehicleName} is not a valid vehicle name.`);
    }


}




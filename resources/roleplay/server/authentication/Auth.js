import alt from 'alt-server';
import { log } from 'console';
import crypto from 'crypto';
import * as sm from 'simplymongo';
import * as notify from '../systems/notification';
import "../Database/Database.js";

let spawn_point = {
    x: -1827.8505859375,
    y: -1251.5472412109375,
    z: 13.188232421875
};
let player=alt.player;
let player_data ={
    id:0,
    username:'',
    password:'',
    money:1000,
    bank:10000,
    
    };
    
    //@playerConnect
alt.on("playerConnect", (player) => {
    player.spawn(spawn_point.x, spawn_point.y, spawn_point.z, 100);
    player.model = 'mp_m_freemode_01';
    alt.emitClient(player, "client:auth:load");
    notify.bannerNotification(player,'<center><strong>Welcome To Omega RolePlay</strong></center>','https://cdn.discordapp.com/attachments/897918725636886528/933032286708957194/serverbanner.png');

});


//@register
   alt.onClient("server:auth:register:data", (player,account_name,account_email, account_password) =>{

    const hash = crypto.createHash("sha256");
    hash.update(account_password);
    account_password = hash.digest("hex");
    sign_up_check(player,account_name,account_email, account_password);
       console.log(player);console.log(player.money);
    });
async function sign_up_check(player1,arg1,arg2,arg3){
    const db = sm.getDatabase();
    const matches = await db.fetchAllByField('email',arg2, 'accounts');

    // Check if it exists. Create it if it doe snot.
    if (matches.length <= 0) {
        // Account does not exist. Create it.
        player_data = await db.insertData({ 
            id:0,
            email:arg2,
            username:arg1,
            password:arg3,
            money:1000,
            bank:10000,}, 'accounts', true);
            notify.littleNotification(player1,'Account has been created successfully','success');
    } else {
      const player=player1;
        // Account exists. Assign to player object.
       // ***************need ++****************
       notify.littleNotification(player,'<center><strong>Email already exists</strong></center>','warning');
    }
}


//@login
alt.onClient("server:auth:validate:data", (player, account_name, account_password) => {
	const hash = crypto.createHash("sha256");
    hash.update(account_password);
    account_password = hash.digest("hex");
    login_check(player,account_name,account_password);
});



async function login_check(player,arg1,arg2){

    const db = sm.getDatabase();
    const namematches = await db.fetchAllByField('username', arg1, 'accounts');
    const passmatches = await db.fetchAllByField('password', arg2, 'accounts');
    
    if (namematches.length > 0) {
        if (passmatches.length >0){
            alt.emitClient(player, "client:auth:success");
        }else{
            notify.littleNotification(player,'<center>Check your password</center>','warning');
        }
    } else {
        notify.littleNotification(player,'<center>Account Not found,try to register</center>','warning');
    }

}


/*async function UsernamePassed(player) {
    const db = sm.getDatabase();
    player.data = await db.insertData({ username: player_data.username, password:player_data.password }, 'accounts', true);
};*/

        


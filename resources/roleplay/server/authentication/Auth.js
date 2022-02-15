import alt from 'alt-server';
import crypto from 'crypto';
import * as sm from 'simplymongo';
import * as notify from '../systems/notification';
import "../Database/Database.js";
let spawn_point = {
    x: -1832.756103515625,
    y: -1191.112060546875,
    z: 29.970703125
};
let player=alt.player;
export let player_data ={};
    
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
    });
async function sign_up_check(player1,arg1,arg2,arg3){
    const db = sm.getDatabase();
    const matches = await db.fetchAllByField('email',arg2, 'accounts');
    const usercheck = await db.fetchAllByField('username',arg1, 'accounts');
    if (usercheck.length>0) {
        notify.littleNotification(player1,'Username is already Taken','danger');
    }else {
         // Check if it exists. Create it if it doe snot.
    if (matches.length <= 0) {
        // Account does not exist. Create it.
        player_data = await db.insertData({ 
            socialid:player1.socialID,
            email:arg2,
            username:arg1,
            password:arg3,
            hwid:player1.hwidHash,
            whitelist:{
                status:false,
                Done:false, 
            },
            lastIp:player1.ip,   
            lastTimeLogin:new Date()    
        }, 'accounts', true);
            notify.littleNotification(player1,'Account has been created successfully','success');
    } else {
      const player=player1;
        // Account exists. Assign to player object.
       // ***************need ++****************
       notify.littleNotification(player,'<center><strong>Email already exists</strong></center>','warning');
    }
}};


//@login
alt.onClient("server:auth:validate:data", (player, account_name, account_password) => {
	const hash = crypto.createHash("sha256");
    hash.update(account_password);
    account_password = hash.digest("hex");
   if (login_check(player,account_name,account_password)){
       alt.emit('islogin',account_name);
   }
});



async function login_check(player,arg1,arg2){

    const db = sm.getDatabase();
    const namematches = await db.fetchAllByField('username', arg1, 'accounts');
    const passmatches = await db.fetchAllByField('password', arg2, 'accounts');
    
    if (namematches.length > 0) {
        if (passmatches.length >0){
            await db.updatePartialData(namematches[0]._id,{lastTimeLogin:new Date(Date.now())},'accounts');
            alt.emitClient(player, "client:auth:success");
            return true;
        }else{
            notify.littleNotification(player,'<center>Check your password</center>','warning');
            return false;
        }
    } else {
        notify.littleNotification(player,'<center>Account Not found,try to register</center>','warning');
        return false;
    }
    };
   



        


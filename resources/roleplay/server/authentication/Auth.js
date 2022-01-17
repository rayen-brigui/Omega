
/*         ******************** to check******************                       */
import alt from 'alt-server';
import { log } from 'console';
import crypto from 'crypto';
import * as sm from 'simplymongo';
 import "../Database/Database.js";

let spawn_point = {
    x:-1850.127,
    y:-1231.751,
    z:13.017
};


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
});


//@register
   alt.onClient("server:auth:register:data", (player,account_name, account_password) =>{

    const hash = crypto.createHash("sha256");
    hash.update(account_password);
    account_password = hash.digest("hex");
    sign_up_check(player,account_name,account_password);
       console.log(player);console.log(player.money);
    });
async function sign_up_check(player1,arg1,arg2){
    const db = sm.getDatabase();
    const matches = await db.fetchAllByField('username',arg1, 'accounts');

    // Check if it exists. Create it if it doe snot.
    if (matches.length <= 0) {
        // Account does not exist. Create it.
        player_data = await db.insertData({ 
            id:0,
            username:arg1,
            password:arg2,
            money:1000,
            bank:10000,}, 'accounts', true);

    } else {
      const player=player1;
        // Account exists. Assign to player object.
       // ***************need ++****************
        alt.emitClient(player,"client:notification:show", "Username already taken!", true, 162);
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
        alt.emitClient(player, "client:notification:show", `Welcome ${arg1}!`, false, 121);
        }else{
            //****DO SOMETHING*****
        }
    } else {
        alt.emitClient(player, "client:notification:show", "The given dates are not correct!", true, 162);
    }
;
}


/*async function UsernamePassed(player) {
    const db = sm.getDatabase();
    player.data = await db.insertData({ username: player_data.username, password:player_data.password }, 'accounts', true);
};*/

        


    /*
//@register
alt.onClient("server:auth:register:data", (player, account_name, account_password) => {
	const hash = crypto.createHash("sha256");
    hash.update(account_password);
    account_password = hash.digest("hex");
    const matches = await db.fetchAllByField(account_name, player_data.username, 'accounts');
    if (matches.length > 0) {
        alt.emitClient(player, "client:notification:show", "Username already taken!", true, 162);
    } else {
       player_data= await db.insertData({id:0,username: account_name,password:account_password, bank:player_data.bank,money:player_data.money}, 'accounts', true);
       matches = await db.fetchAllByField(account_name, player_data.username, 'accounts');
       if (matches.length>0){
           alt.emitClient(player, "client:auth:success");
   alt.emitClient(player, "client:notification:show", `Registered!`, false, 121);
       }else {
                  alt.emitClient(player, "client:notification:show", "The given dates are not correct!", true, 162);

       }
    }

    //@account counter
const accounts = await db.fetchAllData('accounts');

    for (let i = 0; i < accounts.length; i++) {
        var account = accounts[i];
        console.log(account);
    }
});






//@login
alt.onClient("server:auth:validate:data", (player, account_name, account_password) => {
	const hash = crypto.createHash("sha256");
    hash.update(account_password);
    account_password = hash.digest("hex");
    const matches = await db.fetchAllByField(account_name, player_data.username, 'accounts');
    
        if (matches.length > 0) {
            alt.emitClient(player, "client:auth:success");
            alt.emitClient(player, "client:notification:show", `Welcome ${account_name}!`, false, 121);
        } else {
            alt.emitClient(player, "client:notification:show", "The given dates are not correct!", true, 162);
        }
    ;
});





*/

//console.log("[SERVER]".green + " Loaded: " + "authentication".green);
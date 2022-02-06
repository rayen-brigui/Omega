import * as alt from 'alt';
import * as chat from 'chat';
//import * as extended from 'altV-Extended'
//import * as mongo from 'Mongo-V'
import * as sm from 'simplymongo';
import '../../Database/Database';



function randomHex(len) {
    var maxlen = 8,
        min = Math.pow(16,Math.min(len,maxlen)-1),
        max = Math.pow(16,Math.min(len,maxlen)) - 1,
        n   = Math.floor( Math.random() * (max-min+1) ) + min,
        r   = n.toString(16);
    while ( r.length < len ) {
       r = r + randomHex( len - maxlen );
    }
    return r;
  };

  function generate(n) {
    var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   

    if ( n > max ) {
            return generate(max) + generate(n - max);
    }

    max        = Math.pow(10, n+add);
    var min    = max/10; // Math.pow(10, n) basically
    var number = Math.floor( Math.random() * (max - min + 1) ) + min;

    return ("" + number).substring(add); 
}
async function getdata(sessionUsername){
    const db = sm.getDatabase();
  var data =await db.fetchAllByField('username', sessionUsername, 'characters');
    return (data);
};

alt.onClient('NewCharacter',(player,sessionUsername,CharName,CharSurname,date,MomName,FatherName,sex) => {
        let docs =getdata(sessionUsername);
        console.log(docs);
        if(docs[0].characters[i] == undefined) {
                console.log(sessionUsername,CharName,CharSurname,date,MomName,FatherName)
                let setdata = {
                        "name": CharName,
                        "surname": CharSurname,
                        "CharacterViewData": {
                            "fatherid": "0",
                            "motherid": "0",
                            "Resemblance": "0.0",
                            "Skintone": "0",
                            "SettedHairColletion": "mpbeach_overlays",
                            "SettedHairOverlay": "FM_Hair_Fuzz",
                            "SettedHairValue": "0",
                            "SettedHairColorOne": "0",
                            "SettedHairColorTwo": "0",
                            "brow": "0",
                            "browColorOne": "0",
                            "Eyes": "0",
                            "NoseWidth": "0.0",
                            "NoseHeight": "0.0",
                            "NoseLength": "0.0",
                            "NoseBoneHigh": "0.0",
                            "NosePeakLowering": "0.0",
                            "NoseBoneTwist": "0.0",
                            "CheekBones": "0.0",
                            "CheekBonesWidth": "0.0",
                            "CheeksWidth": "0.0",
                            "Lips": "0.0",
                            "JawBoneWidth": "0.0",
                            "JawBackLengh": "0.0",
                            "ChinProfile": "0.0",
                            "ChinShape": "0.0",
                            "ChimpBoneWidth": "0.0",
                            "ChimpHole": "0.0",
                            "MF": "0",
                            "EyeMakeUp": "0",
                            "Blusher": "0",
                            "BlusherColor": "0",
                            "LiphStick": "0",
                            "LiphStickColor": "0",
                            "arms": "0",
                            "pants": "0",
                            "shoes": "0",
                            "shirt": "0",
                            "torso": "0"
                        },
                        "sex": sex,
                        "bankid": `LS-${generate(16)}`,
                        "bankmoney": "5000",
                        "lastlocation": "",
                        "health": "200",
                        "armour": "0",
                        "food": "50",
                        "water": "50",
                        "isAdmin": false,
                        "isDead": false,
                        "birthdate": date,
                        "setCharacterModel": false,
                        "MomName": MomName,
                        "FatherName": FatherName,
                        "id":`${generate(8)}`
                        
            }
             docs[0].characters[i] = setdata
             insertData(docs,'characters');
            alt.emitClient(player,'newCharacter',docs[0])};
        });

        async function insertData(data,collectionName) {
            const db = sm.getDatabase();
            await db.insertData(data,collectionName, true);
        }
        
    // console.log(sessionUsername,CharName,CharSurname,date,MomName,FatherName)

let player= alt.Player.Local;
alt.onClient('islogin',(username)=>{
let datas=check_char_data(username);
alt.emit('updatehud',player);
alt.emitClient(null,'sessionData',datas[0]);
characterdata(datas[0]);
});

async function check_char_data(username){
    const db = sm.getDatabase();
const match=await db.fetchAllByField('username', username, 'characters');
return(match);

};

/*lt.onClient('sessionUsername',(player,username) => {

    mongo.getDocuments('username',username,'player',(data) => {
        let datas = JSON.parse(data) 
        
        characterdata(datas[0])
        alt.emit('updatehud',player)
    })
})*/
alt.onClient('metas',(player,character,i) => {
    player.setMeta('CharacterName',character.name)
    player.setMeta('CharacterSurname',character.surname)
    player.setMeta('CharacterBankID',character.bankid)
    player.setMeta('CharacterBankMoney',character.bankmoney)
    player.setMeta('CharacterID',character.id)
    alt.setMeta('selectedCharacter',i)
})
function characterdata(datas) {
    alt.emit('chardata',datas)
}
export default {
    characterdata
}
import * as alt from 'alt-server';
import * as sm from 'simplymongo';
import '../../Database/Database';


alt.onClient('sessionUsername',(player,username)=>{
 getcharData(player,username);


});  

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}


async function getcharData(player,username){
const db=sm.getDatabase();
let data=await db.fetchAllByField('username',username,'characters');
   //for(let i=0;i<=1;i++){
    //if (data[i]==undefined){
//console.log(`no character found at slot ${i+1}`);
       
//alt.emitClient(player,'sessionData',`no character found at slot ${i+1}`);
   //  }else {
      //  console.log(data[i]);
      alt.emitClient(player,'sessionData',data);
      return data;
     //}
   //}
    
      
   // }

   

}

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
/******generate a number with n length */
  function generate(n) {
    var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   

    if ( n > max ) {
            return generate(max) + generate(n - max);
    }

    max  = Math.pow(10, n+add);
    var min    = max/10; // Math.pow(10, n) basically
    var number = Math.floor( Math.random() * (max - min + 1) ) + min;

    return ("" + number).substring(add); 
}



//*******Set new charactere Data************ */

alt.onClient('NewCharacter',(player,sessionUsername,CharName,CharSurname,date,MomName,FatherName,sex) => {
        insertCharData(player,sessionUsername,CharName,CharSurname,date,MomName,FatherName,sex)
    });
   

  async function insertCharData(player,sessionUsername,CharName,CharSurname,date,MomName,FatherName,sex){
    console.log(sessionUsername,CharName,CharSurname,date,MomName,FatherName,sex);
    const db=sm.getDatabase();
   let charData= await db.insertData({
      username:sessionUsername, 
    name: CharName,
   surname: CharSurname,
   CharacterViewData: {
       fatherid: "0",
       motherid: "0",
       Resemblance : "0.0",
       Skintone: "0",
       SettedHairColletion: "mpbeach_overlays",
       SettedHairOverlay: "FM_Hair_Fuzz",
       SettedHairValue: "0",
       SettedHairColorOne: "0",
       SettedHairColorTwo: "0",
       brow: "0",
       browColorOne: "0",
       Eyes: "0",
       NoseWidth: "0.0",
       NoseHeight: "0.0",
       NoseLength: "0.0",
       NoseBoneHigh: "0.0",
       NosePeakLowering: "0.0",
       NoseBoneTwist: "0.0",
       CheekBones: "0.0",
       CheekBonesWidth: "0.0",
       CheeksWidth: "0.0",
       Lips: "0.0",
       JawBoneWidth: "0.0",
       JawBackLengh: "0.0",
       ChinProfile: "0.0",
       ChinShape: "0.0",
       ChimpBoneWidth: "0.0",
       ChimpHole: "0.0",
       MF: "0",
       EyeMakeUp: "0",
       Blusher: "0",
       BlusherColor: "0",
       LiphStick: "0",
       LiphStickColor: "0",
       arms: "0",
       pants: "0",
       shoes: "0",
       shirt: "0",
       torso: "0"
   },
   sex: sex,
   bankid: `LS-${generate(8)}`,
   bankmoney: 5000,
   cash:1000,
   lastlocation: "",
   health: "200",
   armour: "0",
   food: "50",
   water: "50",
   isAdmin: false,
   isDead: false,
   birthdate: date,
   setCharacterModel: false,
   MomName: MomName,
   FatherName: FatherName,
   id:`${generate(8)}`},'characters',true);
   getcharData(player,sessionUsername);
  }

        // console.log(docs)
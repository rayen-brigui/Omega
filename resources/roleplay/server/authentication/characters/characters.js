import * as alt from 'alt-server';
import { logError } from 'alt-shared';
import * as sm from 'simplymongo';
import '../../Database/Database';
import {findselectedchar,ifExist} from '../../Database/Database';
import '../../../shared/utility/enums';


alt.onClient('sessionUsername',async(player,username)=>{
 
let data=await getcharData(player,username);
 alt.emitClient(player,'sessionData',data);
 console.log(data);

});  




async function getcharData(player,username){
const db=sm.getDatabase();
let data=await db.fetchAllByField('username',username,'characters');
      return data;
}


/******generate a number with n length */
 async function  generate(n) {
    var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   

    if ( n > max ) {
            return generate(max) + generate(n - max);
    }

    max  = Math.pow(10, n+add);
    var min    = max/10; // Math.pow(10, n) basically
    var number = Math.floor( Math.random() * (max - min + 1) ) + min;
    let res=await  ifExist('id',number,'characters');
    if (res){
      generate(n)
    }else{
                return ("" + number).substring(add); 

    }
    
    
}



//*******Set new charactere Data************ */

alt.onClient('NewCharacter',(player,sessionUsername,CharName,CharSurname,date,MomName,FatherName,sex) => {
        insertCharData(player,sessionUsername,CharName,CharSurname,date,MomName,FatherName,sex)
    });
   

  async function insertCharData(player,sessionUsername,CharName,CharSurname,date,MomName,FatherName,sex){
    const db=sm.getDatabase();
   let charData= await db.insertData({
    id:`01${await generate(8)}`,
    username:sessionUsername, 
    name: CharName,
    surname: CharSurname,
    CharacterViewData: {
       fatherid: 0,
       motherid: 0,
       Resemblance : 0.0,
       Skintone: 0,
       SettedHairColletion: "mpbeach_overlays",
       SettedHairOverlay: "FM_Hair_Fuzz",
       SettedHairValue: 0,
       SettedHairColorOne: 0,
       SettedHairColorTwo: 0,
       brow: 0,
       browColorOne: 0,
       Eyes: 0,
       NoseWidth: 0.0,
       NoseHeight: 0.0,
       NoseLength: 0.0,
       NoseBoneHigh: 0.0,
       NosePeakLowering: 0.0,
       NoseBoneTwist: 0.0,
       CheekBones: 0.0,
       CheekBonesWidth: 0.0,
       CheeksWidth: 0.0,
       Lips: 0.0,
       JawBoneWidth: 0.0,
       JawBackLengh: 0.0,
       ChinProfile: 0.0,
       ChinShape: 0.0,
       ChimpBoneWidth: 0.0,
       ChimpHole: 0.0,
       MF: 0,
       EyeMakeUp: 0,
       Blusher: 0,
       BlusherColor: 0,
       LiphStick: 0,
       LiphStickColor: 0,
       arms: 0,
       pants: 0,
       shoes: 0,
       shirt: 0,
       torso: 0
   },
   sex: sex,
   bankid: `OB-${await generate(10)}`,
   bankmoney: 5000,
   lastlocation: "",
   health: 200,
   armour: 0,
   food: 1000,
   water:1000,
   dimention:0,
   isAdmin: false,
   isDead: false,
   birthdate: date,
   setCharacterModel: false,
   MomName: MomName,
   FatherName: FatherName,
   inventory: { maxWeight:150, money:0,toolbar:[],equipment:[],items:[]}},'characters',true);
   getcharData(player,sessionUsername);
  }

  alt.onClient('metas',(player,character,i) => {
    player.setMeta('SessionUsername',character.username)
    player.setMeta('CharacterName',character.name)
    player.setMeta('CharacterSurname',character.surname)
    player.setMeta('CharacterBankID',character.bankid)
    player.setMeta('CharacterBankMoney',character.bankmoney)
    player.setMeta('CharacterID',character.id)
    player.setMeta('foodlvl',character.food)
    player.setMeta('waterlvl',character.water)
    alt.emit('ShowHud',player);
    alt.setMeta('selectedCharacter',i)
})


alt.onClient('retrieveData',async(player,sessionUsername,i)=>{
 let datachar=await findselectedchar(sessionUsername);
  alt.emitClient(player,'selectedCharData',datachar);
  console.log('************Just to test*********');
  alt.emit('checkInv',player);
});




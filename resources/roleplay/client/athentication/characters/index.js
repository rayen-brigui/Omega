import alt from 'alt-client';
import native from 'natives';
import * as chat from 'chat';
let charview= new alt.WebView('http://resource/client/athentication/characters/html/index.html',true);
/****start the web view**** */
alt.on('islogin',()=>{
    charview.emit('showpage');
    alt.emitServer('sessionUsername',alt.getMeta('sessionUsername'));  
    alt.showCursor(true);
    charview.focus();
})
/*****showing char after creation**** */


alt.onServer('sessionData',(args)=>{
        charview.emit('CharacterInfo',args)
});

charview.on('showcharData',()=>{
    alt.setTimeout(() => {
        alt.emitServer('sessionUsername',alt.getMeta('sessionUsername'));  

    }, 500);
})
/*****send new char data***** */
charview.on('NewCharacter',async(CharName,CharSurname,date,MomName,FatherName,sex) => {
    
   alt.emitServer('NewCharacter',alt.getMeta('sessionUsername'),CharName,CharSurname,date,MomName,FatherName,sex)
});

/**************after finishing selecting character****************** */
   
    charview.on('CharacterLogin',(character,i) => {
        alt.showCursor(false)
        charview.unfocus()
        alt.setMeta('CharacterName',character.name)
        alt.setMeta('CharacterSurname',character.surname)
        alt.setMeta('CharacterSex',character.sex)
        alt.setMeta('CharacterBankID',character.bankid)                                 //setting the metas
        alt.setMeta('CharacterBankMoney',character.bankmoney)
        alt.setMeta('CharacterID',character.id)
        alt.setMeta('selectedCharacter',i)
        alt.emitServer('metas',character,i)
        if(character.setCharacterModel == true){
                alt.emitServer('retrieveData',alt.getMeta('sessionUsername'),i);

            acceptlogin();
            native.destroyAllCams(true);
            alt.emit('changecam');
        }else {
            alt.emit('PlayerData',character,i)
           // alt.emit('destroySpawn')
        }
            charview.destroy();
          })

        function acceptlogin(){
        
        alt.onServer('selectedCharData',(s_char)=>{
          let  char=s_char.CharacterViewData;
            native.setPedHeadBlendData( alt.Player.local.scriptID, char.fatherid,char.motherid, 0,char.Skintone, char.Skintone, 0,parseFloat(char.Resemblance),parseFloat(char.Resemblance), 0, false
            );//familyDATA
    
            const collections = native.getHashKey(char.SettedHairColletion);
            const overlays = native.getHashKey(char.SettedHairOverlays);
        native.setPedHairColor(alt.Player.local.scriptID,collections,overlays);
        native.setPedComponentVariation(alt.Player.local.scriptID, 2, char.SettedHairValue, 0, 0);
        native.setPedHairColor(alt.Player.local.scriptID, char.SettedHairColorOne, char.SettedHairColorTwo);
    
    
        native.setPedHeadOverlay(alt.Player.local.scriptID, 2, char.brow, 1);
        native.setPedHeadOverlayColor(alt.Player.local.scriptID, 2, 1, char.browColorOne,char.browColorOne);
    
    
        native.setPedEyeColor(alt.Player.local.scriptID, char.Eyes);
        native.setPedHeadOverlay(alt.Player.local.scriptID,4,char.EyeMakeUp,1.0);
    
    
    
        native.setPedFaceFeature(alt.Player.local.scriptID,1,parseFloat(char.NoseWidth));
        native.setPedFaceFeature(alt.Player.local.scriptID,2,parseFloat(char.NoseHeight));
        native.setPedFaceFeature(alt.Player.local.scriptID,3,parseFloat(char.NoseLength));
        native.setPedFaceFeature(alt.Player.local.scriptID,4,parseFloat(char.NoseBoneHigh));
        native.setPedFaceFeature(alt.Player.local.scriptID,5,parseFloat(char.NosePeakLowering));
        native.setPedFaceFeature(alt.Player.local.scriptID,6,parseFloat(char.NoseBoneTwist));
    
        native.setPedFaceFeature(alt.Player.local.scriptID,9,parseFloat(char.CheekBones));
        native.setPedFaceFeature(alt.Player.local.scriptID,10,parseFloat(char.CheekBonesWidth));
        native.setPedFaceFeature(alt.Player.local.scriptID,11,parseFloat(char.CheeksWidth));
    
        native.setPedFaceFeature(alt.Player.local.scriptID,13,parseFloat(char.Lips));
    
    
        native.setPedFaceFeature(alt.Player.local.scriptID,14,parseFloat(char.JawBoneWidth));
        native.setPedFaceFeature(alt.Player.local.scriptID,15,parseFloat(char.JawBackLengh));
    
        native.setPedFaceFeature(alt.Player.local.scriptID,16,parseFloat(char.ChinProfile));
        native.setPedFaceFeature(alt.Player.local.scriptID,17,parseFloat(char.ChinShape));
        native.setPedFaceFeature(alt.Player.local.scriptID,18,parseFloat(char.ChimpBoneWidth));
        native.setPedFaceFeature(alt.Player.local.scriptID,19,parseFloat(char.ChimpHole));
    
        native.setPedHeadOverlay(alt.Player.local.scriptID,9,char.MF,1.0);
    
        native.setPedHeadOverlay(alt.Player.local.scriptID,5,char.Blusher,0);
        native.setPedHeadOverlayColor(alt.Player.local.scriptID,5,2,char.BlusherColor,char.BlusherColor);
    
        native.setPedHeadOverlay(alt.Player.local.scriptID,8,char.LiphStick,0);
        native.setPedHeadOverlayColor(alt.Player.local.scriptID,8,2,char.LiphStickColor,char.LiphStickColor);
    
        native.setPedComponentVariation(alt.Player.local.scriptID, 3, char.arms, 0, 0); // arms
        native.setPedComponentVariation(alt.Player.local.scriptID, 4,char.pants, 0, 0); // pants
        native.setPedComponentVariation(alt.Player.local.scriptID, 6, char.shoes, 0, 0); // shoes
        native.setPedComponentVariation(alt.Player.local.scriptID, 8, char.shirt, 0, 0); // shirt
        native.setPedComponentVariation(alt.Player.local.scriptID, 11, char.torso, 0, 0); // torso

        alt.emit('AfterSelectHud');
       
        }) }
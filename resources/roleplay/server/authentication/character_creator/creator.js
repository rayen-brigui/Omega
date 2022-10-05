import * as alt from 'alt';
import * as chat from 'chat';
//import * as extended from 'altV-Extended'
import * as sm from 'simplymongo';
import "../../Database/Database";



alt.onClient("CreatorSpawn",(player,sex) => {
    if(sex == "male") {
        player.model = 'mp_m_freemode_01';

    }else {
        player.model = 'mp_f_freemode_01';
    }
    chat.setupPlayer(player);
    player.rot = {x:0,y:0,z:2.622116804122925}

    player.spawn(-606.5670166015625, -127.26593017578125, 38.001197265625)
    alt.setTimeout(() => {
        alt.emitClient(player,'StartView')

    }, 500);
})

alt.onClient('Finishedit',finishEdit);

    async function finishEdit(player,
        fatherid,
        motherid,
        Resemblance,
        Skintone,
        SettedHairColletion,
        SettedHairOverlay,
        SettedHairValue,
        SettedHairColorOne,
        SettedHairColorTwo,
        brow,
        browColorOne,
        Eyes,
        NoseWidth,
        NoseHeight,
        NoseLength,
        NoseBoneHigh,
        NosePeakLowering,
        NoseBoneTwist,
        CheekBones,
        CheekBonesWidth,
        CheeksWidth,
        Lips,
        JawBoneWidth,
        JawBackLengh,
        ChinProfile,
        ChinShape,
        ChimpBoneWidth,
        ChimpHole,
        MF,
        EyeMakeUp,
        Blusher,
        BlusherColor,
        LiphStick,
        LiphStickColor,
        arms,
        pants,
        shoes,
        shirt,
        torso,
        selectedCharacter,
        sessionUsername) {
            const db= sm.getDatabase();
            let match= await db.fetchAllByField('username', sessionUsername, 'characters');
            const id = match[selectedCharacter]._id;
            await db.updatePartialData(id, { CharacterViewData: {
       fatherid:Number(fatherid),
       motherid: Number(motherid),
       Resemblance : Number(Resemblance),
       Skintone:Number(Skintone),
       SettedHairColletion: SettedHairColletion,
       SettedHairOverlay: SettedHairOverlay,
       SettedHairValue: Number(SettedHairValue),
       SettedHairColorOne: Number(SettedHairColorOne),
       SettedHairColorTwo:Number(SettedHairColorTwo),
       brow: Number(brow),
       browColorOne:Number(browColorOne),
       Eyes: Number(Eyes),
       NoseWidth: Number(NoseWidth),
       NoseHeight:Number(NoseHeight),
       NoseLength:Number(NoseLength),
       NoseBoneHigh:Number(NoseBoneHigh),
       NosePeakLowering: Number(NosePeakLowering),
       NoseBoneTwist: Number(NoseBoneTwist),
       CheekBones:Number(CheekBones),
       CheekBonesWidth:Number(CheekBonesWidth),
       CheeksWidth:Number(CheeksWidth),
       Lips: Number(Lips),
       JawBoneWidth: Number(JawBoneWidth),
       JawBackLengh: Number(JawBackLengh),
       ChinProfile:Number(ChinProfile),
       ChinShape:Number(ChinShape),
       ChimpBoneWidth:Number(ChimpBoneWidth),
       ChimpHole: Number(ChimpHole),
       MF: MF,
       EyeMakeUp:Number(EyeMakeUp),
       Blusher: Number(Blusher),
       BlusherColor:Number(BlusherColor),
       LiphStick:Number(LiphStick),
       LiphStickColor:Number(LiphStickColor),
       arms:Number(arms),
       pants:Number(pants),
       shoes: Number(shoes),
       shirt:Number(shirt),
       torso:Number(torso)
   },setCharacterModel:true/*change it later*/
 }, 'characters');
   alt.emitClient(player,'Finishedit');
   
   
    }


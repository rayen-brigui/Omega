import * as alt from "alt-client";
import * as game from "natives";

console.log('this is loading');
// ********************** Island Snippet****************************
const islandCenter = new alt.Vector3(4840.571, -5174.425, 2.0);
let nearIsland = false;

alt.everyTick(() => {
    const distance = alt.Player.local.pos.distanceTo(islandCenter);

    if (nearIsland) {
        game.setRadarAsExteriorThisFrame();
        game.setRadarAsInteriorThisFrame(alt.hash("h4_fake_islandx"), 4700.0, -5145.0, 0, 0);

        if (distance >= 3000) {
            nearIsland = false;
            game.setIslandHopperEnabled('HeistIsland', false);
            game.setScenarioGroupEnabled("Heist_Island_Peds", false);
            game.setAudioFlag("PlayerOnDLCHeist4Island", false);
            game.setAmbientZoneListStatePersistent("AZL_DLC_Hei4_Island_Zones", false, false);
            game.setAmbientZoneListStatePersistent("AZL_DLC_Hei4_Island_Disabled_Zones", false, false);
        }
    } else if (distance < 2000 && !nearIsland) {
        nearIsland = true;
        game.setIslandHopperEnabled('HeistIsland', true);
        game.setScenarioGroupEnabled('Heist_Island_Peds', true);
        game.setAudioFlag("PlayerOnDLCHeist4Island", true);
        game.setAmbientZoneListStatePersistent("AZL_DLC_Hei4_Island_Zones", true, true);
        game.setAmbientZoneListStatePersistent("AZL_DLC_Hei4_Island_Disabled_Zones", false, true);
    }
});
// ********************** Island Snippet****************************
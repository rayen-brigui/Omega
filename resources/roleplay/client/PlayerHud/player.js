import * as alt from "alt";
import * as game from "natives";

var alwaysgui = new alt.WebView("http://resource/client/PlayerHud/html/index.html");

var mouseon = false;
var isfullviewon = false;

alt.onServer("maxAllStats", () => {
    //Set "all" stats to 100 for SP2 (Trevor) - trevor is SP2   
    game.statSetInt(game.getHashKey("SP2_SPECIAL_ABILITY_UNLOCKED") , 100, true);
    game.statSetInt(game.getHashKey("SP2_STAMINA") , 100, true);
    game.statSetInt(game.getHashKey("SP2_STEALTH_ABILITY") , 100, true);
    game.statSetInt(game.getHashKey("SP2_LUNG_CAPACITY") , 100, true);
    game.statSetInt(game.getHashKey("SP2_FLYING_ABILITY") , 100, true);
    game.statSetInt(game.getHashKey("SP2_SHOOTING_ABILITY") , 100, true);
    game.statSetInt(game.getHashKey("SP2_STRENGTH") , 100, true);
    game.statSetInt(game.getHashKey("SP2_WHEELIE_ABILITY") , 100, true);
    alt.log("yay, max stats achieved!");
});


alt.onServer("energy", (energy) => {
    alwaysgui.emit('energy', energy);
});

alt.onServer("hunger", (hunger) => {
    alwaysgui.emit('hunger', hunger);
});

alt.onServer("thirst", (thirst) => {
    alwaysgui.emit('thirst', thirst);
});

let zoneNamesShort = ["AIRP","ALAMO","ALTA","ARMYB","BANHAMC","BANNING","BEACH","BHAMCA","BRADP","BRADT","BURTON","CALAFB","CANNY","CCREAK","CHAMH","CHIL","CHU","CMSW","CYPRE","DAVIS","DELBE",
"DELPE","DELSOL","DESRT","DOWNT","DTVINE", "EAST_V","EBURO","ELGORL","ELYSIAN","GALFISH","GOLF","GRAPES","GREATC","HARMO","HAWICK","HORS","HUMLAB","JAIL","KOREAT","LACT","LAGO","LDAM","LEGSQU",
"LMESA","LOSPUER","MIRR","MORN","MOVIE","MTCHIL","MTGORDO", "MTJOSE","MURRI","NCHU","NOOSE","OCEANA","PALCOV","PALETO","PALFOR","PALHIGH","PALMPOW","PBLUFF","PBOX","PROCOB","RANCHO","RGLEN",
"RICHM","ROCKF","RTRAK","SANAND","SANCHIA","SANDY","SKID","SLAB","STAD","STRAW", "TATAMO","TERMINA","TEXTI","TONGVAH","TONGVAV","VCANA","VESP","VINE","WINDF","WVINE","ZANCUDO","ZP_ORT","ZQ_UAR"];
let zoneNames = ["Los Santos International Airport","Alamo Sea","Alta","Fort Zancudo","Banham Canyon Dr","Banning","Vespucci Beach","Banham Canyon","Braddock Pass","Braddock Tunnel","Burton",
"Calafia Bridge","Raton Canyon","Cassidy Creek","Chamberlain Hills","Vinewood Hills","Chumash","Chiliad Mountain State Wilderness","Cypress Flats","Davis","Del Perro Beach","Del Perro",
"La Puerta","Grand Senora Desert","Downtown","Downtown Vinewood","East Vinewood","El Burro Heights","El Gordo Lighthouse","Elysian Island","Galilee","GWC and Golfing Society","Grapeseed",
"Great Chaparral","Harmony","Hawick","Vinewood Racetrack","Humane Labs and Research","Bolingbroke Penitentiary","Little Seoul","Land Act Reservoir","Lago Zancudo","Land Act Dam","Legion Square",
"La Mesa","La Puerta","Mirror Park","Morningwood","Richards Majestic","Mount Chiliad","Mount Gordo","Mount Josiah","Murrieta Heights","North Chumash","N.O.O.S.E","Pacific Ocean","Paleto Cove",
"Paleto Bay","Paleto Forest","Palomino Highlands","Palmer-Taylor Power Station","Pacific Bluffs","Pillbox Hill","Procopio Beach","Rancho","Richman Glen","Richman","Rockford Hills","Redwood Lights Track",
"San Andreas","San Chianski Mountain Range","Sandy Shores","Mission Row","Stab City","Maze Bank Arena","Strawberry","Tataviam Mountains","Terminal","Textile City","Tongva Hills","Tongva Valley",
"Vespucci Canals","Vespucci","Vinewood","Ron Alternates Wind Farm","West Vinewood","Zancudo River","Port of South Los Santos","Davis Quartz"];
alt.setInterval(() => {
    let pos = alt.Player.local.pos;
    let [bol, _1, _2] = game.getStreetNameAtCoord(pos.x, pos.y, pos.z);
    let str1 = game.getStreetNameFromHashKey(_1);
    let str2 = game.getStreetNameFromHashKey(_2);

    let zoneName = game.getNameOfZone(pos.x, pos.y, pos.z);
    let realZoneName = zoneName;
    if(zoneNamesShort.includes(zoneName)) {
        let zoneID = zoneNamesShort.indexOf(zoneName);
        realZoneName = zoneNames[zoneID];
    }

    //alt.log(str1+', '+str2+', '+realZoneName);
    let realstr = '';
    if(str1 != '') { realstr += str1; }
    realstr += ', '+realZoneName;
    if(str2 != '') { realstr += ', '+str2; }

    //alwaysgui.emit('setAreaZoneNames', str1+', '+str2+', '+realZoneName);
    alwaysgui.emit('setAreaZoneNames', realstr);
}, 1500);


function getDegreeName(d) {
    if (typeof d !== 'number' || isNaN(d)) {
        return -1;
    }

    // keep within the range: 0 <= d < 360
    d = d % 360;

    if (11.25 <= d && d < 33.75) {
        return "NNE";
    } else if (33.75 <= d && d < 56.25) {
        return "NE";
    } else if (56.25 <= d && d < 78.75) {
        return "ENE";
    } else if (78.75 <= d && d < 101.25) {
        return "E";
    } else if (101.25 <= d && d < 123.75) {
        return "ESE";
    } else if (123.75 <= d && d < 146.25) {
        return "SE";
    } else if (146.25 <= d && d < 168.75) {
        return "SSE";
    } else if (168.75 <= d && d < 191.25) {
        return "S";
    } else if (191.25 <= d && d < 213.75) {
        return "SSW";
    } else if (213.75 <= d && d < 236.25) {
        return "SW";
    } else if (236.25 <= d && d < 258.75) {
        return "WSW";
    } else if (258.75 <= d && d < 281.25) {
        return "W";
    } else if (281.25 <= d && d < 303.75) {
        return "WNW";
    } else if (303.75 <= d && d < 326.25) {
        return "NW";
    } else if (326.25 <= d && d < 348.75) {
        return "NNW";
    } else {
        return "N";
    }
};

alt.setInterval(() => {
    let heading = game.getEntityHeading(alt.Player.local.scriptID);
    let h2n = getDegreeName(heading);
    alwaysgui.emit('setCompass', h2n);
}, 500);

/* hide radar if not in vehicle. */
alt.setInterval(() => {
    if(isfullviewon)
        return;
    
    const radarstatus = game.isMinimapRendering();
    if(alt.Player.local.vehicle == null) {
        if(radarstatus) {
            game.displayRadar(false);
            alwaysgui.emit('pushEnergyBar', 'down');
        }
    } else { 
        if(!radarstatus) {
            game.displayRadar(true);
            alwaysgui.emit('pushEnergyBar', 'up');
        }
    }
}, 1000);

alt.on('afterSelect',()=>{
    alwaysgui.emit('showhud');
})
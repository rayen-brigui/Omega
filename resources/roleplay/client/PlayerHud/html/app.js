/* this is the always gui. always open always on */



document.getElementById("body").style.display = "none"
alt.on('showhud',()=>{
    document.getElementById("body").style.display = "inline"
})

function toggleblinker(elem, toggle) {
    if(toggle) { //true ADD
        if(!document.getElementById(elem).classList.contains('blink_me')) {
            document.getElementById(elem).classList.add('blink_me');
        }
    }
    else { //false, REMOVE
        if(document.getElementById(elem).classList.contains('blink_me')) {
            document.getElementById(elem).classList.remove('blink_me');
        }
    }
}


function energy(val) {
    let element = document.getElementById("energy_bar"); //width: 25%;
    element.style.width = val+'%';

    if(val < 16) {
        toggleblinker("energy", true);
    } else {
        toggleblinker("energy", false);
    }
}

function hunger(val) {
    let element = document.getElementById("hunger_bar"); //width: 25%;
    element.style.width = val+'%';

    if(val < 21) {
        toggleblinker("hunger", true);
    } else {
        toggleblinker("hunger", false);
    }
}

function thirst(val) {
    let element = document.getElementById("thirst_bar"); //width: 25%;
    element.style.width = val+'%';

    if(val < 21) {
        toggleblinker("thirst", true);
    } else {
        toggleblinker("thirst", false);
    }
}



function setCompass(degrees) {
    document.getElementById('compass_actual').innerHTML = degrees;
}

function setAreaZoneNames(str) {
    document.getElementById('compass_1').innerHTML = str;
}

function pushEnergyBar(where) {
    if(where == 'up') {
        document.getElementById('energy').style.bottom = '19.4%';
    }
    else if(where == 'down') {
        document.getElementById('energy').style.bottom = '2.1%';
    }
}

if('alt' in window) {
    alt.on('energy', energy); //update stats.
    alt.on('hunger', hunger); //update stats.
    alt.on('thirst', thirst); //update stats.
    alt.on('setCompass', setCompass);
    alt.on('setAreaZoneNames', setAreaZoneNames);
    alt.on('pushEnergyBar', pushEnergyBar);
}


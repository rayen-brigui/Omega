import * as alt from 'alt-client';
import * as native from 'natives';



//import { SharedConfig } from '../../../shared/configs/settings';
//import { SystemEvent, ViewEvent } from '../../../shared/utility/enums';
//import { DroppedItem } from '../../../shared/interfaces/item';
//import { distance2d } from '../../../shared/utility/usefull';
//import { View } from '../extensions/view';
//import hud file**********
//import { waitForFalse } from '../../utility/wait';
//import { drawMarker } from '../../utility/marker';
//import { isAnyMenuOpen } from '../../utility/menus';
const MaxAttempts = 200;

export async function waitForFalse(func, ...args){
    return new Promise((resolve) => {
        let attempts = 0;
        const interval = alt.setInterval(() => {
            if (attempts >= MaxAttempts) {
                alt.clearInterval(interval);
                resolve(false);
                return;
            }
            if (func(...args)) {
                attempts += 1;
                return;
            }
            alt.clearInterval(interval);
            resolve(true);
        }, 100);
    });
}


const zeroVector = { x: 0, y: 0, z: 0 };

export function drawMarker(type, pos, scale, color) {
    native.drawMarker(
        type,
        pos.x,
        pos.y,
        pos.z,
        zeroVector.x,
        zeroVector.y,
        zeroVector.z,
        zeroVector.x,
        zeroVector.y,
        zeroVector.z,
        scale.x,
        scale.y,
        scale.z,
        color.r,
        color.g,
        color.b,
        color.a,
        false,
        true,
        2,
        false,
        undefined,
        undefined,
        false
    );
}

export function isAnyMenuOpen(){
    if (alt.isConsoleOpen()) return true;
    if (alt.Player.local.isActionMenuOpen) return true;
    if (alt.Player.local.meta.isUnconsciouse) return true;
    if (alt.Player.local.isMenuOpen) return true;
    return false;
}


export function distance2d(vector1,vector2) {
    if (vector1 === undefined || vector2 === undefined) throw new Error('AddVector => vector1 or vector2 is undefined');
    return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2));
}
const validKeys = ['inventory', 'equipment', 'toolbar'];
const url = `http://resource/client/system/inventory/html/index.html`;
view.unfocus();
let camera;
let lastDroppedItems = [];
let noPedPreview = false;

//export class InventoryManager {
    let isOpen = false;
    let drawInterval = null;
    let viewon = false;
    let view;

    let inv;

    function  handleView() {
        view = new alt.WebView(url);
        view.focus();
        console.log('inv showing...');
        view.emit('showInv');
       // if (isAnyMenuOpen()) return;
      // if (alt.Player.local.isPhoneOpen) return;
        noPedPreview = false;
        //view.on('inventory:Update', updateEverything);
        //view.on('inventory:Use', handleUse);
        //view.on('inventory:Process', handleProcess);
        //view.on('inventory:Close', handleClose);
        //view.on('inventory:Split', handleSplit);
        //view.on('inventory:Pickup', handlePickup);
       alt.showCursor(true);
        alt.toggleGameControls(false);
       isOpen=true;
       native.triggerScreenblurFadeIn(500);
       // HUD.setHudVisibility(false);
    }

    function handleProcess(selectedSlot, endSlot, hash) {
        alt.emitServer('inventory:process', selectedSlot, endSlot, hash);
    }

    function handlePickup(hash) {
        alt.emitServer('inventory:pickup', hash);
    }

    function  updateEverything() {
        if (!view) return;
        Object.keys(keyFunctions).forEach((key) => keyFunctions[key]());
        processClosestGroundItems();
        const didRenderCamera = showPreview();
        view.emit('inventory:DisablePreview', !didRenderCamera ? true : false);
    }

    function updateInventory() {
        if (!view) return;
        view.emit('inventory:Inventory', alt.Player.local.meta.inventory);
    }

    function  updateEquipment() {
        if (!view) return;
        view.emit('inventory:Equipment', alt.Player.local.meta.equipment);
    }

    function updateToolbar() {
        if (!view) return;
        view.emit('inventory:Toolbar', alt.Player.local.meta.toolbar);
    }

    function handleUse(selectedSlot, tab) {
        alt.emitServer('inventory:use', selectedSlot, tab);
    }

    function handleSplit(selectedSlot, tab, amount) {
        alt.emitServer('inventory:split', selectedSlot, tab, amount);
    }

    function handleClose() {
        native.triggerScreenblurFadeOut(500);
        native.clearFocus();
        alt.toggleGameControls(true);
        //native.renderScriptCams(false, false, 255, true, false, 0);
        //native.setCamActive(0, false);
        //native.destroyAllCams(true);
        //native.setEntityVisible(alt.Player.local.scriptID, true, false);
       // HUD.setHudVisibility(true);
        if (!view) return;
        
        isOpen=false;
        alt.showCursor(false);
            view.destroy();
    
    }

    function processMetaChange(key, value, oldValue) {
        if (!validKeys.includes(key)) return;
        if (!keyFunctions[key]) return;
        keyFunctions[key]();
    }

    function updateGroundItems(items) {
        lastDroppedItems = items;
        if (drawInterval) {
            alt.clearInterval(drawInterval);
            drawInterval = null;
        }
        if (lastDroppedItems.length >= 1) drawInterval = alt.setInterval(drawItemMarkers, 0);
        if (!view) return;
        if (!isOpen) return;
        alt.setTimeout(processClosestGroundItems, 0);
    }

    function processClosestGroundItems() {
        let itemsNearPlayer = lastDroppedItems.filter((item) => distance2d(item.position, alt.Player.local.pos) <= 2);
        if (alt.Player.local.vehicle) itemsNearPlayer = [];
        view.emit('inventory:Ground', itemsNearPlayer);
    }

    function drawItemMarkers() {
        for (let i = 0; i < lastDroppedItems.length; i++) {
            const groundItem = lastDroppedItems[i];
            const newPosition = { x: groundItem.position.x, y: groundItem.position.y, z: groundItem.position.z - 0.98 };
            drawMarker(28, newPosition , new alt.Vector3(0.25, 0.25, 0.25), new alt.RGBA(0, 181, 204, 200));
        }
    }

    function  showPreview() {
        if (alt.Player.local.vehicle) return false;
       // await waitForFalse(native.isPedWalking, alt.Player.local.scriptID);
        const fov = 80;
        const fwd = native.getEntityForwardVector(alt.Player.local.scriptID);
        const pos = { ...alt.Player.local.pos };
        const fwdPos = { x: pos.x + fwd.x * 1.75, y: pos.y + fwd.y * 1.75, z: pos.z + 0.2 };
        camera = native.createCamWithParams('DEFAULT_SCRIPTED_CAMERA', fwdPos.x, fwdPos.y, fwdPos.z, 0, 0, 0, fov, true, 0);
        native.pointCamAtEntity(camera, alt.Player.local.scriptID, 0, 0, 0, false);
        native.setCamActive(camera, true);
        native.renderScriptCams(true, false, 0, true, false, false);
        return true;
    }
//}
const keyFunctions = { inventory: updateInventory, toolbar: updateToolbar, equipment: updateEquipment };

alt.on('keydown', i => {
    if (i==115 && isOpen==false){ // Tab
        handleView();
        
    }else{if (i== 9 && isOpen==true){
        handleClose();
       
    }}
});
let pt;
alt.on('keydown', l => {
    if (l==115){ // Tab
      native.requestModel(2374966032);
          pt=native.getPedType(2374966032);
            
        let ped=native.createPed(pt,2374966032,-1699.2791748046875,
            -1068.1845703125,
             13.3062744140625,
             2,false,false);  
    
       
      //native.taskArrestPed(ped,alt.Player.local);
    
        //native.taskHeliMission(ped, alt.Player.local.vehicle, 0, 0, alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z+20, 4, 10, 5, 0, 20, 50, 400, 4096);        
    }
});


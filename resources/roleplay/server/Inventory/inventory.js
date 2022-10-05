import alt, { emitClient } from 'alt-server';
import { emit } from 'alt-shared';
import * as sm from 'simplymongo';
import '../Database/Database';
import {findselectedchar} from '../Database/Database';
import {list}  from './items';


let inv=list;

export async function getInventory(player){
     
    let userN=player.getMeta('SessionUsername');
    let data=await findselectedchar(userN);
    console.log('****************Inventory**************');
    console.log(data.inventory);
    console.log(userN);
    return (data.inventory);
}

alt.on('checkInv',(player)=>{              //just to test
  getInventory(player);
})

/********     ♣♣♣♣♣ Just to test   / remove later       ***** */

async function updateDb(player,inv){
    let sessionUsername=player.getMeta('SessionUsername');
    const db=sm.getDatabase();
    let match= await db.fetchAllByField('username', sessionUsername, 'characters');
    let SC= alt.getMeta('selectedCharacter');
            const id = match[SC]._id;
            await db.updatePartialData(id,{inventory:inv},'characters');
        console.log('******inv DB Updated********');
}

/*

function getFreeInventorySlot(inv){
    for (let x = 0; x < 50; x++) {
        const itemIndex = inv.items[x];
        if (itemIndex ==null){
           return  x ;
        }
    }
    return null;
}

function hasItem(player,item) {
    let hasInInventory = isInInventory(player, item);
    if (hasInInventory) return true;
    let hasInToolbar = isInToolbar(player, item);
    if (hasInToolbar) return true;
    return false;
}

function hasWeapon(player) {
    let inv = getInventory(player);
    for (let i = 0; i < parseInt(inv.items.length.toFixed(0)); i++) {
        const inventoryItem = inv.items[i];
        if(inventoryItem.type=weapons){
            return(inventoryItem);
        }
    }
    for (let i = 0; i < inv.toolbar.length; i++) {
        const item = inv.toolbar[i];
        if(item.type=weapons){
            return(item);
        }
    }
    return null;
}

function getInventoryItem(p,slot){
    let inv = getInventory(p);
    if (slot >= parseInt(inv.items.lenght.toFixed(0))) return null;
    if(inv.items[slot]!=null){
        return inv.items[slot];
    }
    return null;
}

function replaceInventoryItem(p,item){
    let inv = getInventory(p);
    const itemIndex = inv.items.findIndex((existingItem) => existingItem.id === item.id);
    if (itemIndex === -1) return false;
    inv.items[itemIndex] = item;
    return true;
}

function getEquipmentItem(p, slot){
    let inv = getInventory(p);
    if (slot >= 12) return null;
    const index = inv.equipment.findIndex((item) => item.slot === slot);
    if (index === -1) return null;
    return (inv.equipment[index]);
}

function getToolbarItem(p, slot) {
    let inv = getInventory(p);
    if (slot >= 5) return null;
    const index = inv.toolbar.findIndex((item) => item.slot === slot);
    if (index === -1) return null;
    return (inv.toolbar[index]);
}

function isInInventory(p, item) {
    let inv = getInventory(p);
    if (inv.items.length === 0) return null;
    if (!item) throw new Error(`[3L:RP] Specified item is null for isInInventory`);
    for (let i = 0; i < inv.items.length; i++) {
        const inventoryItem = inv.items[i];
        if (item.name=inventoryItem.name){
            return inv.items.indexOf(inventoryItem);
        }
        
    }
    return null;
}

function isInEquipment(p, item) {
    let inv = getInventory(p);
    if (inv.equipment.length === 0) return null;
    for (let i = 0; i < inv.equipment.length; i++) {
        const equipmentItem = inv.equipment[i];
        if (equipmentItem.name==item.name){
            return inv.equipment.indexOf(equipmentItem);
        }
    }
    return null;
}

function isEquipmentSlotFree(p, slot){
    let inv = getInventory(p);
    if (slot >= 12) return false;
    if (inv.equipment.length === 0) return true;
    return inv.equipment.findIndex((item) => item.slot === slot) === -1;
}

function isInventorySlotFree(p, slot){
    let inv = getInventory(p);
    if (slot >= parseInt(inv.items.toFixed(0))) return false;
    const index = inv.items.findIndex((item) => item.slot === slot);
    if (index === -1) return true;
    return false;
}

function inventoryAdd(p, item, slot){
    let inv = getInventory(p);
    let i =getFreeInventorySlot(inv)
    if (slot >= 50) return false;
    if (!inv) return false;
    inv.items.push(item);
    return true;
}

function inventoryRemove(p, slot){
     let inv = getInventory(p);
    if (slot >= parseInt(inv.items.toFixed(0))) return false;
    if (!inv.items) return false;
    const index = inv.items.findIndex((item) => item.slot === slot);
    if (index === -1) return false;
    inv.items.splice(index, 1);
    return true;
}

function equipmentRemove(p, slot){
     let inv = getInventory(p);
    if (slot >= 12) return false;
    inv.equipment.splice(slot, 1);
    return true;
}

function isEquipmentSlotValid(item, slot) {
    if (slot >= 12) return false;
    if (item.equipment === null || item.equipment === undefined) return false;
    if (item.equipment !== slot) return false;
    return true;
}

function equipmentAdd(p, item, slot){
     let inv = getInventory(p);
    if (!isEquipmentSlotFree(p, slot)) return false;
    if (item.equipment !== slot) return false;
    if (item.slot !== slot) item.slot = slot;
    inv.equipment.push(item);
    return true;
}

function isToolbarSlotFree(p, slot){
     let inv = getInventory(p);
    if (slot >= 5) return false;
    if (inv.toolbar.length >= 5) return false;
    return inv.toolbar.findIndex((item) => item.slot === slot) === -1 ? true : false;
}

function toolbarAdd(p, item, slot){
     let inv = getInventory(p);
    if (slot >= 5) return false;
    if (!isToolbarSlotFree(p, slot)) return false;
    if (item.slot !== slot) item.slot = slot;
    inv.toolbar.push(item);
    return true;
}

function toolbarRemove(p, slot){
     let inv = getInventory(p);
    if (slot >= 5) return false;
    inv.toolbar.splice(slot, 1);
    return true;
}

function replaceToolbarItem(p, item){
     let inv = getInventory(p);
    const itemIndex = inv.toolbar.findIndex((existingItem) => existingItem.slot === item.slot);
    if (itemIndex === -1) return false;
    inv.toolbar[itemIndex] = item;
    return true;
}

function isInToolbar(p, item) {
    if (inv.toolbar.length == 0) return null;
    if (!item) throw new Error(`[3L:RP] Specified item is null for isInToolbar`);
    for (let i = 0; i < inv.toolbar.length; i++) {
        const toolbarItem = inv.toolbar[i];
        if (!toolbarItem) continue;
        const objectKeys = Object.keys(item);
        const keyIndex = objectKeys.findIndex((key) => item[key] === toolbarItem[key]);
        if (keyIndex === -1) continue;
        return i;
    }
    return null;
}

function findAndRemove(player, itemName){
     let inv = getInventory(p);
    const toolbarItem = isInToolbar(player, itemName);
    if (toolbarItem) {
        const item = inv.toolbar[toolbarItem.index];
        if (!item) return false;
        const removedFromToolbar = toolbarRemove(player, item.slot);
        if (!removedFromToolbar) return false;
        save.field(player, 'toolbar', inv.toolbar);
        sync.inventory(player);
        return true;
    }
    const inventoryItem = isInInventory(player, { nameName });
    if (!inventoryItem) return false;
    const item = inv.items[inventoryItem.index];
    if (!item) return false;
    const removedFromInventory = inventoryRemove(player, item.slot);
    if (!removedFromInventory) return false;
    save.field(player, 'inventory', inv.inventory);
    sync.inventory(player);
    return true;
}

function findItemBySlot(player, selectedSlot) {
    if (selectedSlot.includes('i')) {
        const item = getInventoryItem(player, stripCategory(selectedSlot));
        if (!item) return null;
        return { item: deepCloneObject(item), index: inv.items.findIndex((i) => i.slot === item.slot) };
    }
    if (selectedSlot.includes('e')) {
        const item = getEquipmentItem(player, stripCategory(selectedSlot));
        if (!item) return null;
        return { item: deepCloneObject(item), index: inv.equipment.findIndex((i) => i.slot === item.slot) };
    }
    if (selectedSlot.includes('t')) {
        const item = getToolbarItem(player, stripCategory(selectedSlot));
        if (!item) return null;
        return { item: deepCloneObject(item), index: inv.toolbar.findIndex((i) => i.slot === item.slot) };
    }
    return null;
}

function getSlotType(slot) {
    if (slot.includes('i')) return 'inventory';
    if (slot.includes('tab')) return 'tab';
    if (slot.includes('t')) return 'toolbar';
    if (slot.includes('g')) return 'ground';
    if (slot.includes('e')) return 'equipment';
    return null;
}

function saveFields(player, fields){
    for (let i = 0; i < fields.length; i++) save.field(player, fields[i], inv[fields[i]]);
    sync.inventory(player);
}

function swapOrStack(player, selectedSlot, endSlot, customItemRules) {
    const fieldsToSave = [];
    const selectItem = findItemBySlot(player, selectedSlot);
    const endItem = findItemBySlot(player, endSlot);
    if (!endItem || !selectItem) {
        Logger.log(`No end slot for this item... ${selectedSlot} to ${endSlot} (may be null)`);
        sync.inventory(player);
        return;
    }
    const newSelectSlot = endItem.item.slot;
    const newEndSlot = selectItem.item.slot;
    const selectIndex = selectItem.index;
    const endIndex = endItem.index;
    const selectedSlotName = getSlotType(selectedSlot);
    const endSlotName = getSlotType(endSlot);
    fieldsToSave.push(selectedSlotName);
    fieldsToSave.push(endSlotName);
    if (fieldsToSave.includes(null)) {
        sync.inventory(player);
        return;
    }
    const isSelectInventory = selectedSlotName.includes('inventory');
    const isEndInventory = endSlotName.includes('inventory');
    const isSelectEquipment = isFlagEnabled(selectItem.item.behavior, ItemType.IS_EQUIPMENT);
    const isEndEquipment = isFlagEnabled(endItem.item.behavior, ItemType.IS_EQUIPMENT);
    if (isSelectEquipment || isEndEquipment) {
        if (endItem.item.equipment !== selectItem.item.equipment) {
            sync.inventory(player);
            return;
        }
    }
    const selectedArray = isSelectInventory ? inv[selectedSlotName].items : inv[selectedSlotName];
    let endArray;
    if (selectedSlotName === endSlotName) endArray = selectedArray;
    else endArray = isEndInventory ? inv[endSlotName].items : inv[endSlotName];
    if (selectItem.item.name !== endItem.item.name) {
        if (!allItemRulesValid(player, selectItem.item, { name: endSlotName }, newEndSlot, customItemRules)) {
            sync.inventory(player);
            return;
        }
        if (!allItemRulesValid(player, endItem.item, { name: selectedSlotName }, newSelectSlot, customItemRules)) {
            sync.inventory(player);
            return;
        }
        selectedArray[selectIndex] = endItem.item;
        selectedArray[selectIndex].slot = newEndSlot;
        endArray[endIndex] = selectItem.item;
        endArray[endIndex].slot = newSelectSlot;
    } else {
        const isSelectStackable = isFlagEnabled(selectItem.item.behavior, ItemType.CAN_STACK);
        const isEndStackable = isFlagEnabled(endItem.item.behavior, ItemType.CAN_STACK);
        if (!isSelectStackable || !isEndStackable) {
            sync.inventory(player);
            return;
        }
        endArray[endIndex].quantity += selectItem.item.quantity;
        selectedArray.splice(selectIndex, 1);
    }
    if (selectedSlotName !== endSlotName) {
        if (isSelectInventory) inv[selectedSlotName].items = selectedArray;
        else inv[selectedSlotName] = selectedArray;
        if (isEndInventory) inv[endSlotName].items = endArray;
        else inv[endSlotName] = endArray;
    } else {
        if (isSelectInventory) inv[selectedSlotName].items = selectedArray;
        else inv[selectedSlotName] = selectedArray;
        fieldsToSave.pop();
        emit.sound2D(player, 'item_shuffle_1', Math.random() * 0.45 + 0.1);
    }
    saveFields(player, fieldsToSave);
    sync.inventory(player);
}

function allItemRulesValid(player, item, endSlot, endSlotIndex, customItemRules){
     let inv = getInventory(p);
    if (!item.behavior) return true;
    if (endSlot) {
        if (!isFlagEnabled(item.behavior, ItemType.CAN_STACK) && endSlot.name === InventoryType.INVENTORY) return false;
        if (!isFlagEnabled(item.behavior, ItemType.CAN_DROP) && endSlot.name === InventoryType.GROUND) return false;
        if (!isFlagEnabled(item.behavior, ItemType.IS_EQUIPMENT) && endSlot.name === InventoryType.EQUIPMENT) return false;
        if (!isFlagEnabled(item.behavior, ItemType.IS_TOOLBAR) && endSlot.name === InventoryType.TOOLBAR) return false;
        if (isFlagEnabled(item.behavior, ItemType.IS_EQUIPMENT) && endSlot.name === InventoryType.EQUIPMENT) {
            if (!isEquipmentSlotValid(item, endSlotIndex)) return false;
        }
    }
    if (customItemRules.length >= 1) {
        for (let i = 0; i < customItemRules.length; i++) {
            if (!customItemRules[i](player, item, endSlot ? endSlot.name : null, endSlotIndex)) return false;
        }
    }
    return true;
}

function getAllItems(player){
    let items = [];
    for (let i = 0; i < inv.equipment.length; i++) {
        const item = deepCloneObject(inv.equipment[i]);
        item.dataIndex = i;
        item.dataName = 'equipment';
        item.isEquipment = true;
        items.push(item);
    }
    for (let i = 0; i < inv.toolbar.length; i++) {
        const item = deepCloneObject(inv.toolbar[i]);
        item.dataIndex = i;
        item.dataName = 'toolbar';
        item.isToolbar = true;
        items.push(item);
    }
    for (let i = 0; i < inv.items.length; i++) {
        const item = deepCloneObject(inv.items[i]);
        item.dataIndex = i;
        item.dataName = 'inventory';
        item.isInventory = true;
        items.push(item);
    }
    return items;
}

function stackInventoryItem(player, item){
     let inv = getInventory(p);
    const existingItem = isInInventory(player, item);
    if (!existingItem) return false;
    if (!isFlagEnabled(inv.items[existingItem.index].behavior, ItemType.CAN_STACK)) return false;
    inv.items[existingItem.index].quantity += item.quantity;
    save.field(player, 'inventory', inv.inventory);
    sync.inventory(player);
    return true;
}

function getAllWeapons(player){
    const weapons = getAllItems(player).filter((item) => isFlagEnabled(item.behavior, ItemType.IS_WEAPON));
    if (weapons.length === 0) return [];
    return weapons;
}

function removeAllWeapons(player){
    const weapons = getAllItems(player).filter((item) => isFlagEnabled(item.behavior, ItemType.IS_WEAPON));
    if (weapons.length === 0) return [];
    const removedWeapons = [];
    for (let i = weapons.length - 1; i >= 0; i--) {
        if (weapons[i].isInventory) {
            removedWeapons.push(inv[weapons[i].dataName].items.splice(weapons[i].dataIndex, 1));
            continue;
        }
        removedWeapons.push(inv[weapons[i].dataName].splice(weapons[i].dataIndex, 1));
    }
    save.field(player, 'inventory', inv.inventory);
    save.field(player, 'toolbar', inv.toolbar);
    sync.inventory(player);
    player.removeAllWeapons();
    return removedWeapons;
}

import('../../views/inventory').catch((err) => {
    throw err;
});

export default {
    getFreeInventorySlot,
    allItemRulesValid,
    equipmentAdd,
    equipmentRemove,
    findAndRemove,
    getAllItems,
    getAllWeapons,
    getEquipmentItem,
    getInventoryItem,
    getSlotType,
    getToolbarItem,
    swapOrStack,
    hasItem,
    hasWeapon,
    inventoryAdd,
    inventoryRemove,
    isEquipmentSlotValid,
    isEquipmentSlotFree,
    isInEquipment,
    isInInventory,
    isInToolbar,
    isInventorySlotFree,
    isToolbarSlotFree,
    removeAllWeapons,
    replaceInventoryItem,
    replaceToolbarItem,
    stackInventoryItem,
    toolbarAdd,
    toolbarRemove
};

*/


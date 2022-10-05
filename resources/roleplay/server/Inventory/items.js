
export const list = [{
        type: "consumeable",
        id:0,
        weight:1,
        name: "Sprunk Can",
        rarity: "big",
        desc: "The essence of life",
        prop: "ba_prop_club_tonic_can",
        useable: true,
        quentity:1,
        usedurability: 5,
        onUseClientEval: `alt.log('success!');`, //TODO drink sound maybe?
        onUseServerEval: `itemfuncs.regenThirst(player, 500, 1000, 3, true, 0); alt.emitClient(player, 'playHowl2d', './audio/slurp.wav', 0.2);`,  //TODO trigger function? animation? add health? or energy?
        desc2: "Use: <br> Restores 50% thirst over 3 sec."
    },{
        type: "clothes",
        id:0,
        weight:0.5,
        name: "top",
        desc: "just a beautiful piece to cover up!",
        equipable: "character_PedComponentVariation",
        equipslot: 3,
        quentity:1,
        //first one is actual jacket and second is torso removed/invis or less it sticks out of jacket
        equipClientEval: `game.setPedComponentVariation(alt.Player.local.scriptID, 11, 57, 0, 0); game.setPedComponentVariation(alt.Player.local.scriptID, 3, 4, 0, 2);`,
        desc2: "Only suitable for everyone.",
        icon: 'top'
    },{
        type: "clothes",
        id:0,
        weight:0.5,
        name: "pants",
        desc: "somth to cover your dick with",
        equipable: "character_PedComponentVariation",
        equipslot: 4,
        quentity:1,
        equipClientEval: `game.setPedComponentVariation(alt.Player.local.scriptID, 4, 43, 0, 0);`,
        desc2: "Only suitable for males.",
        icon: 'pants'
    },{
        type: "clothes",
        id:0,
        weight:0.5,
        name: "hat",
        desc: "just a hat",
        equipable: "character_PedComponentVariation",
        equipslot: 1,
        quentity:1,
        equipClientEval: `game.setPedComponentVariation(alt.Player.local.scriptID, 1, 97, 0, 0);`,
        desc2: "Unisex.",
        icon: 'mask'
    },{
        type: "clothes",
        id:0,
        weight:0.5,
        name: "mask",
        desc: "holds many things like condoms.",
        gender: "Any",
        equipable: "character_PedComponentVariation",
        equipslot: 5,
        quentity:1,
        timedurability: 2880,
        equipClientEval: `game.setPedComponentVariation(alt.Player.local.scriptID, 5, 45, 0, 0);`,
        desc2: "Equip: <br> increases weight limit by x and slot limit by x",
        icon: 'default_bag'
    },{
        type: "clothes",
        id:0,
        weight:0.5,
        name: "Shoes",
        desc: "white trash.",
        equipable: "character_PedComponentVariation",
        equipslot: 6,
        quentity:1,
        timedurability: 2880,
        equipClientEval: `game.setPedComponentVariation(alt.Player.local.scriptID, 6, 31, 2, 0);`,
        desc2: "Only suitable for males.",
        icon: 'default_shoes_m'
    },{
        type: "clothes",
        id:0,
        weight:0.5,
        name: "Scarf",
        desc: "brown.",
        equipable: "character_PedComponentVariation",
        equipslot: 7,
        quentity:1,
        timedurability: 2880,
        equipClientEval: `game.setPedComponentVariation(alt.Player.local.scriptID, 7, 112, 0, 0);`,
        desc2: "Only suitable for males.",
        icon: 'scarfs'
    },
    {
        type: "clothes",
        id:0,
        weight:0.5,
        name: "Sunglasses",
        desc: "glasses test item",
        equipable: "character_PedComponentVariation",
        equipslot: 13,
        quentity:1,
        equipClientEval: `game.setPedPropIndex(alt.Player.local.scriptID, 1, 23, 2, 0);`,
        desc2: "Only suitable for males.",
        icon: 'glasses'
    },
{
        type: "clothes",
        id:0,
        weight:0.5,
        name: "BT Earpiece",
        desc: "ears test item",
        equipable: "character_PedComponentVariation",
        equipslot: 14,
        quentity:1,
        equipClientEval: `game.setPedPropIndex(alt.Player.local.scriptID, 2, 1, 0, 0);`,
        desc2: "Only suitable for males.",
        icon: 'ears'
    },
{
        type: "clothes",
        id:0,
        weight:0.5,
        name: "Watch",
        desc: "watch test item",
        equipable: "character_PedComponentVariation",
        equipslot: 15,
        quentity:1,
        equipClientEval: `game.setPedPropIndex(alt.Player.local.scriptID, 6, 20, 0, 0);`,
        desc2: "Only suitable for males.",
        icon: 'watch'
    },
{
        type: "clothes",
        id:0,
        weight:0.5,
        name: "Bracelet",
        desc: "bracelet test item",
        equipable: "character_PedComponentVariation",
        equipslot: 16,
        equipClientEval: `game.setPedPropIndex(alt.Player.local.scriptID, 7, 5, 0, 0);`,
        desc2: "Only suitable for males.",
        icon: 'bracelet'
    },
{
    type: "clothes",
    id:0,
    weight:0.5,
    name: "armour",
    desc: "protect your body",
    equipable: "character_PedComponentVariation",
    equipslot: 9,
    equipClientEval: `game.setPedPropIndex(alt.Player.local.scriptID, 7, 5, 0, 0);`,
    icon: 'armour'
},
    //********************** Tools **************** */
    
{
    type: "fishing",
    id:0,
    weight:0.5,
    name: "Fishing Rod",
    desc: "Standard Edition",
    prop: "prop_fishing_rod_01",
    useable: true,
    usedurability: 1000,
    weight: 0.586,
    onUseClientEval: `alt.log('lets try fishing :D');`,
    onUseServerEval: `alt.emitClient(player, 'fishing:tryFish');`,
    desc2: "Use: <br> Catch fish and feed your family!"
},
{
        type: "tools",
        id:0,
        weight:0.5,
        name: "Quick Repair Kit MK1",
        desc: "Just a temp fix.",
        useable: true,
        manualusesub: true,
        usedurability: 10,
        weight: 2.000,
        onUseClientEval: `alt.log('success!');`,
        onUseServerEval: `itemfuncs.vehicleRepairKit(player, "MK1", 20);`,
        desc2: "Use: <br> Temporary fix a vehicles engine."
    },
{
        type: "tools",
        id:0,
        weight:0.5,
        name: "Quick Repair Kit MK2",
        desc: "Just a temp fix.",
        useable: true,
        manualusesub: true,
        usedurability: 10,
        weight: 3.000,
        onUseClientEval: `alt.log('success!');`,
        onUseServerEval: `itemfuncs.vehicleRepairKit(player, "MK2", 21);`,
        desc2: "Use: <br> Temporary fix a vehicles engine."
    },    
{
        type: "tools",
        id:0,
        weight:0.5,
        name: "Quick Repair Kit MK3",
        desc: "Just a temp fix.",
        useable: true,
        manualusesub: true,
        usedurability: 10,
        weight: 4.000,
        onUseClientEval: `alt.log('success!');`,
        onUseServerEval: `itemfuncs.vehicleRepairKit(player, "MK3", 22);`,
        desc2: "Use: <br> Temporary fix a vehicles engine."
    }
    ,//********************** consumeable **************** */
    
{
    type: "consumeable",
    id:0,
    weight:0.5,
    name: "Bleeding Burger",
    desc: "Kill your hunger",
    prop: "xs_prop_trinket_bag_01a",
    useable: true,
    usedurability: 3,
    weight: 0.100,
    onUseClientEval: `alt.log('success!');`, //TODO drink sound maybe?
    onUseServerEval: `itemfuncs.regenHunger(player, 800, 1000, 5, true, 0);`,  //TODO trigger function? animation? add health? or energy?
    desc2: "Use: <br> Restores 80% hunger over 5 sec."
},
{
    type: "consumeable",
    id:0,
    weight:0.5,
    name: "Junk Energy Drink",
    desc: "The quick fix",
    useable: true,
    usedurability: 3,
    weight: 0.394,
    onUseClientEval: `alt.log('success!');`, //TODO drink sound maybe?
    onUseServerEval: `itemfuncs.regenEnergy(player, 100, 1000, 1, true, 0);`,  //TODO trigger function? animation? add health? or energy?
    desc2: "Use: <br> Restores 10% energy."
},
{
        type: "consumeable",
        id:0,
        weight:0.5,
        name: "Cannabis Caps",
        desc: "20pcs.",
        useable: true,
        usedurability: 20,
        weight: 0.140,
        onUseClientEval: `alt.log('success!');`,
        onUseServerEval: `console.log('success!');`,
        desc2: "Use: <br> Makes you melt like butter."
    },
{
        type: "consumeable",
        id:0,
        weight:0.5,
        name: "Cannabis Caps XL",
        desc: "40pcs.",
        useable: true,
        usedurability: 40,
        weight: 0.280,
        onUseClientEval: `alt.log('success!');`,
        onUseServerEval: `console.log('success!');`,
        desc2: "Use: <br> Makes you melt like butter."
    },
{
        type: "clothes",
        id:0,
        weight:0.5,
        name: "Hat",
        desc: "hat test item",
        equipable: "character_PedComponentVariation",
        equipslot: 12,
        equipClientEval: `game.setPedPropIndex(alt.Player.local.scriptID, 0, 13, 1, 0);`,
        desc2: "Only suitable for males.",
        icon: 'default_hats_m'
    },

    //first 100 are reserved for test items.    

    //TRASH FISH LOOT
{
        type: "trash",
        id:0,
        weight:0.5,
        rarity: "trash",
        name: "Old Boot",
        desc: "Maybe someone finds a use for this?",
        weight: 0.600,
        desc2: "Description: <br> Just trash found in the world."
    },
{
        type: "trash",
        id:0,
        weight:0.5,
        rarity: "trash",
        name: "Used Condom",
        desc: "Maybe someone finds a use for this?",
        weight: 0.020,
        desc2: "Description: <br> Just trash found in the world."
    },
{
        type: "trash",
        id:0,
        weight:0.5,
        rarity: "trash",
        name: "Burnt Porn Magazine",
        desc: "Maybe someone finds a use for this?",
        weight: 0.100,
        desc2: "Description: <br> Just trash found in the world."
    },
{
        type: "trash",
        id:0,
        weight:0.5,
        rarity: "trash",
        name: "Seaweed",
        desc: "bleh! icky..",
        weight: 0.100,
        desc2: "Description: <br> Just trash found in the world."
    },

    //freshwater fish, rare, big, common.
    //------------------------------------------------
    //RARE fish
    {
        type: "fish",
        id:0,
        weight:0.5,
        rarity: "rare",
        name: "<n style='color:gold'>Golden Siniperca</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        weight:0.5,
        rarity: "rare",
        name: "<n style='color:gold'>Granges D'or</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        weight:0.5,
        rarity: "rare",
        name: "<n style='color:gold'>Leather Carp</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        weight:0.5,
        rarity: "rare",
        name: "<n style='color:gold'>Mandarin Fish</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        weight:0.5,
        rarity: "rare",
        name: "<n style='color:gold'>Miho Spine Loach</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        weight:0.5,
        rarity: "rare",
        name: "<n style='color:gold'>Pacu</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        weight:0.5,
        rarity: "rare",
        name: "<n style='color:gold'>Piranha</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        weight:0.5,
        rarity: "rare",
        name: "<n style='color:gold'>Snakehead</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        weight:0.5,
        rarity: "rare",
        name: "<n style='color:gold'>Spotted Barbel</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        weight:0.5,
        rarity: "rare",
        name: "<n style='color:gold'>Swiri</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },

    //------------------------------------------------
    //BIG fish
    {
        type: "fish",
        id:0,
        weight:0.5,
        rarity: "big",
        name: "<n style='color:dodgerblue'>Arowana</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        weight:0.5,
        rarity: "big",
        name: "<n style='color:dodgerblue'>Carp</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        weight:0.5,
        rarity: "big",
        name: "<n style='color:dodgerblue'>Cherry Salmon</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        weight:0.5,
        rarity: "big",
        name: "<n style='color:dodgerblue'>Diamond Minnow</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        weight:0.5,
        rarity: "big",
        name: "<n style='color:dodgerblue'>Freshwater Eel</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        weight:0.5,
        rarity: "big",
        name: "<n style='color:dodgerblue'>Lenok</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        weight:0.5,
        rarity: "big",
        name: "<n style='color:dodgerblue'>Striped Shiner</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        weight:0.5,
        rarity: "big",
        name: "<n style='color:dodgerblue'>Yellow-Head Catfish</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },

    //------------------------------------------------
    //COMMON fish
    {
        type: "fish",
        id:0,
        quantity:1,
        rarity: "common",
        name: "<n style='color:greenyellow'>Amur Minnow</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        quantity:1,
        rarity: "common",
        name: "<n style='color:greenyellow'>Barbel Steed</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        quantity:1,
        rarity: "common",
        name: "<n style='color:greenyellow'>Bass</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        quantity:1,
        rarity: "common",
        name: "<n style='color:greenyellow'>Bitterling</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        quantity:1,
        rarity: "common",
        name: "<n style='color:greenyellow'>Bleeker</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        quantity:1,
        rarity: "common",
        name: "<n style='color:greenyellow'>Bluegill</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        quantity:1,
        rarity: "common",
        name: "<n style='color:greenyellow'>Bubble Eye</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        quantity:1,
        rarity: "common",
        name: "<n style='color:greenyellow'>Catfish</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        quantity:1,
        rarity: "common",
        name: "<n style='color:greenyellow'>Common Minnow</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        quantity:1,
        rarity: "common",
        name: "<n style='color:greenyellow'>Crawfish</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        quantity:1,
        rarity: "common",
        name: "<n style='color:greenyellow'>Crucian Carp</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        quantity:1,
        rarity: "common",
        name: "<n style='color:greenyellow'>Dace</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        quantity:1,
        rarity: "common",
        name: "<n style='color:greenyellow'>Goby Minnow</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        quantity:1,
        rarity: "common",
        name: "<n style='color:greenyellow'>Grayling</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        quantity:1,
        rarity: "common",
        name: "<n style='color:greenyellow'>Kuhlia Marginata</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        quantity:1,
        rarity: "common",
        name: "<n style='color:greenyellow'>Mudfish</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        quantity:1,
        rarity: "common",
        name: "<n style='color:greenyellow'>Notch Jaw</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        quantity:1,
        rarity: "common",
        name: "<n style='color:greenyellow'>Perch</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        quantity:1,
        rarity: "common",
        name: "<n style='color:greenyellow'>Rosy Bitterling</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        quantity:1,
        rarity: "common",
        name: "<n style='color:greenyellow'>Roundtail Paradisefish</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        quantity:1,
        rarity: "common",
        name: "<n style='color:greenyellow'>Salmon</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        quantity:1,
        rarity: "common",
        name: "<n style='color:greenyellow'>Smelt</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        quantity:1,
        rarity: "common",
        name: "<n style='color:greenyellow'>Soho Bitterling</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        quantity:1,
        rarity: "common",
        name: "<n style='color:greenyellow'>Stumpy Bullhead</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        quantity:1,
        rarity: "common",
        name: "<n style='color:greenyellow'>Sweetfish</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        quantity:1,
        rarity: "common",
        name: "<n style='color:greenyellow'>Terrapin</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },
    {
        type: "fish",
        id:0,
        quantity:1,
        rarity: "common",
        name: "<n style='color:greenyellow'>Yellowfin Sculpin</n>",
        desc: "Weight: 0.6 Kg",
        weight: 0.600,
        desc2: "Description: <br> An ingredient that can be sold to a Trader or used in Cooking. Obtained through fishing."
    },

    /*
    MASKS starts at 200.
    */
   
   {
    type: "clothes",
    id:0,
    type2: "mask",
    id:0,
    name: "Pink Pig",
    desc: "Hides your identity.",
    gender: "Any",
    equipable: "character_PedComponentVariation",
    equipslot: 1,
    timedurability: 2880,
    equipClientEval: 'game.setPedComponentVariation(alt.Player.local.scriptID, 1, 1, 0, 0);',
    desc2: "Unisex.",
    icon: 'default_mask'
}]
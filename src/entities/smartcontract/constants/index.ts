import { isMainNet } from 'app/constants';

export const ENGINEER_CERTIFICATE_ID = 505660;

const TEST_NET_IN_GAME_IDS = [
    176450,
    176449,
    176448,
    176447,
    176446,
    177577,
    177576,
    177575,
    177574,
    177573,
    177453,
    177452,
    177451,
    177450,
    177449,
    177448,
    177447,
    177446,
    177445,
    177444,
    176896,
    176895,
    176894,
    176891,
    176885,
    176879,
    176874,
    176873,
    176872,
    176871,
    176451,
    ENGINEER_CERTIFICATE_ID,
];

const MAIN_NET_IN_GAME_IDS = [
    314749, 314748, 314747, 314744, 314743, 314738, 314737, 314735, 314734,
    314733, 314721, 314719, 314716, 314715, 314714, 314712, 314711, 314710,
    314707, 314706, 314134, 314130, 314124, 314117, 314112, 314105, 314096,
    314090, 314085, 314084, 314739, 514951, 514950, 514949, 514948, 514947,
    514946, 514945, 514944, 514943, 514942, 514941, 514939, 514934, 514929,
    514927, 514925, 514924, 514923, 514922, 514920, 514918, 514917, 514916,
    514915, 514913,
];

export const IN_GAME_NFT_IDS = isMainNet
    ? MAIN_NET_IN_GAME_IDS
    : TEST_NET_IN_GAME_IDS;

export const ID_TO_INVENTORY = {
    177577: 'DME Wire',
    177576: 'DME Wire',
    177575: 'DME Wire',
    177574: 'DME Wire',
    177573: 'DME Wire',
    177453: 'Plunging Blocks',
    177452: 'Plunging Blocks',
    177451: 'Plunging Blocks',
    177450: 'Plunging Blocks',
    177449: 'Plunging Blocks',
    177448: 'Cutter',
    177447: 'Cutter',
    177446: 'Cutter',
    177445: 'Cutter',
    177444: 'Cutter',
    176896: 'Delaminator',
    176895: 'Delaminator',
    176894: 'Delaminator',
    176891: 'Delaminator',
    176885: 'Delaminator',
    176879: 'Wandering Reactor',
    176874: 'Wandering Reactor',
    176873: 'Wandering Reactor',
    176872: 'Wandering Reactor',
    176871: 'Wandering Reactor',
    176451: 'Mine',
    314739: 'Mine',
    [ENGINEER_CERTIFICATE_ID]: 'Engineer Certificate', // todo: replace for actual
} as const;

export const mineAssetTemplateId = isMainNet ? 314739 : 176451;
export const areasAssetTemplateId = isMainNet
    ? [314749, 314748, 314747, 314744, 314743]
    : [176450, 176449, 176448, 176447, 176446];

export type InventoryIdTypeWithName = keyof typeof ID_TO_INVENTORY;
export type InventoryIdType =
    | InventoryIdTypeWithName
    | typeof mineAssetTemplateId;
export type InventoryNameType = typeof ID_TO_INVENTORY[InventoryIdTypeWithName];

export const INVENTORY_NAMES = [
    ...new Set(
        Object.entries(ID_TO_INVENTORY)
            .map(([, value]) => value)
            .filter((v) => v)
    ),
] as InventoryNameType[];

export enum ACTION_STATE_TO_ID {
    undefined,
    active,
    interrupted,
    finished,
    claimed,
}

export enum INDEX_POSITION_CONTRACT {
    undefined,
    contractId,
    clientId,
    nickname,
}

export enum INDEX_POSITION_INVENTORY {
    undefined,
    inventoryId,
    nickname,
}

export enum INDEX_POSITION_HISTORY {
    undefined,
    actionId,
    nickname,
    contractId,
}

export enum INDEX_POSITION_USER {
    undefined,
    nickname,
}

export const deepminegame = 'deepmineappg';
export const deepminesmrt = 'deepminesrmt';

export const dmeToUpgrade = {
    Common: {
        0: 50000,
        1: 100000,
        2: 250000,
        3: 450000,
        4: 700000,
        5: 1150000,
        6: 1850000,
        7: 2900000,
        8: 4500000,
        9: 7100000,
    },
    Uncommon: {
        0: 140000,
        1: 350000,
        2: 700000,
        3: 1250000,
        4: 2100000,
        5: 3450000,
        6: 5400000,
        7: 8450000,
        8: 13200000,
        9: 20750000,
    },
    Rare: {
        0: 400000,
        1: 1050000,
        2: 2100000,
        3: 3750000,
        4: 6250000,
        5: 10050000,
        6: 15900000,
        7: 24850000,
        8: 38750000,
        9: 60850000,
    },
    Epic: {
        0: 1170000,
        1: 3100000,
        2: 6200000,
        3: 11000000,
        4: 18350000,
        5: 29600000,
        6: 46700000,
        7: 72950000,
        8: 113700000,
        9: 178400000,
    },
    Legendary: {
        0: 3440000,
        1: 9100000,
        2: 18150000,
        3: 32250000,
        4: 53950000,
        5: 86950000,
        6: 137250000,
        7: 214250000,
        8: 333650000,
        9: 522850000,
    },
};

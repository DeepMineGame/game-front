import { isMainNet } from 'app/constants';

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
    176451: '',
    0: '',
} as const;

export const mineAssetTemplateId = isMainNet ? 0 : 176451;
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

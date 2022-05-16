import { GetTableDataConfigType, name } from '../..';

export const getContractsConfig = (account: string) => {
    return {
        code: name,
        scope: name,
        table: 'contracts',
        index_position: 3,
        key_type: 'name',
        lower_bound: account,
        upper_bound: account,
        limit: 1,
    } as GetTableDataConfigType;
};

export const getUserConfig = (account: string) => {
    return {
        code: name,
        scope: name,
        table: 'users',
        index_position: 1,
        key_type: 'name',
        lower_bound: account,
        upper_bound: account,
        limit: 1,
    } as GetTableDataConfigType;
};

export const getInventoryConfig = (account: string) => {
    return {
        code: name,
        scope: name,
        table: 'inventories',
        index_position: 2,
        key_type: 'name',
        lower_bound: account,
        upper_bound: account,
        limit: 100,
    } as GetTableDataConfigType;
};

export const getHistoryConfig = (account: string) => {
    return {
        code: name,
        scope: name,
        table: 'actions',
        index_position: 2,
        key_type: 'name',
        lower_bound: account,
        upper_bound: account,
        limit: 100,
    } as GetTableDataConfigType;
};

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
};

export const LOCATION_TO_ID = {
    mine: 1,
    landlords_reception: 2,
    cabinet: 3,
    city: 4,
    geologists_camp: 5,
    map: 6,
    scientists_laboratory: 7,
    mine_deck: 8,
    engineers_workshop: 9,
    factory: 10,
};

export const ACTION_STATE_TO_ID = {
    active: 1,
    interrupted: 2,
    finished: 3,
};

export const CABIN_STATUS = {
    sign_contract: 1,
    welcome: 2,
    setup: 3,
    ready: 4,
    mining_progress: 5,
    mining_interrupted: 6,
    mining_over: 7,
};

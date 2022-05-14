import { GetTableDataConfigType, name } from '../..';

export const getContractsConfig = (account: string) => {
    return {
        code: name,
        scope: name,
        table: 'contracts',
        index_position: 3,
        key_type: 'name',
        lower_bound: account,
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
        limit: 100,
    } as GetTableDataConfigType;
};

export const ID_TO_INVENTORY = {
    176446: 'Cutter',
    176448: 'Delaminator',
    176449: 'DME WIRE',
    176450: 'Plunging box',
    176451: 'Wandering reactor',
};

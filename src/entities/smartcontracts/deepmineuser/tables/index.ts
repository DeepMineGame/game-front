import {
    GetTableDataConfigType,
    INDEX_POSITION_HISTORY,
    INDEX_POSITION_INVENTORY,
    INDEX_POSITION_USER,
    name,
} from '../..';

export * from './actions';
export * from './contracts';

export const getUserConfig = (account: string) => {
    return {
        code: name,
        scope: name,
        table: 'users',
        index_position: INDEX_POSITION_USER.nickname,
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
        index_position: INDEX_POSITION_INVENTORY.nickname,
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
        index_position: INDEX_POSITION_HISTORY.nickname,
        key_type: 'name',
        lower_bound: account,
        upper_bound: account,
        limit: 100,
    } as GetTableDataConfigType;
};

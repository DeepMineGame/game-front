import { GetTableDataConfigType } from '../type';
import {
    deepminegame,
    INDEX_POSITION_HISTORY,
    INDEX_POSITION_INVENTORY,
    INDEX_POSITION_USER,
} from '../constants';

export * from './mines';
export * from './contractors';
export * from '../tables/actions';
export * from '../tables/contracts';
export * from '../tables/inventories';
export * from '../tables/users';
export * from './types';

export const getUserConfig = (account: string) => {
    return {
        code: deepminegame,
        scope: deepminegame,
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
        code: deepminegame,
        scope: deepminegame,
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
        code: deepminegame,
        scope: deepminegame,
        table: 'actions',
        index_position: INDEX_POSITION_HISTORY.nickname,
        key_type: 'name',
        lower_bound: account,
        upper_bound: account,
        limit: 100,
    } as GetTableDataConfigType;
};
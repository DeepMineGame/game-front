import { GetTableDataConfigType } from '../type';
import {
    deepminegame,
    INDEX_POSITION_HISTORY,
    INDEX_POSITION_INVENTORY,
    INDEX_POSITION_USER,
} from '../constants';

export * from './areas';
export * from './mines';
export * from './contractors';
export * from '../tables/actions';
export * from '../tables/contracts';
export * from '../tables/inventories';
export * from '../tables/users';
export * from './types';
export * from './roles';
export * from './engineer';

export const getUserConfig = (account: string): GetTableDataConfigType => {
    return {
        code: deepminegame,
        scope: deepminegame,
        table: 'users',
        index_position: INDEX_POSITION_USER.nickname,
        key_type: 'name',
        lower_bound: account,
        upper_bound: account,
        limit: 1,
    };
};

export const getInventoryConfig = (
    account: string,
    limit = 100
): GetTableDataConfigType => {
    return {
        code: deepminegame,
        scope: deepminegame,
        table: 'inventories',
        index_position: INDEX_POSITION_INVENTORY.nickname,
        key_type: 'name',
        lower_bound: account,
        upper_bound: account,
        limit,
    };
};

export const getHistoryConfig = (account: string): GetTableDataConfigType => {
    return {
        code: deepminegame,
        scope: deepminegame,
        table: 'actions',
        index_position: INDEX_POSITION_HISTORY.nickname,
        key_type: 'name',
        lower_bound: account,
        upper_bound: account,
        limit: 100,
    };
};

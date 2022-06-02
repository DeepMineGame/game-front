import { createEffect, createStore } from 'effector';
import { getTableData } from 'features';
import { deepminegame } from '../../constants';
import { UserInventoryType } from '../types';

export enum SEARCH_BY {
    undefined,
    inventoryId,
    ownerNickname,
}

export const getInventoriesEffect = createEffect(
    async ({
        searchIdentificationType = SEARCH_BY.ownerNickname,
        searchParam,
    }: {
        searchIdentificationType?: SEARCH_BY;
        searchParam: string;
    }) => {
        return getTableData({
            code: deepminegame,
            scope: deepminegame,
            table: 'inventories',
            index_position: searchIdentificationType,
            key_type: 'name',
            lower_bound: searchParam,
            upper_bound: searchParam,
            limit: 1000,
        });
    }
);

export const inventoriesStore = createStore<UserInventoryType[] | null>(
    null
).on(getInventoriesEffect.doneData, (_, { rows }) => rows);

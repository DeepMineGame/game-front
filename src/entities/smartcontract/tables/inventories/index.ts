import { createEffect, createStore } from 'effector';
import { getTableData } from 'shared';
import { deepminegame } from '../../constants';
import { UserInventoryType } from './types';

export * from './constants';
export enum SEARCH_BY {
    undefined,
    inventoryId,
    ownerNickname,
}
export * from './types';

export const getInventoryTableData = ({
    searchIdentificationType = SEARCH_BY.ownerNickname,
    searchParam,
}: {
    searchIdentificationType?: SEARCH_BY;
    searchParam: string | number;
}) =>
    getTableData({
        code: deepminegame,
        scope: deepminegame,
        table: 'inventories',
        index_position: searchIdentificationType,
        key_type:
            searchIdentificationType === SEARCH_BY.ownerNickname
                ? 'name'
                : 'id',
        lower_bound: searchParam,
        upper_bound: searchParam,
        limit: 1000,
    });

export const getInventoriesEffect = createEffect(
    async ({
        searchIdentificationType = SEARCH_BY.ownerNickname,
        searchParam,
    }: {
        searchIdentificationType?: SEARCH_BY;
        searchParam: string;
    }) => {
        return getInventoryTableData({
            searchIdentificationType,
            searchParam,
        });
    }
);

export const $inventory = createStore<UserInventoryType[]>([]).on(
    getInventoriesEffect.doneData,
    (_, { rows }) => rows
);

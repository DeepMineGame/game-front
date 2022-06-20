import { createEffect, createStore } from 'effector';
import { getTableData } from 'features';
import { deepminegame } from '../../constants';
import { UserInventoryType } from './types';

export enum SEARCH_BY {
    undefined,
    inventoryId,
    ownerNickname,
}
export * from './types';

export const inventoryTableDataConfig = ({
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
        return inventoryTableDataConfig({
            searchIdentificationType,
            searchParam,
        });
    }
);

export const inventoriesStore = createStore<UserInventoryType[] | null>(
    null
).on(getInventoriesEffect.doneData, (_, { rows }) => rows);

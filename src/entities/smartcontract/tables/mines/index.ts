import { createEffect, createStore } from 'effector';
import { getTableData } from 'shared';
import { deepminegame } from '../../constants';
import { MineDto } from './types';

export enum searchBy {
    undefined,
    assetId,
    owner,
}
export const getMinesEffect = createEffect(
    async ({
        searchParam,
        searchIdentificationType = searchBy.assetId,
    }: {
        searchParam: string;
        searchIdentificationType?: searchBy;
    }) => {
        return getTableData({
            code: deepminegame,
            scope: deepminegame,
            table: 'mines',
            index_position: searchIdentificationType,
            key_type:
                searchIdentificationType === searchBy.assetId ? 'id' : 'name',
            lower_bound: searchParam,
            upper_bound: searchParam,
            limit: 1,
        });
    }
);

export const getMinesByOwnerEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getMinesEffect({
            searchIdentificationType: searchBy.owner,
            searchParam,
        });
    }
);

export const minesStore = createStore<MineDto[] | null>(null).on(
    getMinesEffect.doneData,
    (_, { rows }) => rows
);

export * from './types';

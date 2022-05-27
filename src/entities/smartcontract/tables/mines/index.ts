import { createEffect, createStore } from 'effector';
import { getTableData } from 'features';
import { deepminegame } from '../../constants';
import { MineDto } from './types';

enum searchBy {
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
            key_type: 'id',
            lower_bound: searchParam,
            limit: 1,
        });
    }
);

export const minesStore = createStore<MineDto[] | null>(null).on(
    getMinesEffect.doneData,
    (_, { rows }) => rows
);

export * from './types';

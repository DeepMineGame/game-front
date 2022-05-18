import { createEffect, createStore } from 'effector';
import { getTableData } from 'features';
import { deepminearea } from '../constants';
import { MineDto } from './types';

export const getMinesEffect = createEffect(
    async ({ assetId }: { assetId: string }) => {
        return getTableData({
            code: deepminearea,
            scope: deepminearea,
            table: 'mines',
            index_position: 1,
            key_type: 'id',
            lower_bound: assetId,
            limit: 1,
        });
    }
);

export const minesStore = createStore<MineDto[] | null>(null).on(
    getMinesEffect.doneData,
    (_, { rows }) => rows
);

export * from './types';

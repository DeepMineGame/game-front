import { createEffect, createStore } from 'effector';
import { getTableData } from 'features';
import { deepminegame } from '../../constants';
import { ActionDto } from './types';

export enum mapSearchParamForIndexPosition {
    undefined,
    actionId,
    ownerUserId,
    contractId,
}

export const getActionEffect = createEffect(
    async ({
        searchIdentification,
        searchParam,
    }: {
        searchIdentification: mapSearchParamForIndexPosition;
        searchParam: number | string;
    }) => {
        return getTableData({
            code: deepminegame,
            scope: deepminegame,
            table: 'actions',
            index_position: searchIdentification,
            key_type: 'i64',
            lower_bound: searchParam,
            upper_bound: searchParam,
            limit: 1000,
        });
    }
);

export const getActionByUserEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) =>
        getActionEffect({
            searchIdentification: mapSearchParamForIndexPosition.ownerUserId,
            searchParam,
        })
);

export const actionsStore = createStore<ActionDto[] | null>(null).on(
    getActionEffect.doneData,
    (_, { rows }) => rows
);

export * from './types';

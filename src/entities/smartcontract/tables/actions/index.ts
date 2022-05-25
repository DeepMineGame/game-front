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
export enum ActionType {
    undefined,
    mine_setup,
    mine,
}

export const getActionEffect = createEffect(
    async ({
        searchIdentification,
        searchParam,
    }: {
        searchIdentification: mapSearchParamForIndexPosition;
        searchParam: number;
    }) => {
        return getTableData({
            code: deepminegame,
            scope: deepminegame,
            table: 'actions',
            index_position: searchIdentification,
            key_type: 'i64',
            lower_bound: searchParam,
            limit: 1,
        });
    }
);

export const actionsStore = createStore<ActionDto[] | null>(null).on(
    getActionEffect.doneData,
    (_, { rows }) => rows
);

export * from './types';

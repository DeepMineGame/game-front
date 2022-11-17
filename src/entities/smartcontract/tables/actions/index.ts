import { createEffect, createStore } from 'effector';
import { getTableData } from 'shared';
import { deepminegame } from '../../constants';
import { ActionDto } from './types';

export enum mapSearchParamForIndexPosition {
    undefined,
    actionId,
    ownerUserId,
    contractId,
}

export const getActionsTable = async <T>({
    searchIdentification,
    searchParam,
    limit = 1000,
}: {
    searchIdentification: mapSearchParamForIndexPosition;
    searchParam: number | string;
    limit?: number;
}) =>
    getTableData<T>({
        code: deepminegame,
        scope: deepminegame,
        table: 'actions',
        index_position: searchIdentification,
        key_type: 'i64',
        lower_bound: searchParam,
        upper_bound: searchParam,
        limit,
    });

export const getActionEffect = createEffect<
    {
        searchIdentification: mapSearchParamForIndexPosition;
        searchParam: number | string;
    },
    { rows: ActionDto[] } | undefined
>(getActionsTable);

export const getActionByUserEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) =>
        getActionEffect({
            searchIdentification: mapSearchParamForIndexPosition.ownerUserId,
            searchParam,
        })
);

export const actionsStore = createStore<ActionDto[] | null>(null).on(
    getActionEffect.doneData,
    (_, data) => data?.rows
);

export * from './types';

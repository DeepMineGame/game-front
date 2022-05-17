import { createEffect, createStore } from 'effector';
import { JsonRpc } from 'eosjs';
import { waxEndpoints } from 'app/constants';
import { ActionDto } from './types';
// TODO: make endpoints dynamically https://github.com/DeepMineGame/DM/blob/55cac20d92083866ddcc16de0a0b8cbdaba5d4c7/src/Helpers/chain.helper.js#L31
const rpc = new JsonRpc(waxEndpoints[0]);

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
        return rpc.get_table_rows({
            json: 'true',
            code: 'deepmineuser',
            scope: 'deepmineuser',
            table: 'actions',
            index_position: searchIdentification,
            key_type: 'i64',
            lower_bound: searchParam,
            reverse: false,
            show_payer: false,
        });
    }
);

export const actionsStore = createStore<ActionDto[] | null>(null).on(
    getActionEffect.doneData,
    (_, { rows }) => rows
);

export * from './types';

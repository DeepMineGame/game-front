import { createEffect, createStore } from 'effector';
import { JsonRpc } from 'eosjs';
import { waxEndpoints } from 'app/constants';
import { MineDto } from './types';
// TODO: make endpoints dynamically https://github.com/DeepMineGame/DM/blob/55cac20d92083866ddcc16de0a0b8cbdaba5d4c7/src/Helpers/chain.helper.js#L31
const rpc = new JsonRpc(waxEndpoints[0]);

export const getMinesEffect = createEffect(
    async ({ assetId }: { assetId: string }) => {
        return rpc.get_table_rows({
            json: 'true',
            code: 'deepminearea',
            scope: 'deepminearea',
            table: 'mines',
            index_position: 1,
            key_type: 'id',
            lower_bound: assetId,
            limit: 1,
            reverse: false,
            show_payer: false,
        });
    }
);

export const minesStore = createStore<MineDto[] | null>(null).on(
    getMinesEffect.doneData,
    (_, { rows }) => rows
);

export * from './types';

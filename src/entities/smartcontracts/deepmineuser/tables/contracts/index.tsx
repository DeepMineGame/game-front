import { createEffect, createStore } from 'effector';
import { JsonRpc } from 'eosjs';
import { waxEndpoints } from 'app/constants';
import { ContractDto } from './types';
// TODO: make endpoints dynamically https://github.com/DeepMineGame/DM/blob/55cac20d92083866ddcc16de0a0b8cbdaba5d4c7/src/Helpers/chain.helper.js#L31
const rpc = new JsonRpc(waxEndpoints[0]);

export enum mapSearchParamForIndexPositionToFindContracts {
    undefined,
    contractId,
    clientId,
    executorId,
}

export const getContractEffect = createEffect(
    async ({
        searchIdentification,
        searchParam,
    }: {
        searchIdentification: mapSearchParamForIndexPositionToFindContracts;
        searchParam: string;
    }) => {
        return rpc.get_table_rows({
            json: 'true',
            code: 'deepmineuser',
            scope: 'deepmineuser',
            table: 'contracts',
            index_position: searchIdentification,
            key_type: 'i64',
            lower_bound: searchParam,
            reverse: false,
            show_payer: false,
        });
    }
);

export const contractStore = createStore<ContractDto[] | null>(null).on(
    getContractEffect.doneData,
    (_, { rows }) => rows
);

export * from './types';

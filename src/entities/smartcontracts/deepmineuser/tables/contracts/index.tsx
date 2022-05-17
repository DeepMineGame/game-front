import { createEffect, createStore } from 'effector';
import { getTableData } from 'features';
import { ContractDto } from './types';

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
        return getTableData({
            code: 'deepmineuser',
            scope: 'deepmineuser',
            table: 'contracts',
            index_position: searchIdentification,
            key_type: 'i64',
            lower_bound: searchParam,
            limit: 1,
        });
    }
);

export const contractStore = createStore<ContractDto[] | null>(null).on(
    getContractEffect.doneData,
    (_, { rows }) => rows
);

export * from './types';

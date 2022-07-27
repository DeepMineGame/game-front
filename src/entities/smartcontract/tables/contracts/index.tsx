import { createEffect, createStore } from 'effector';
import { getTableData } from 'shared';
import { deepminegame, GetTableDataConfigType } from 'entities/smartcontract';
import { ContractDto } from './types';

export enum mapSearchParamForIndexPositionToFindContracts {
    undefined,
    contractId,
    contractType,
    clientId,
    executorId,
}

export const getContractConfig = ({
    searchParam,
    searchIdentification = mapSearchParamForIndexPositionToFindContracts.executorId,
    limit = 100,
}: {
    searchParam: string;
    searchIdentification?: mapSearchParamForIndexPositionToFindContracts;
    limit?: number;
}): GetTableDataConfigType => ({
    code: deepminegame,
    scope: deepminegame,
    table: 'contracts',
    index_position: searchIdentification,
    key_type: 'i64',
    upper_bound: searchParam,
    lower_bound: searchParam,
    limit,
});

export const getContractEffect = createEffect(
    async ({
        searchIdentification = mapSearchParamForIndexPositionToFindContracts.executorId,
        searchParam,
    }: {
        searchIdentification?: mapSearchParamForIndexPositionToFindContracts;
        searchParam: string;
    }) => {
        return getTableData(
            getContractConfig({ searchParam, searchIdentification })
        );
    }
);

export const contractStore = createStore<ContractDto[] | null>(null).on(
    getContractEffect.doneData,
    (_, { rows }) => rows
);

export const getContractsNameConfig = (
    searchParam: string | number,
    indexPosition = mapSearchParamForIndexPositionToFindContracts.executorId,
    limit = 1
) => {
    return {
        code: deepminegame,
        scope: deepminegame,
        table: 'contracts',
        index_position: indexPosition,
        key_type: 'name',
        lower_bound: searchParam,
        upper_bound: searchParam,
        limit,
    } as GetTableDataConfigType;
};

export * from './types';
export * from './status';

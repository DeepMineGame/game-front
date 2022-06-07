import { createEffect, createStore } from 'effector';
import { getTableData } from 'features';
import {
    deepminegame,
    GetTableDataConfigType,
    INDEX_POSITION_CONTRACT,
} from '../..';
import { ContractDto } from './types';

export enum mapSearchParamForIndexPositionToFindContracts {
    undefined,
    contractId,
    clientId,
    executorId,
}

export const getContractEffect = createEffect(
    async ({
        searchIdentification = mapSearchParamForIndexPositionToFindContracts.executorId,
        searchParam,
    }: {
        searchIdentification?: mapSearchParamForIndexPositionToFindContracts;
        searchParam: string;
    }) => {
        return getTableData({
            code: deepminegame,
            scope: deepminegame,
            table: 'contracts',
            index_position: searchIdentification,
            key_type: 'i64',
            upper_bound: searchParam,
            lower_bound: searchParam,
            limit: 100,
        });
    }
);

export const contractStore = createStore<ContractDto[] | null>(null).on(
    getContractEffect.doneData,
    (_, { rows }) => rows
);

export const getContractsByNickNameConfig = (account: string) => {
    return {
        code: deepminegame,
        scope: deepminegame,
        table: 'contracts',
        index_position: INDEX_POSITION_CONTRACT.nickname,
        key_type: 'name',
        lower_bound: account,
        upper_bound: account,
        limit: 1,
    } as GetTableDataConfigType;
};

export * from './types';

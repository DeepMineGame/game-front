import { createEffect, createStore } from 'effector';
import { getTableData } from 'features';
import {
    GetTableDataConfigType,
    INDEX_POSITION_CONTRACT,
    name,
} from '../../../index';
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
            code: name,
            scope: name,
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

export const getContractsByNickNameConfig = (account: string) => {
    return {
        code: name,
        scope: name,
        table: 'contracts',
        index_position: INDEX_POSITION_CONTRACT.nickname,
        key_type: 'name',
        lower_bound: account,
        upper_bound: account,
        limit: 1,
    } as GetTableDataConfigType;
};

export * from './types';

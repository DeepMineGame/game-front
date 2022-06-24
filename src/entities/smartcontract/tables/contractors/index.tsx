import { createEffect, createStore } from 'effector';
import { getTableData } from 'shared';
import { deepminegame } from '../../constants';
import { ContractorDto } from './types';

export enum ContractorsSearchType {
    undefined,
    owenr,
    areaId,
    mineId,
}

export const getContractorsEffect = createEffect(
    async ({
        searchParam,
        searchType = ContractorsSearchType.owenr,
    }: {
        searchParam: string;
        searchType?: ContractorsSearchType;
    }) => {
        return getTableData({
            code: deepminegame,
            scope: deepminegame,
            table: 'contractors',
            index_position: searchType,
            key_type:
                searchType === ContractorsSearchType.owenr ? 'name' : 'i64',
            lower_bound: searchParam,
            upper_bound: searchParam,
            limit: 100,
        });
    }
);

export const contractorsStore = createStore<ContractorDto[] | null>(null).on(
    getContractorsEffect.doneData,
    (_, { rows }) => rows
);

export * from './types';

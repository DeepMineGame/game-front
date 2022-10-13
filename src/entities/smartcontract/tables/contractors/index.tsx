import { createEffect, createStore } from 'effector';
import { getTableData } from 'shared';
import { deepminegame } from '../../constants';
import { ContractorDto } from './types';

export enum ContractorsSearchType {
    undefined,
    owner,
    areaId,
    mineId,
}

export const getContractorsTableData = ({
    searchParam,
    searchType = ContractorsSearchType.owner,
}: {
    searchParam: string;
    searchType?: ContractorsSearchType;
}) =>
    getTableData({
        code: deepminegame,
        scope: deepminegame,
        table: 'contractors',
        index_position: searchType,
        key_type: searchType === ContractorsSearchType.owner ? 'name' : 'i64',
        lower_bound: searchParam,
        upper_bound: searchParam,
        limit: 100,
    });

export const getContractorsEffect = createEffect(
    async ({
        searchParam,
        searchType = ContractorsSearchType.owner,
    }: {
        searchParam: string;
        searchType?: ContractorsSearchType;
    }) => getContractorsTableData({ searchParam, searchType })
);

export const contractorsStore = createStore<ContractorDto[]>([]).on(
    getContractorsEffect.doneData,
    (_, { rows }) => rows
);

export * from './types';

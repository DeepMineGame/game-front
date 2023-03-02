import { createEffect, createStore } from 'effector';
import { getTableData } from 'shared';
import { deepmineming } from '../../constants';
import { ContractorDto } from './types';

export enum ContractorsSearchType {
    undefined,
    owner,
    areaId,
    mineId,
}

export const getContractorsTableData = <T,>({
    searchParam,
    searchType = ContractorsSearchType.owner,
}: {
    searchParam: string;
    searchType?: ContractorsSearchType;
}) =>
    getTableData<T>({
        code: deepmineming,
        scope: deepmineming,
        table: 'contractors2',
        index_position: searchType,
        key_type: searchType === ContractorsSearchType.owner ? 'name' : 'i64',
        lower_bound: searchParam,
        upper_bound: searchParam,
        limit: 100,
    });

export const getContractorsEffect = createEffect<
    { searchParam: string; searchType?: ContractorsSearchType },
    { rows: ContractorDto[] } | undefined
>(({ searchParam, searchType = ContractorsSearchType.owner }) =>
    getContractorsTableData({ searchParam, searchType })
);

export const contractorsStore = createStore<ContractorDto[]>([]).on(
    getContractorsEffect.doneData,
    (_, data) => data?.rows
);

export * from './types';

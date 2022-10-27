import { getTableData } from 'shared';
import { deepmineengr, GetTableDataConfigType } from 'entities/smartcontract';

export * from './types';

export const getEngineerConfig = ({
    searchParam,
    limit = 1,
}: {
    searchParam: string;
    limit?: number;
}): GetTableDataConfigType => ({
    code: deepmineengr,
    scope: deepmineengr,
    table: 'engineers',
    index_position: 1,
    key_type: 'name',
    upper_bound: searchParam,
    lower_bound: searchParam,
    limit,
});

export const getEngineerTableData = <T>({
    searchParam,
    limit = 1,
}: {
    searchParam: string;
    limit?: number;
}) => getTableData<T>(getEngineerConfig({ searchParam, limit }));

import { getTableData } from 'shared';
import { deepminegame, GetTableDataConfigType } from 'entities/smartcontract';

export * from './types';

export const getEngineerConfig = ({
    searchParam,
    limit = 1,
}: {
    searchParam: string;
    limit?: number;
}): GetTableDataConfigType => ({
    code: deepminegame,
    scope: deepminegame,
    table: 'engineers',
    index_position: 1,
    key_type: 'name',
    upper_bound: searchParam,
    lower_bound: searchParam,
    limit,
});

export const getEngineerTableData = ({
    searchParam,
    limit = 1,
}: {
    searchParam: string;
    limit?: number;
}) => getTableData(getEngineerConfig({ searchParam, limit }));

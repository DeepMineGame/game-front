import { createEffect, createStore } from 'effector';
import { getTableData } from 'shared';
import { GetTableDataConfigType } from 'entities/smartcontract';
import { deepminegame } from '../../constants';
import { searchBy } from '../mines';
import { AreasDto } from './types';

export const getAreaConfig = (
    searchParam: string,
    searchIdentificationType = searchBy.assetId
): GetTableDataConfigType => {
    return {
        code: deepminegame,
        scope: deepminegame,
        table: 'areas',
        index_position: searchIdentificationType,
        key_type: searchIdentificationType === searchBy.assetId ? 'id' : 'name',
        lower_bound: searchParam,
        upper_bound: searchParam,
        limit: 1,
    };
};

export const getAreasEffect = createEffect<
    { searchParam: string; searchIdentificationType?: searchBy },
    { rows: AreasDto[] },
    Error
>(({ searchParam, searchIdentificationType = searchBy.assetId }) =>
    getTableData(getAreaConfig(searchParam, searchIdentificationType))
);

export const areasStore = createStore<AreasDto[] | null>(null).on(
    getAreasEffect.doneData,
    (_, { rows }) => rows
);

export * from './types';

import { createEffect, createStore } from 'effector';
import { getTableData } from 'features';
import { deepminegame } from '../../constants';
import { searchBy } from '../mines';
import { AreasDto } from './types';

export const getAreasEffect = createEffect(
    async ({
        searchParam,
        searchIdentificationType = searchBy.assetId,
    }: {
        searchParam: string;
        searchIdentificationType?: searchBy;
    }) => {
        return getTableData({
            code: deepminegame,
            scope: deepminegame,
            table: 'areas',
            index_position: searchIdentificationType,
            key_type:
                searchIdentificationType === searchBy.assetId ? 'id' : 'name',
            lower_bound: searchParam,
            upper_bound: searchParam,
            limit: 1,
        });
    }
);

export const areasStore = createStore<AreasDto[] | null>(null).on(
    getAreasEffect.doneData,
    (_, { rows }) => rows
);

export * from './types';

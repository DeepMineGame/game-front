import { createEffect, createStore } from 'effector';
import { getTableData } from 'shared';
import { deepminegame } from '../../constants';
import { MineDto } from './types';

export enum searchBy {
    undefined,
    assetId,
    owner,
    areaId,
}
const keyType = {
    [searchBy.undefined]: '' as const,
    [searchBy.assetId]: 'id' as const,
    [searchBy.owner]: 'name' as const,
    [searchBy.areaId]: 'i64' as const,
};
export const getMinesTableData = <T>({
    searchParam,
    searchIdentificationType = searchBy.assetId,
    limit = 1,
}: {
    searchParam: string;
    searchIdentificationType?: searchBy;
    limit?: number;
}) =>
    getTableData<T>({
        code: deepminegame,
        scope: deepminegame,
        table: 'mines',
        index_position: searchIdentificationType,
        key_type: keyType[searchIdentificationType],
        lower_bound: searchParam,
        upper_bound: searchParam,
        limit,
    });

export const getMinesEffect = createEffect<
    { searchParam: string; searchIdentificationType?: searchBy },
    { rows: MineDto[] },
    Error
>(({ searchParam, searchIdentificationType = searchBy.assetId }) =>
    getMinesTableData({ searchParam, searchIdentificationType })
);

export const getMinesByOwnerEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getMinesEffect({
            searchIdentificationType: searchBy.owner,
            searchParam,
        });
    }
);

export const minesStore = createStore<MineDto[] | null>(null).on(
    getMinesEffect.doneData,
    (_, { rows }) => rows
);

export * from './types';

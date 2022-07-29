import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { getTableData } from 'shared';
import {
    AreasDto,
    getAreaConfig,
    getMinesTableData,
    MineDto,
    searchBy,
} from 'entities/smartcontract';

export const UserMineGate = createGate<{ searchParam: string }>('UserMineGate');

export const getMinesByOwnerEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getMinesTableData({
            searchIdentificationType: searchBy.owner,
            searchParam,
        });
    }
);
export const getAreaByAssetEffect = createEffect(async (mine: MineDto[]) => {
    return getTableData(getAreaConfig(mine[0]?.area_id, searchBy.assetId));
});
export const userMineStore = createStore<MineDto[]>([]).on(
    getMinesByOwnerEffect.doneData,
    (_, { rows }) => rows
);

export const areaForMine = createStore<AreasDto[] | null>(null).on(
    getAreaByAssetEffect.doneData,
    (_, { rows }) => rows
);

forward({
    from: UserMineGate.open,
    to: getMinesByOwnerEffect,
});

forward({ from: userMineStore, to: getAreaByAssetEffect });

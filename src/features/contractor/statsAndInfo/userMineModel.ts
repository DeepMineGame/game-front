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

export const getMinesByOwnerEffect = createEffect<
    { searchParam: string },
    { rows: MineDto[] } | undefined
>(({ searchParam }) =>
    getMinesTableData({
        searchIdentificationType: searchBy.owner,
        searchParam,
    })
);

export const getAreaByAssetEffect = createEffect<
    MineDto[],
    { rows: AreasDto[] } | undefined
>((mine: MineDto[]) =>
    getTableData(getAreaConfig(mine[0]?.area_id, searchBy.assetId))
);

export const userMineStore = createStore<MineDto[]>([]).on(
    getMinesByOwnerEffect.doneData,
    (_, data) => data?.rows
);

export const areaForMine = createStore<AreasDto[] | null>(null).on(
    getAreaByAssetEffect.doneData,
    (_, data) => data?.rows
);

forward({
    from: UserMineGate.open,
    to: getMinesByOwnerEffect,
});

forward({ from: userMineStore, to: getAreaByAssetEffect });

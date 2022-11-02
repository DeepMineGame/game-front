import { createStore, sample, createEffect, forward } from 'effector';
import { getTableData } from 'shared';
import { createGate } from 'effector-react';
import {
    AreasDto,
    getAreaConfig,
    getMinesTableData,
    getInventoryTableData,
    MineDto,
    SEARCH_BY,
    searchBy,
    UserInventoryType,
} from 'entities/smartcontract';

export const MineOwnerInfoGate = createGate<{ searchParam: string }>(
    'MineOwnerInfoGate'
);

export const getMinesEffect = createEffect<
    { searchParam: string; searchIdentificationType?: searchBy },
    { rows: MineDto[] },
    Error
>(({ searchParam, searchIdentificationType = searchBy.owner }) =>
    getMinesTableData({ searchParam, searchIdentificationType })
);

export const getAreasEffect = createEffect<
    { searchParam: string; searchIdentificationType?: searchBy },
    { rows: AreasDto[] },
    Error
>(({ searchParam, searchIdentificationType = searchBy.assetId }) =>
    getTableData(getAreaConfig(searchParam, searchIdentificationType))
);

export const getInventoryByIdEffect = createEffect<
    { searchParam: number },
    { rows: UserInventoryType[] },
    Error
>(({ searchParam }) =>
    getInventoryTableData({
        searchIdentificationType: SEARCH_BY.inventoryId,
        searchParam,
    })
);

export const minesStore = createStore<MineDto[] | null>(null).on(
    getMinesEffect.doneData,
    (_, { rows }) => rows
);
export const areaForMineStore = createStore<null | AreasDto>(null).on(
    getAreasEffect.doneData,
    (_, { rows }) => rows?.[0]
);

export const areaNftStore = createStore<UserInventoryType | null>(null).on(
    getInventoryByIdEffect.doneData,
    (_, { rows }) => rows?.[0]
);

forward({ from: MineOwnerInfoGate.open, to: getMinesEffect });

// fetch area by mine
sample({
    source: minesStore,
    target: getAreasEffect,
    fn: (mines) => ({ searchParam: mines?.[0]?.area_id || '' }),
});

// fetch area nft from inventory
sample({
    source: areaForMineStore,
    target: getInventoryByIdEffect,
    fn: (area) => ({ searchParam: Number(area?.id) || 0 }),
});

import { createStore, sample, createEffect } from 'effector';
import {
    AreasDto,
    getAreasEffect,
    inventoryTableDataConfig,
    minesStore,
    SEARCH_BY,
    UserInventoryType,
} from 'entities/smartcontract';

export const getInventoryByIdEffect = createEffect(
    async ({ searchParam }: { searchParam: number }) =>
        inventoryTableDataConfig({
            searchIdentificationType: SEARCH_BY.inventoryId,
            searchParam,
        })
);

export const areaForMineStore = createStore<null | AreasDto>(null).on(
    getAreasEffect.doneData,
    (_, { rows }) => rows?.[0]
);

export const areaOwnerStore = createStore<UserInventoryType | null>(null).on(
    getInventoryByIdEffect.doneData,
    (_, { rows }) => rows?.[0]
);

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
    fn: (area) => ({ searchParam: area?.id || 0 }),
});

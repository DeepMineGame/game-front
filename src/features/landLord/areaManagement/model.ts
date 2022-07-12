import { createGate } from 'effector-react';
import { createEffect, createStore, forward, sample } from 'effector';
import {
    getMinesTableData,
    inventoryTableDataConfig,
    InventoryType,
    MineDto,
    SEARCH_BY,
    searchBy,
    UserInventoryType,
} from 'entities/smartcontract';

export const AreaGate = createGate<{ searchParam: string }>('AreaGate');

export const getInventoriesEffect = createEffect(
    async ({
        searchIdentificationType = SEARCH_BY.ownerNickname,
        searchParam,
    }: {
        searchIdentificationType?: SEARCH_BY;
        searchParam: string;
    }) => {
        return inventoryTableDataConfig({
            searchIdentificationType,
            searchParam,
        });
    }
);

export const getMinesByAreaId = createEffect(
    async (areaNft: UserInventoryType[] | null) => {
        return (
            areaNft?.length &&
            getMinesTableData({
                searchIdentificationType: searchBy.areaId,
                searchParam: areaNft[0]?.asset_id,
                limit: 30,
            })
        );
    }
);

export const inventoriesStore = createStore<UserInventoryType[] | null>(
    null
).on(getInventoriesEffect.doneData, (_, { rows }) => rows);

export const userAreaNftStore = createStore<UserInventoryType[] | null>(null);

export const minesForAreaSlots = createStore<MineDto[] | null>(null).on(
    getMinesByAreaId.doneData,
    (_, { rows }) => rows
);

forward({
    from: AreaGate.open,
    to: getInventoriesEffect,
});

forward({
    from: userAreaNftStore,
    to: getMinesByAreaId,
});

sample({
    source: inventoriesStore,
    target: userAreaNftStore,
    filter: (inventories) =>
        Boolean(
            inventories?.filter(
                ({ inv_type }) => inv_type === InventoryType.areas
            )?.length
        ),
});

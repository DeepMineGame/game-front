import { createGate } from 'effector-react';
import { createEffect, createStore, forward, sample } from 'effector';
import {
    getInventoriesEffect,
    getMinesTableData,
    inventoriesStore,
    InventoryType,
    MineDto,
    searchBy,
    UserInventoryType,
} from 'entities/smartcontract';

export const AreaManagementGate = createGate<{ searchParam: string }>(
    'AreaManagementGate'
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

export const userAreaNftStore = createStore<UserInventoryType[] | null>(null);
export const minesForAreaSlots = createStore<MineDto[] | null>(null).on(
    getMinesByAreaId.doneData,
    (_, { rows }) => rows
);

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

forward({
    from: AreaManagementGate.open,
    to: getInventoriesEffect,
});

forward({
    from: userAreaNftStore,
    to: getMinesByAreaId,
});

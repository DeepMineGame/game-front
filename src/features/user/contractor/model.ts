import { createStore, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { createEffect } from 'effector/effector.umd';
import {
    AreasDto,
    ContractorDto,
    getAreasEffect,
    getMinesEffect,
    inventoryTableDataConfig,
    MineDto,
    SEARCH_BY,
    UserInventoryType,
} from 'entities/smartcontract';

const getMineEffect = createEffect(
    async ({ mineId }: { mineId: ContractorDto['mine_id'] }) =>
        getMinesEffect({ searchParam: mineId })
);

const getAreaEffect = createEffect(
    async ({
        areaId,
    }: {
        mineId: ContractorDto['mine_id'];
        areaId: AreasDto['id'];
    }) => getAreasEffect({ searchParam: String(areaId) })
);
export const getInventoryByIdEffect = createEffect(
    async ({ searchParam }: { searchParam: number }) =>
        inventoryTableDataConfig({
            searchIdentificationType: SEARCH_BY.inventoryId,
            searchParam,
        })
);

export const contractorMineStore = createStore<null | MineDto>(null).on(
    getMinesEffect.doneData,
    (_, { rows }) => rows?.[0]
);

export const contractorAreaStore = createStore<null | AreasDto>(null).on(
    getAreasEffect.doneData,
    (_, { rows }) => rows?.[0]
);
export const areaNftStore = createStore<UserInventoryType | null>(null).on(
    getInventoryByIdEffect.doneData,
    (_, { rows }) => rows?.[0]
);

export const ContractorGate = createGate<{
    mineId: ContractorDto['mine_id'];
    areaId: AreasDto['id'];
}>('ContractorGate');

forward({
    from: ContractorGate.open,
    to: [getMineEffect, getAreaEffect],
});

// fetch area nft from inventory
sample({
    source: contractorAreaStore,
    target: getInventoryByIdEffect,
    fn: (area) => ({ searchParam: area?.id || 0 }),
});

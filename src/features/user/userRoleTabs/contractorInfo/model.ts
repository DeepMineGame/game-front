import { createStore, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { createEffect } from 'effector/effector.umd';
import {
    AreasDto,
    ContractorDto,
    getAreasEffect,
    getContractorsTableData,
    getContractorsEffect,
    getMinesEffect,
    getInventoryTableData,
    MineDto,
    SEARCH_BY,
    UserInventoryType,
} from 'entities/smartcontract';

export const ContractorGate = createGate<{
    searchParam: string;
}>('ContractorGate');

const getContractorDataEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) =>
        getContractorsTableData({ searchParam })
);
const getMineEffect = createEffect(
    async (contractorDto: ContractorDto | null) =>
        contractorDto && getMinesEffect({ searchParam: contractorDto.mine_id })
);

const getAreaEffect = createEffect(
    async (contractorDto: ContractorDto | null) =>
        contractorDto && getAreasEffect({ searchParam: contractorDto.area_id })
);

export const getInventoryByIdEffect = createEffect<
    {
        searchParam: number;
    },
    UserInventoryType[],
    Error
>(async ({ searchParam }) =>
    getInventoryTableData({
        searchIdentificationType: SEARCH_BY.inventoryId,
        searchParam,
    })
);

export const contractorMineStore = createStore<null | MineDto>(null).on(
    getMinesEffect.doneData,
    (_, [contractorMine]) => contractorMine || null
);

export const contractorDataStore = createStore<ContractorDto | null>(null).on(
    getContractorsEffect.doneData,
    (_, [contractorData]) => contractorData || null
);

export const contractorAreaStore = createStore<null | AreasDto>(null).on(
    getAreasEffect.doneData,
    (_, [contractorArea]) => contractorArea || null
);

export const areaNftStore = createStore<UserInventoryType | null>(null).on(
    getInventoryByIdEffect.doneData,
    (_, [areaNft]) => areaNft || null
);

forward({
    from: ContractorGate.open,
    to: getContractorDataEffect,
});

sample({
    source: contractorDataStore,
    target: [getMineEffect, getAreaEffect],
});

// fetch area nft from inventory
sample({
    source: contractorAreaStore,
    target: getInventoryByIdEffect,
    fn: (area) => ({ searchParam: Number(area?.id) || 0 }),
});

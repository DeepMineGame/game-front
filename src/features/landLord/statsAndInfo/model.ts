import { createEffect, createStore, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { getTableData } from 'shared';
import {
    areasAssetTemplateId,
    AreasDto,
    getAreaConfig,
    getInventoryTableData,
    SEARCH_BY,
    searchBy,
    UserInventoryType,
} from 'entities/smartcontract';

export const AreaStateGate = createGate<{ searchParam: string }>('AreaGate');

export const getInventoriesEffect = createEffect<
    { searchIdentificationType?: SEARCH_BY; searchParam: string },
    { rows: UserInventoryType[] }
>(({ searchIdentificationType = SEARCH_BY.ownerNickname, searchParam }) =>
    getInventoryTableData({
        searchIdentificationType,
        searchParam,
    })
);

export const getAreasEffect = createEffect<
    UserInventoryType | null,
    { rows: AreasDto[] }
>((areaNft: UserInventoryType | null) =>
    getTableData(getAreaConfig(areaNft?.asset_id!, searchBy.assetId))
);

export const landlordAreaNftStore = createStore<UserInventoryType | null>(
    null
).on(
    getInventoriesEffect.doneData,
    (_, { rows }) =>
        rows?.find(({ template_id }) =>
            areasAssetTemplateId.includes(template_id)
        ) || null
);

export const landlordAreaTableStore = createStore<AreasDto | null>(null).on(
    getAreasEffect.doneData,
    (_, { rows }) => rows?.[0]
);

export const reservedSlotsCountStore = createStore(0).on(
    landlordAreaTableStore,
    (state, landlordArea) =>
        landlordArea?.mine_slots.reduce((acc, current) => {
            if (current?.reserved) {
                return ++acc;
            }
            return acc;
        }, 0)
);

forward({
    from: AreaStateGate.open,
    to: getInventoriesEffect,
});

sample({
    source: landlordAreaNftStore,
    target: getAreasEffect,
    filter: (areaNft) => areaNft !== null,
});

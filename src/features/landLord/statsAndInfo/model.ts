import { createEffect, createStore, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { getTableData } from 'shared';
import {
    areasAssetTemplateId,
    AreasDto,
    getAreaConfig,
    inventoryTableDataConfig,
    SEARCH_BY,
    searchBy,
    UserInventoryType,
} from 'entities/smartcontract';

export const AreaStateGate = createGate<{ searchParam: string }>('AreaGate');

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

export const getAreasEffect = createEffect(
    async (areaNft: UserInventoryType | null) => {
        return getTableData(
            getAreaConfig(areaNft?.asset_id!, searchBy.assetId)
        );
    }
);

export const landlordAreaNftStore = createStore<UserInventoryType | null>(
    null
).on(
    getInventoriesEffect.doneData,
    (_, { rows }: { rows: UserInventoryType[] }) =>
        rows?.filter(({ template_id }) =>
            areasAssetTemplateId.includes(template_id)
        )[0]
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

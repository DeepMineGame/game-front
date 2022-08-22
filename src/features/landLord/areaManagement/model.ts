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
    RoleDto,
    getRolesTableData,
    UserRoles,
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

export const ClaimDmeGate = createGate<{ searchParam: string }>('ClaimDmeGate');

export const getRolesEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getRolesTableData({ searchParam });
    }
);

export const rolesStore = createStore<RoleDto[] | null>(null).on(
    getRolesEffect.doneData,
    (_, { rows }) => rows
);

export const claimDmeStore = createStore(0);

forward({
    from: ClaimDmeGate.open,
    to: getRolesEffect,
});

sample({
    source: rolesStore,
    target: claimDmeStore,
    fn: (roles) => {
        const landlordRole = roles?.find(
            ({ role }) => role === UserRoles.landlord
        );

        const dmeToClaim =
            Number(
                landlordRole?.attrs?.find(({ key }) => key === 'fee_to_claim')
                    ?.value
            ) || 0;

        return dmeToClaim;
    },
});

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

import { createGate } from 'effector-react';
import { createEffect, createStore, forward, sample } from 'effector';
import {
    getInventoryTableData,
    getMinesTableData,
    getRolesTableData,
    InventoryType,
    MineDto,
    RoleDto,
    SEARCH_BY,
    searchBy,
    UserInventoryType,
    UserRoles,
} from 'entities/smartcontract';

export const AreaGate = createGate<{ searchParam: string }>('AreaGate');

export const getInventoriesEffect = createEffect<
    { searchIdentificationType?: SEARCH_BY; searchParam: string },
    { rows: UserInventoryType[] } | undefined
>(({ searchIdentificationType = SEARCH_BY.ownerNickname, searchParam }) =>
    getInventoryTableData({
        searchIdentificationType,
        searchParam,
    })
);

export const getMinesByAreaId = createEffect<
    UserInventoryType[] | null,
    { rows: MineDto[] | undefined } | undefined
>((inventory: UserInventoryType[] | null) => {
    const areaNft = inventory?.find(
        ({ inv_type }) => inv_type === InventoryType.areas
    );

    return areaNft
        ? getMinesTableData({
              searchIdentificationType: searchBy.areaId,
              searchParam: areaNft?.asset_id,
              limit: 30,
          })
        : { rows: undefined };
});

export const $inventory = createStore<UserInventoryType[] | null>(null).on(
    getInventoriesEffect.doneData,
    (_, data) => data?.rows
);

export const userAreaNftStore = createStore<UserInventoryType[] | null>(null);

export const minesForAreaSlots = createStore<MineDto[] | null>(null).on(
    getMinesByAreaId.doneData,
    (_, data) => data?.rows
);

export const ClaimDmeGate = createGate<{ searchParam: string }>('ClaimDmeGate');

export const getRolesEffect = createEffect<
    { searchParam: string },
    { rows: RoleDto[] } | undefined
>(getRolesTableData);

export const rolesStore = createStore<RoleDto[] | null>(null).on(
    getRolesEffect.doneData,
    (_, data) => data?.rows
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

        return (
            Number(
                landlordRole?.attrs?.find(
                    ({ first }) => first === 'fee_to_claim'
                )?.second
            ) || 0
        );
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
    source: $inventory,
    target: userAreaNftStore,
    filter: (inventories) =>
        Boolean(
            inventories?.find(
                ({ inv_type }) => inv_type === InventoryType.areas
            )
        ),
});

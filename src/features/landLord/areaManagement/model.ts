import { createGate } from 'effector-react';
import { createEffect, createStore, forward, sample } from 'effector';
import {
    getMinesTableData,
    getInventoryTableData,
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

export const getInventoriesEffect = createEffect<
    {
        searchIdentificationType?: SEARCH_BY;
        searchParam: string;
    },
    { rows: UserInventoryType[] },
    Error
>(({ searchIdentificationType = SEARCH_BY.ownerNickname, searchParam }) =>
    getInventoryTableData({
        searchIdentificationType,
        searchParam,
    })
);

export const getMinesByAreaId = createEffect<
    UserInventoryType[] | null,
    { rows: MineDto[] | undefined },
    Error
>((areaNft: UserInventoryType[] | null) =>
    areaNft?.length
        ? getMinesTableData({
              searchIdentificationType: searchBy.areaId,
              searchParam: areaNft[0]?.asset_id,
              limit: 30,
          })
        : { rows: undefined }
);

export const $inventory = createStore<UserInventoryType[] | null>(null).on(
    getInventoriesEffect.doneData,
    (_, { rows }) => rows
);

export const userAreaNftStore = createStore<UserInventoryType[] | null>(null);

export const minesForAreaSlots = createStore<MineDto[] | null>(null).on(
    getMinesByAreaId.doneData,
    (_, { rows }) => rows
);

export const ClaimDmeGate = createGate<{ searchParam: string }>('ClaimDmeGate');

export const getRolesEffect = createEffect<
    { searchParam: string },
    { rows: RoleDto[] },
    Error
>(getRolesTableData);

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
    source: $inventory,
    target: userAreaNftStore,
    filter: (inventories) =>
        Boolean(
            inventories?.filter(
                ({ inv_type }) => inv_type === InventoryType.areas
            )?.length
        ),
});

import { createEffect } from 'effector';
import { getTableData } from 'shared';
import {
    getAreaConfig,
    getContractConfig,
    getInventoryConfig,
    getMinesEffect,
    mapSearchParamForIndexPositionToFindContracts,
    searchBy,
} from 'entities/smartcontract';

export const getAreaByOwnerEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getTableData(getAreaConfig(searchParam, searchBy.owner));
    }
);

export const getMinesByOwnerEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getMinesEffect({
            searchIdentificationType: searchBy.owner,
            searchParam,
        });
    }
);

export const getContractByExecutorEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getTableData(
            getContractConfig({
                searchParam,
                searchIdentification:
                    mapSearchParamForIndexPositionToFindContracts.executorId,
                limit: 10000,
            })
        );
    }
);

export const getInventoryEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) =>
        getTableData(getInventoryConfig(searchParam))
);

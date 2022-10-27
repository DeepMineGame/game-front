import { createEffect } from 'effector';
import { getTableData } from 'shared';
import { MergedInventoryWithAtomicAssets } from 'entities/atomicassets';
import {
    AreasDto,
    ContractDto,
    getAreaConfig,
    getContractConfig,
    getInventoryConfig,
    getMinesEffect,
    mapSearchParamForIndexPositionToFindContracts,
    MineDto,
    searchBy,
} from 'entities/smartcontract';

export const getAreaByOwnerEffect = createEffect<
    {
        searchParam: string;
    },
    AreasDto[],
    Error
>(({ searchParam }) =>
    getTableData(getAreaConfig(searchParam, searchBy.owner))
);

export const getMinesByOwnerEffect = createEffect<
    {
        searchParam: string;
    },
    MineDto[],
    Error
>(({ searchParam }) =>
    getMinesEffect({
        searchIdentificationType: searchBy.owner,
        searchParam,
    })
);

export const getContractByExecutorEffect = createEffect<
    {
        searchParam: string;
    },
    ContractDto[],
    Error
>(({ searchParam }) =>
    getTableData(
        getContractConfig({
            searchParam,
            searchIdentification:
                mapSearchParamForIndexPositionToFindContracts.executorId,
            limit: 10000,
        })
    )
);

export const getInventoryEffect = createEffect<
    {
        searchParam: string;
    },
    MergedInventoryWithAtomicAssets,
    Error
>(({ searchParam }) => getTableData(getInventoryConfig(searchParam)));

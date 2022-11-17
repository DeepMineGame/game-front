import { createEffect, createStore, forward } from 'effector';
import { getTableData, getTimeLeft } from 'shared';
import { createGate } from 'effector-react';
import {
    ActionDto,
    ContractDto,
    ContractorDto,
    ContractorsSearchType,
    ContractStatus,
    ContractType,
    getActionsTable,
    getContractConfig,
    getContractorsTableData,
    getMinesTableData,
    mapSearchParamForIndexPosition,
    mapSearchParamForIndexPositionToFindContracts,
    MineDto,
    searchBy,
} from 'entities/smartcontract';

export const MiningPageGate = createGate<{ searchParam: string }>(
    'MiningPageGate'
);

export const getContractByExecutorEffect = createEffect<
    { searchParam: string },
    { rows: ContractDto[] }
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

export const getMineByAssetEffect = createEffect<
    ContractDto | null | undefined,
    { rows: MineDto[] | null | undefined }
>((contract: ContractDto | null | undefined) =>
    contract
        ? getMinesTableData({
              searchParam: contract.client_asset_id,
              searchIdentificationType: searchBy.assetId,
          })
        : { rows: null }
);

export const getActionsForUserEffect = createEffect<
    { searchParam: number | string },
    { rows: ActionDto[] }
>(({ searchParam }) =>
    getActionsTable({
        searchIdentification: mapSearchParamForIndexPosition.ownerUserId,
        searchParam,
    })
);
export const miningContractStore = createStore<ContractDto | null | undefined>(
    null
).on(getContractByExecutorEffect.doneData, (_, { rows }) =>
    rows?.find(
        ({ status, type }: ContractDto) =>
            type === ContractType.mineowner_contractor &&
            status === ContractStatus.active
    )
);

export const $currentMine = createStore<MineDto[] | null>(null).on(
    getMineByAssetEffect.doneData,
    (_, { rows }) => rows
);

export const actionsStore = createStore<ActionDto[] | null | undefined>(
    null
).on(getActionsForUserEffect.doneData, (_, { rows }) => rows);

export const getContractorEffect = createEffect<
    { searchParam: string },
    { rows: ContractorDto[] }
>(({ searchParam }) =>
    getContractorsTableData({
        searchParam,
        searchType: ContractorsSearchType.owner,
    })
);

export const contractorStore = createStore<ContractorDto | null>(null).on(
    getContractorEffect.doneData,
    (_, { rows }) => rows?.[0]
);

export const estimatesMiningTimeStore = createStore('').on(
    contractorStore,
    (_, contractorDto) =>
        contractorDto?.params?.est_time_min &&
        contractorDto?.params?.est_time_max
            ? `${getTimeLeft(
                  contractorDto?.params?.est_time_min
              )} - ${getTimeLeft(contractorDto?.params?.est_time_max)}`
            : ''
);

forward({
    from: MiningPageGate.open,
    to: [
        getContractByExecutorEffect,
        getActionsForUserEffect,
        getContractorEffect,
    ],
});

forward({
    from: miningContractStore,
    to: getMineByAssetEffect,
});

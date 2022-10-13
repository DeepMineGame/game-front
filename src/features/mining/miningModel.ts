import { combine, createEffect, createStore, forward } from 'effector';
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
    getContractsNameConfig,
    getMinesTableData,
    getUserConfig,
    mapSearchParamForIndexPosition,
    mapSearchParamForIndexPositionToFindContracts,
    MineDto,
    searchBy,
    UserInfoType,
} from 'entities/smartcontract';

export const MiningPageGate = createGate<{ searchParam: string }>(
    'MiningPageGate'
);

export const MineOwnerContractsGate = createGate<{ searchParam: string }>(
    'MineOwnerContractsGate'
);

export const getContractByExecutorEffect = createEffect(
    async ({
        searchParam,
    }: {
        searchIdentification?: mapSearchParamForIndexPositionToFindContracts;
        searchParam: string;
    }) => {
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

export const getMineByAssetEffect = createEffect(
    async (contract: ContractDto | null | undefined) => {
        return (
            contract &&
            getMinesTableData({
                searchParam: contract.client_asset_id,
                searchIdentificationType: searchBy.assetId,
            })
        );
    }
);

export const getActionsForUserEffect = createEffect(
    async ({ searchParam }: { searchParam: number | string }) =>
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

export const currentMineStore = createStore<MineDto[] | null>(null).on(
    getMineByAssetEffect.doneData,
    (_, { rows }) => rows
);

export const actionsStore = createStore<ActionDto[] | null | undefined>(
    null
).on(getActionsForUserEffect.doneData, (_, { rows }) => rows);

export const getContractorEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) =>
        getContractorsTableData({
            searchParam,
            searchType: ContractorsSearchType.owner,
        })
);

export const contractorStore = createStore<ContractorDto | null | undefined>(
    null
).on(getContractorEffect.doneData, (_, { rows }) => rows?.[0]);

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

const getUserContractsEffect = createEffect(
    ({ searchParam }: { searchParam: string }) =>
        getTableData(
            getContractsNameConfig(
                searchParam,
                mapSearchParamForIndexPositionToFindContracts.executorId,
                1000
            )
        )
);

const getUserInfoEffect = createEffect(
    ({ searchParam }: { searchParam: string }) =>
        getTableData(getUserConfig(searchParam))
);

const $userContracts = createStore<ContractDto[]>([]).on(
    getUserContractsEffect.doneData,
    (_, { rows }) => rows
);

const $userInfo = createStore<UserInfoType | null>(null).on(
    getUserInfoEffect.doneData,
    (_, { rows }) => rows?.[0]
);

export const $mineOwnerContracts = combine(
    $userContracts,
    $userInfo,
    (userContracts, userInfo) =>
        userContracts.filter(
            ({ type, executor, status: contractStatus }) =>
                type === ContractType.mineowner_contractor &&
                executor === userInfo?.owner &&
                contractStatus === ContractStatus.active
        )
);

forward({
    from: MineOwnerContractsGate.open,
    to: [getUserContractsEffect, getUserInfoEffect],
});

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

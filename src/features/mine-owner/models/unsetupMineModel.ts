import { createGate } from 'effector-react';
import { createEffect, createStore, forward } from 'effector';
import { getTableData } from 'shared';
import {
    ContractDto,
    ContractStatus,
    ContractType,
    getContractsNameConfig,
    getMinesTableData,
    mapSearchParamForIndexPositionToFindContracts,
    MineDto,
    searchBy,
} from 'entities/smartcontract';

export const UnsetupMineGate = createGate<{ searchParams: string }>(
    'UnsetupMineGate'
);

const getExecutorContractsEffect = createEffect<
    { searchParams: string },
    { rows: ContractDto[] } | undefined
>(({ searchParams }) =>
    getTableData(
        getContractsNameConfig(
            searchParams,
            mapSearchParamForIndexPositionToFindContracts.executorId,
            200
        )
    )
);

const getContractorsContractsEffect = createEffect<
    { searchParams: string },
    { rows: ContractDto[] } | undefined
>(({ searchParams }) =>
    getTableData(
        getContractsNameConfig(
            searchParams,
            mapSearchParamForIndexPositionToFindContracts.clientId,
            200
        )
    )
);

const getUserMine = createEffect<
    { searchParams: string },
    { rows: MineDto[] } | undefined
>(({ searchParams }) =>
    getMinesTableData({
        searchParam: searchParams,
        searchIdentificationType: searchBy.owner,
    })
);

export const activeMineOwnerExecutorContractStore =
    createStore<ContractDto | null>(null).on(
        getExecutorContractsEffect.doneData,
        (_, data) =>
            data?.rows?.find(
                ({ type, status }: ContractDto) =>
                    type === ContractType.landlord_mineowner &&
                    status === ContractStatus.active
            ) || null
    );

export const activeContractorsContractsStore = createStore<
    ContractDto[] | null
>(null).on(getContractorsContractsEffect.doneData, (_, data) => {
    return data?.rows?.filter(
        ({ type, status }: ContractDto) =>
            type === ContractType.mineowner_contractor &&
            status === ContractStatus.active
    );
});

export const userMineStore = createStore<MineDto | null>(null).on(
    getUserMine.doneData,
    (_, data) => data?.rows?.[0]
);

forward({
    from: UnsetupMineGate.open,
    to: [
        getExecutorContractsEffect,
        getContractorsContractsEffect,
        getUserMine,
    ],
});
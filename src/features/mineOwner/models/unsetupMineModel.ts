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
const getExecutorContractsEffect = createEffect(
    async ({ searchParams }: { searchParams: string }) => {
        return getTableData(
            getContractsNameConfig(
                searchParams,
                mapSearchParamForIndexPositionToFindContracts.executorId,
                200
            )
        );
    }
);

const getContractorsContractsEffect = createEffect(
    async ({ searchParams }: { searchParams: string }) => {
        return getTableData(
            getContractsNameConfig(
                searchParams,
                mapSearchParamForIndexPositionToFindContracts.clientId,
                200
            )
        );
    }
);
const getUserMine = createEffect(
    async ({ searchParams }: { searchParams: string }) => {
        return getMinesTableData({
            searchParam: searchParams,
            searchIdentificationType: searchBy.owner,
        });
    }
);
export const activeMineOwnerExecutorContractStore =
    createStore<ContractDto | null>(null).on(
        getExecutorContractsEffect.doneData,
        (_, { rows }) => {
            return rows?.filter(
                ({ type, status }: ContractDto) =>
                    type === ContractType.landlord_mineowner &&
                    status === ContractStatus.active
            )?.[0];
        }
    );

export const activeContractorsContractsStore = createStore<
    ContractDto[] | null
>(null).on(getContractorsContractsEffect.doneData, (_, { rows }) => {
    return rows?.filter(
        ({ type, status }: ContractDto) =>
            type === ContractType.mineowner_contractor &&
            status === ContractStatus.active
    );
});

export const userMineStore = createStore<MineDto | null>(null).on(
    getUserMine.doneData,
    (_, { rows }) => rows?.[0]
);

forward({
    from: UnsetupMineGate.open,
    to: [
        getExecutorContractsEffect,
        getContractorsContractsEffect,
        getUserMine,
    ],
});

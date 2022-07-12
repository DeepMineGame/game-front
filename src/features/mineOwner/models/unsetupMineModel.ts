import { createGate } from 'effector-react';
import { createEffect, createStore, forward } from 'effector';
import { getTableData } from 'shared';
import {
    ContractDto,
    ContractStatus,
    ContractType,
    getContractsNameConfig,
    mapSearchParamForIndexPositionToFindContracts,
} from 'entities/smartcontract';

export const UnsetupMineGate = createGate<{ searchParams: string }>(
    'UnsetupMineGate'
);
const getContractsEffect = createEffect(
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

export const activeMineOwnerExecutorContractStore =
    createStore<ContractDto | null>(null).on(
        getContractsEffect.doneData,
        (_, { rows }) => {
            return rows?.filter(
                ({ type, status }: ContractDto) =>
                    type === ContractType.landlord_mineowner &&
                    status === ContractStatus.active
            )?.[0];
        }
    );

forward({
    from: UnsetupMineGate.open,
    to: getContractsEffect,
});

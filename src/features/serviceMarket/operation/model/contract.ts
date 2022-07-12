import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { getTableData } from 'shared';
import {
    ContractDto,
    getContractConfig,
    mapSearchParamForIndexPositionToFindContracts,
} from 'entities/smartcontract';

export const ContractGate = createGate<{
    searchParam: string;
}>('ContractGate');

export const getContractEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) =>
        getTableData(
            getContractConfig({
                searchParam,
                searchIdentification:
                    mapSearchParamForIndexPositionToFindContracts.contractId,
                limit: 1,
            })
        )
);

export const contractStore = createStore<ContractDto[] | null>(null).on(
    getContractEffect.doneData,
    (_, { rows }) => rows
);

forward({
    from: ContractGate.open,
    to: getContractEffect,
});

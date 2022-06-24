import { createGate } from 'effector-react';
import { createEffect, createStore, forward } from 'effector';
import { getTableData, uniqBy } from 'shared';
import {
    ContractDto,
    getContractsNameConfig,
    mapSearchParamForIndexPositionToFindContracts,
} from 'entities/smartcontract';

export const ContractsGate = createGate<{ searchParam: string }>(
    'ContractsGate'
);

export const getContractsEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) =>
        Promise.all([
            getTableData(
                getContractsNameConfig(
                    searchParam,
                    mapSearchParamForIndexPositionToFindContracts.executorId,
                    150
                )
            ),
            getTableData(
                getContractsNameConfig(
                    searchParam,
                    mapSearchParamForIndexPositionToFindContracts.clientId,
                    150
                )
            ),
        ])
);

export const contractsStore = createStore<null | ContractDto[]>(null).on(
    getContractsEffect.doneData,
    (_, [ownerContracts, clientContracts]) =>
        uniqBy([...ownerContracts.rows, ...clientContracts.rows], 'id')
);

forward({
    from: ContractsGate.open,
    to: getContractsEffect,
});

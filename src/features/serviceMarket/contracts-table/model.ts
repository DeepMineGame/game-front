import { createGate } from 'effector-react';
import {
    attach,
    createEffect,
    createEvent,
    createStore,
    forward,
} from 'effector';
import { getTableData, uniqBy } from 'shared';
import {
    ContractDto,
    getContractsNameConfig,
    mapSearchParamForIndexPositionToFindContracts,
} from 'entities/smartcontract';
import {
    FilterOrderStatus,
    getOrders,
    GetOrdersParams,
} from 'entities/gameStat';
import { userStore } from 'entities/user';

export const ContractsGate = createGate<{ searchParam: string }>(
    'ContractsGate'
);
export const changeFilterEvent = createEvent<GetOrdersParams>();

export const filterStore = createStore<GetOrdersParams>({
    status: FilterOrderStatus.Current,
}).on(changeFilterEvent, (_state, filter) => filter);

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

export const getContractsByFilterEffect = createEffect(getOrders);

export const contractsStore = createStore<null | ContractDto[]>(null)
    .on(getContractsEffect.doneData, (_, [ownerContracts, clientContracts]) =>
        uniqBy([...ownerContracts.rows, ...clientContracts.rows], 'id')
    )
    .on(getContractsByFilterEffect.doneData, (_, data) => data);

forward({
    from: ContractsGate.open,
    to: getContractsEffect,
});

forward({
    from: changeFilterEvent,
    to: attach({
        effect: getContractsByFilterEffect,
        source: userStore,
        mapParams: (params, user) => ({ ...params, user: user?.wax_address! }),
    }),
});

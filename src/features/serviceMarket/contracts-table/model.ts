import { createGate } from 'effector-react';
import {
    attach,
    createEffect,
    createEvent,
    createStore,
    forward,
} from 'effector';
import { ContractDto } from 'entities/smartcontract';
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

export const getContractsByFilterEffect = createEffect(getOrders);

export const contractsStore = createStore<null | ContractDto[]>(null).on(
    getContractsByFilterEffect.doneData,
    (_, data) => data
);

forward({
    from: ContractsGate.open,
    to: attach({
        effect: getContractsByFilterEffect,
        source: [filterStore, userStore],
        mapParams: (params, [filters, user]) => ({
            ...filters,
            user: user?.wax_address,
        }),
    }),
});

forward({
    from: changeFilterEvent,
    to: attach({
        effect: getContractsByFilterEffect,
        source: userStore,
        mapParams: (params, user) => ({ ...params, user: user?.wax_address! }),
    }),
});

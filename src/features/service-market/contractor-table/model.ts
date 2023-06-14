import { createGate } from 'effector-react';
import { createEffect, createEvent, createStore, forward } from 'effector';
import { persist } from 'effector-storage/local';
import { ContractDto } from 'entities/smartcontract';
import { getMarketOrders, GetMarketOrdersParams } from 'entities/game-stat';

export const ContractsGate = createGate<GetMarketOrdersParams>('ContractsGate');
export const changeFilterEvent = createEvent<GetMarketOrdersParams>();

export const filterStore = createStore<GetMarketOrdersParams>({}).on(
    changeFilterEvent,
    (_state, filter) => filter
);
persist({ store: filterStore, key: 'service market filter store' });
export const getContractsByFilterEffect = createEffect(getMarketOrders);

export const contractsStore = createStore<null | ContractDto[]>(null)
    .on(getContractsByFilterEffect.doneData, (_, data) => data)
    .on(getContractsByFilterEffect.fail, () => null);

forward({
    from: ContractsGate.open,
    to: changeFilterEvent,
});

forward({
    from: changeFilterEvent,
    to: getContractsByFilterEffect,
});

import { createGate } from 'effector-react';
import { createEffect, createEvent, createStore, forward } from 'effector';
import { ContractDto } from 'entities/smartcontract';
import { getMyOrders, ServiceMarketMyOrdersFilter } from 'entities/game-stat';

export const MyContractsGate =
    createGate<ServiceMarketMyOrdersFilter>('ContractsGate');
export const changeMyContractsFilterEvent =
    createEvent<ServiceMarketMyOrdersFilter>();

export const getMyContractsByFilterEffect = createEffect(getMyOrders);

export const myContractsStore = createStore<null | ContractDto[]>(null)
    .on(getMyContractsByFilterEffect.doneData, (_, data) => data)
    .on(getMyContractsByFilterEffect.fail, () => null);

forward({
    from: MyContractsGate.open,
    to: changeMyContractsFilterEvent,
});

forward({
    from: changeMyContractsFilterEvent,
    to: getMyContractsByFilterEffect,
});

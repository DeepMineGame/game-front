import { createGate } from 'effector-react';
import { createEffect, createEvent, createStore, forward } from 'effector';
import { DAY_IN_SECONDS } from 'shared';
import { ContractDto } from 'entities/smartcontract';
import { getMarketOrders, GetMarketOrdersParams } from 'entities/gameStat';

export const MONTH_IN_SECONDS = DAY_IN_SECONDS * 30;

export const ContractsGate = createGate<GetMarketOrdersParams>('ContractsGate');
export const changeFilterEvent = createEvent<GetMarketOrdersParams>();

export const filterStore = createStore<GetMarketOrdersParams>({}).on(
    changeFilterEvent,
    (_state, filter) => filter
);

export const getContractsByFilterEffect = createEffect(getMarketOrders);

export const contractsStore = createStore<null | ContractDto[]>(null)
    .on(getContractsByFilterEffect.doneData, (_, data) =>
        data.filter((order) => {
            if (order.executor && order.client) return true;

            return Date.now() / 1000 - order.create_time < MONTH_IN_SECONDS;
        })
    )
    .on(getContractsByFilterEffect.fail, () => null);

forward({
    from: ContractsGate.open,
    to: changeFilterEvent,
});

forward({
    from: changeFilterEvent,
    to: getContractsByFilterEffect,
});

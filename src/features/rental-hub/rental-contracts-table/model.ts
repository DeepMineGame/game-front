import { createGate } from 'effector-react';
import { createEffect, createEvent, createStore, forward } from 'effector';
import { persist } from 'effector-storage/local';
import { ContractDto } from 'entities/smartcontract';
import { getRentOrders } from 'entities/rent-market-api';

export type GetRentOrdersParams = {
    user?: string;
    offers?: boolean;
    my_contracts?: boolean;
};
export const RentalContractsGate =
    createGate<GetRentOrdersParams>('ContractsGate');
export const changeRentalFilterEvent = createEvent<GetRentOrdersParams>();

export const filterStore = createStore<GetRentOrdersParams>({}).on(
    changeRentalFilterEvent,
    (_state, filter) => filter
);
persist({ store: filterStore, key: 'rental market filter store' });
export const getRentContractsByFilterEffect = createEffect(getRentOrders);

export const rentContractsStore = createStore<null | ContractDto[]>(null)
    .on(getRentContractsByFilterEffect.doneData, (_, data) => data)
    .on(getRentContractsByFilterEffect.fail, () => null);

forward({
    from: RentalContractsGate.open,
    to: changeRentalFilterEvent,
});

forward({
    from: changeRentalFilterEvent,
    to: getRentContractsByFilterEffect,
});

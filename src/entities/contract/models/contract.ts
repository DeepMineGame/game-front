import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { ContractDto } from 'entities/smartcontract';
import { getOrder } from '../api';
import { getRentOrder } from '../../rent-market-api';

export enum OperationPageType {
    rentalHub,
    serviceMarket,
}

type ContractGateProps = {
    id: string;
    accountName: string;
    type: OperationPageType;
};
export const ContractGate = createGate<ContractGateProps>('ContractGate');

export const getContractEffect = createEffect(
    ({ id, accountName, type }: ContractGateProps) =>
        type === OperationPageType.serviceMarket
            ? getOrder({ id, accountName })
            : getRentOrder({ id })
);

export const contractStore = createStore<ContractDto | null>(null).on(
    getContractEffect.doneData,
    (_, contract) => contract
);

forward({
    from: ContractGate.open,
    to: getContractEffect,
});

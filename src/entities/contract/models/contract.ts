import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { ContractDto } from 'entities/smartcontract';
import { getOrder } from '../api';

export const ContractGate = createGate<{
    id: string;
    accountName: string;
}>('ContractGate');

export const getContractEffect = createEffect(getOrder);

export const contractStore = createStore<ContractDto | null>(null).on(
    getContractEffect.doneData,
    (_, contract) => contract
);

forward({
    from: ContractGate.open,
    to: getContractEffect,
});

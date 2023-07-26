import { createGate } from 'effector-react';
import { forward } from 'effector';
import {
    getAreaByOwnerEffect,
    getContractByExecutorEffect,
    getInventoryEffect,
    getMinesByOwnerEffect,
} from './effects';

export * from './rent-inventory-model';

export enum Role {
    engineer,
    citizen,
}

export const CreateOrderGate = createGate<{ searchParam: string }>(
    'CreateOrderGate'
);

forward({
    from: CreateOrderGate.open,
    to: [
        getMinesByOwnerEffect,
        getAreaByOwnerEffect,
        getContractByExecutorEffect,
        getInventoryEffect,
    ],
});

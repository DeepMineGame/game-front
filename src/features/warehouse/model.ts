import { createGate } from 'effector-react';
import { createEffect, createStore, forward } from 'effector';
import { getAtomicAssetsByUser } from 'entities/atomicassets';
import { UserInventoryType } from 'entities/smartcontract';

export const WarehouseGate = createGate<{ accountName: string }>(
    'warehouseGate'
);
export const getAtomicAssetsEffect = createEffect(getAtomicAssetsByUser);

export const userAtomicAssetsStore = createStore<UserInventoryType[]>([]).on(
    getAtomicAssetsEffect.doneData,
    (state, payload) => payload
);

forward({
    from: WarehouseGate.open,
    to: getAtomicAssetsEffect,
});

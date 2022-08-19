import { createGate } from 'effector-react';
import { createEffect, createStore, forward } from 'effector';
import {
    inventoryTableDataConfig,
    UserInventoryType,
} from 'entities/smartcontract';
import { getAtomicAssetsByUser } from 'entities/atomicassets';

export const InventoryGate = createGate<{ searchParam: string }>(
    'InventoryGate'
);
const getActiveInventory = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return inventoryTableDataConfig({ searchParam });
    }
);
export const activeUserInventoryStore = createStore<UserInventoryType[] | null>(
    null
).on(getActiveInventory.doneData, (_, { rows }) => rows);

export const getAtomicAssetsEffect = createEffect(getAtomicAssetsByUser);

export const userAtomicAssetsStore = createStore<UserInventoryType[]>([]).on(
    getAtomicAssetsEffect.doneData,
    (state, payload) => payload
);

forward({
    from: InventoryGate.open,
    to: [getActiveInventory, getAtomicAssetsEffect],
});

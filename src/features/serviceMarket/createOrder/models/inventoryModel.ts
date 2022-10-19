import { createGate } from 'effector-react';
import { createEffect, createStore, forward } from 'effector';
import {
    getInventoryTableData,
    UserInventoryType,
} from 'entities/smartcontract';
import { getAtomicAssetsByUser } from 'entities/atomicassets';
import { getCertificate } from 'entities/engineer';

export const InventoryGate = createGate<{ searchParam: string }>(
    'InventoryGate'
);
const getActiveInventory = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getInventoryTableData({ searchParam });
    }
);
export const activeUserInventoryStore = createStore<UserInventoryType[] | null>(
    null
).on(getActiveInventory.doneData, (_, { rows }) => rows);

export const getAtomicAssetsByUserEffect = createEffect(getAtomicAssetsByUser);

export const $storage = createStore<UserInventoryType[]>([]).on(
    getAtomicAssetsByUserEffect.doneData,
    (state, payload) => payload
);

export const $hasActiveInventory = activeUserInventoryStore.map(
    (activeInventory) => !!activeInventory?.length
);

export const $hasEngineerCertificate = activeUserInventoryStore.map(
    (activeInventory) => !!getCertificate(activeInventory || [])
);

forward({
    from: InventoryGate.open,
    to: [getActiveInventory, getAtomicAssetsByUserEffect],
});

import { createGate } from 'effector-react';
import { createEffect, createStore, forward } from 'effector';
import {
    inventoryTableDataConfig,
    UserInventoryType,
} from 'entities/smartcontract';

export const MineSelectGate = createGate<{ searchParam: string }>(
    'MineSelectGate'
);
const getInventory = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return inventoryTableDataConfig({ searchParam });
    }
);
export const userInventoryStore = createStore<UserInventoryType[] | null>(
    null
).on(getInventory.doneData, (_, { rows }) => rows);

forward({
    from: MineSelectGate.open,
    to: getInventory,
});

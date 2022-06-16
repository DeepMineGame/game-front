import { createEvent, createStore, forward, createEffect } from 'effector';

import { createGate } from 'effector-react';
import { authDeepMineUserEffect } from 'features';
import { fetchDmeBalance, fetchWaxBalance } from 'features/balances';
import {
    getInventoriesEffect,
    getRolesEffect,
    getSmartContractUserEffect,
} from '../../smartcontract';
import { User } from './type';

export const clearUserStoreEvent = createEvent('clearUserStore');

export const userStore = createStore<User | null>(null)
    .on(authDeepMineUserEffect.doneData, (_, user) => user)
    .reset(clearUserStoreEvent);

export const userStoreError = createStore<Error | null>(null)
    .on(authDeepMineUserEffect.failData, (_, error) => error)
    .reset(clearUserStoreEvent);

const fetchWaxBalanceEffect = createEffect(fetchWaxBalance);
const fetchDmeBalanceEffect = createEffect(fetchDmeBalance);

export const balancesStore = createStore({ dmeBalance: '', waxBalance: '' })
    .on(fetchWaxBalanceEffect.doneData, (state, waxBalance) => ({
        ...state,
        waxBalance,
    }))
    .on(fetchDmeBalanceEffect.doneData, (state, dmeBalance) => ({
        ...state,
        dmeBalance,
    }));

export const UserGate = createGate<{ searchParam: string }>('UserGate');

forward({
    from: UserGate.open,
    to: [
        fetchWaxBalanceEffect,
        fetchDmeBalanceEffect,
        getSmartContractUserEffect,
        getRolesEffect,
        getInventoriesEffect,
    ],
});

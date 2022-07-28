import { createEvent, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import {
    getInventoriesEffect,
    getRolesEffect,
    getSmartContractUserEffect,
    getMinesByOwnerEffect,
    getContractorsEffect,
} from '../../smartcontract';
import {
    getUserFromSessionEffect,
    authUserFromGoogleEffect,
    logoutUserEffect,
    fetchWaxBalanceEffect,
    fetchDmeBalanceEffect,
    connectUserWithWaxAccountEffect,
} from './effects';
import { User } from './type';

export const setUserEvent = createEvent<User>();

export const userStore = createStore<User | null>(null)
    .on(getUserFromSessionEffect.doneData, (_, user) => user)
    .on(authUserFromGoogleEffect.doneData, (_, user) => user)
    .on(connectUserWithWaxAccountEffect.doneData, (_, user) => user)
    .on(setUserEvent, (_, user) => user)
    .on(logoutUserEffect.doneData, () => null);

export const userStoreError = createStore<Error | null>(null)
    .on(getUserFromSessionEffect.failData, (_, error) => error)
    .on(authUserFromGoogleEffect.failData, (_, error) => error)
    .on(logoutUserEffect.failData, (_, error) => error)
    .on(connectUserWithWaxAccountEffect.failData, (_, error) => error);

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
        getMinesByOwnerEffect,
        getContractorsEffect,
    ],
});

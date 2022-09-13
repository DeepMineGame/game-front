import { combine, createEffect, createStore, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import { getCertificate } from 'entities/engineer';
import {
    EngineerType,
    getEngineerTableData,
    getInventoryTableData,
    getSmartContractUserEffect,
    smartContractUserStore,
    UserInventoryType,
} from 'entities/smartcontract';

export const EngineerCabinGate = createGate<{ searchParam: string }>(
    'EngineerCabinGate'
);

export const getActiveInventoryEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getInventoryTableData({ searchParam });
    }
);

const userActiveInventoryStore = createStore<UserInventoryType[]>([]).on(
    getActiveInventoryEffect.doneData,
    (_, { rows }) => rows
);

const engineerCertificateStore = createStore<UserInventoryType | null>(null);

export const getEngineerByExecutorEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getEngineerTableData({ searchParam });
    }
);

export const engineerStore = createStore<EngineerType | null>(null).on(
    getEngineerByExecutorEffect.doneData,
    (_, { rows }) => rows?.[0] || null
);

forward({
    from: EngineerCabinGate.open,
    to: [
        getActiveInventoryEffect,
        getEngineerByExecutorEffect,
        getSmartContractUserEffect,
    ],
});

sample({
    source: userActiveInventoryStore,
    target: engineerCertificateStore,
    fn: (inventory) => getCertificate(inventory),
});

export const engineerCabinStore = combine(
    engineerStore,
    smartContractUserStore,
    engineerCertificateStore,
    (engineer, user, certificate) => ({
        user: user?.[0] || null,
        engineer,
        certificate,
    })
);

export const isEngineerCabinLoading = combine(
    getActiveInventoryEffect.pending,
    getEngineerByExecutorEffect.pending,
    getSmartContractUserEffect.pending,
    (...states) => states.some(Boolean)
);

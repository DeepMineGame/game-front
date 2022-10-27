import { combine, createEffect, createStore, forward, sample } from 'effector';
import { createGate } from 'effector-react';
import {
    $engineerContracts,
    getContractsExecutorEffect,
} from 'features/engineer';
import { getCertificate } from 'entities/engineer';
import {
    ActionDto,
    ActionType,
    EngineerType,
    getActionEffect,
    getEngineerTableData,
    getInventoryTableData,
    getSmartContractUserEffect,
    mapSearchParamForIndexPosition,
    smartContractUserStore,
    UserInventoryType,
} from 'entities/smartcontract';

const EngineerCabinGate = createGate<{ searchParam: string }>(
    'EngineerCabinGate'
);

const getActiveInventoryEffect = createEffect<
    {
        searchParam: string;
    },
    UserInventoryType[],
    Error
>(({ searchParam }) => getInventoryTableData({ searchParam }));

const $userActiveInventory = createStore<UserInventoryType[]>([]).on(
    getActiveInventoryEffect.doneData,
    (_, rows) => rows
);

const $certificate = createStore<UserInventoryType | null>(null);

const getEngineerByExecutorEffect = createEffect<
    {
        searchParam: string;
    },
    EngineerType[],
    Error
>(({ searchParam }) => getEngineerTableData({ searchParam }));

const $engineer = createStore<EngineerType | null>(null).on(
    getEngineerByExecutorEffect.doneData,
    (_, [engineer]) => engineer || null
);

const getActionByUserEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) =>
        getActionEffect({
            searchIdentification: mapSearchParamForIndexPosition.ownerUserId,
            searchParam,
        })
);

const $openSkillAction = createStore<ActionDto | null>(null).on(
    getActionEffect.doneData,
    (_, rows) => {
        const activeAction = rows?.find(
            ({ type, finishes_at }) =>
                type === ActionType.engineer_open_skill &&
                finishes_at * 1000 > Date.now()
        );

        return activeAction;
    }
);

forward({
    from: EngineerCabinGate.open,
    to: [
        getActiveInventoryEffect,
        getEngineerByExecutorEffect,
        getSmartContractUserEffect,
        getContractsExecutorEffect,
        getActionByUserEffect,
    ],
});

sample({
    source: $userActiveInventory,
    target: $certificate,
    fn: (inventory) => getCertificate(inventory),
});

const $engineerCabinStore = combine(
    $engineer,
    smartContractUserStore,
    $certificate,
    $engineerContracts,
    $openSkillAction,
    (engineer, user, certificate, contracts, openSkillAction) => ({
        user: user?.[0] || null,
        engineer,
        certificate,
        contracts,
        openSkillAction,
    })
);

const $isEngineerCabinLoading = combine(
    getActiveInventoryEffect.pending,
    getEngineerByExecutorEffect.pending,
    getSmartContractUserEffect.pending,
    getContractsExecutorEffect.pending,
    getActionByUserEffect.pending,
    (...loadings) => loadings.some(Boolean)
);

export {
    EngineerCabinGate,
    getActiveInventoryEffect,
    getEngineerByExecutorEffect,
    $engineerCabinStore,
    $isEngineerCabinLoading,
};

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
    { searchParam: string },
    { rows: UserInventoryType[] } | undefined
>(getInventoryTableData);

const $userActiveInventory = createStore<UserInventoryType[]>([]).on(
    getActiveInventoryEffect.doneData,
    (_, data) => data?.rows
);

const $certificate = createStore<UserInventoryType | null>(null);

const getEngineerByExecutorEffect = createEffect<
    { searchParam: string },
    { rows: EngineerType[] } | undefined
>(getEngineerTableData);

const $engineer = createStore<EngineerType | null>(null).on(
    getEngineerByExecutorEffect.doneData,
    (_, data) => data?.rows?.[0] || null
);

const getActionByUserEffect = createEffect<
    { searchParam: string },
    { rows: ActionDto[] } | undefined
>(({ searchParam }) =>
    getActionEffect({
        searchIdentification: mapSearchParamForIndexPosition.ownerUserId,
        searchParam,
    })
);

const $openSkillAction = createStore<ActionDto | null>(null).on(
    getActionEffect.doneData,
    (_, data) => {
        const activeAction = data?.rows?.find(
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

const $engineerCabin = combine(
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
    $engineerCabin,
    $isEngineerCabinLoading,
    $engineer,
    $userActiveInventory,
    getActionByUserEffect,
    $openSkillAction,
};

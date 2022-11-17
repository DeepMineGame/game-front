import {
    combine,
    createEffect,
    createEvent,
    createStore,
    forward,
} from 'effector';
import { createGate } from 'effector-react';
import { getTableData } from 'shared';
import {
    ContractDto,
    ContractType,
    getContractsNameConfig,
    mapSearchParamForIndexPositionToFindContracts,
} from 'entities/smartcontract';

export enum LevelUpgradeFilter {
    LookingForEngineer,
    LookingForCitizen,
}

// TODO: use common contracts gate
export const LevelUpgradeContractsGate = createGate();
export const levelUpgradeChangeFilterEvent = createEvent<LevelUpgradeFilter>();

export const getLevelUpgradeContractsEffect = createEffect<
    void,
    { rows: ContractDto[] }
>(() =>
    getTableData(
        getContractsNameConfig(
            ContractType.level_upgrade,
            mapSearchParamForIndexPositionToFindContracts.contractType,
            1000
        )
    )
);

export const levelUpgradeContractsStore = createStore<ContractDto[]>([]).on(
    getLevelUpgradeContractsEffect.doneData,
    (_, contracts) =>
        contracts.rows?.filter(
            (contract: ContractDto) => !contract.client || !contract.executor
        ) ?? []
);

export const levelUpgradeFilterStore = createStore<LevelUpgradeFilter>(
    LevelUpgradeFilter.LookingForCitizen
).on(levelUpgradeChangeFilterEvent, (_state, filter) => filter);

export const filteredLevelUpgradeContractsStore = combine(
    levelUpgradeContractsStore,
    levelUpgradeFilterStore,
    (contracts, filter) => {
        if (filter === LevelUpgradeFilter.LookingForCitizen) {
            return contracts.filter((contract) => !contract.client);
        }

        return contracts.filter((contract) => !contract.executor);
    }
);

forward({
    from: LevelUpgradeContractsGate.open,
    to: getLevelUpgradeContractsEffect,
});

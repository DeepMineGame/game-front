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

export enum Filter {
    LookingForEngineer,
    LookingForCitizen,
}

export const LevelUpgradeContractsGate = createGate();
export const changeFilterEvent = createEvent<Filter>();

export const getLevelUpgradeContractsEffect = createEffect(() =>
    getTableData(
        getContractsNameConfig(
            ContractType.citizen_engineer,
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

export const filterStore = createStore<Filter>(Filter.LookingForCitizen).on(
    changeFilterEvent,
    (_state, filter) => filter
);

export const filteredLevelUpgradeContractsStore = combine(
    levelUpgradeContractsStore,
    filterStore,
    (contracts, filter) => {
        if (filter === Filter.LookingForCitizen) {
            return contracts.filter((contract) => !contract.client);
        }

        return contracts.filter((contract) => !contract.executor);
    }
);

forward({
    from: LevelUpgradeContractsGate.open,
    to: getLevelUpgradeContractsEffect,
});

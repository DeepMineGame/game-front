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

export enum MiningContractsFilter {
    LookingForMineOwner,
    LookingForContractor,
}

// TODO: use common contracts gate
export const MiningContractsGate = createGate();
export const miningContractsChangeFilterEvent =
    createEvent<MiningContractsFilter>();

export const getMiningContractsEffect = createEffect(() =>
    getTableData(
        getContractsNameConfig(
            ContractType.mineowner_contractor,
            mapSearchParamForIndexPositionToFindContracts.contractType,
            150
        )
    )
);

export const miningContractsStore = createStore<ContractDto[]>([]).on(
    getMiningContractsEffect.doneData,
    (_, contracts) =>
        contracts.rows?.filter(
            (contract: ContractDto) => !contract.client || !contract.executor
        ) ?? []
);

export const miningContractsFilterStore = createStore<MiningContractsFilter>(
    MiningContractsFilter.LookingForMineOwner
).on(miningContractsChangeFilterEvent, (_state, filter) => filter);

export const filteredMiningContractsStore = combine(
    miningContractsStore,
    miningContractsFilterStore,
    (contracts, filter) => {
        if (filter === MiningContractsFilter.LookingForMineOwner) {
            return contracts.filter((contract) => !contract.client);
        }

        return contracts.filter((contract) => !contract.executor);
    }
);

forward({
    from: MiningContractsGate.open,
    to: getMiningContractsEffect,
});

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
    LookingForMineOwner,
    LookingForContractor,
}

export const MiningContractsGate = createGate();
export const changeFilterEvent = createEvent<Filter>();

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

export const filterStore = createStore<Filter>(Filter.LookingForMineOwner).on(
    changeFilterEvent,
    (_state, filter) => filter
);

export const filteredMiningContractsStore = combine(
    miningContractsStore,
    filterStore,
    (contracts, filter) => {
        if (filter === Filter.LookingForMineOwner) {
            return contracts.filter((contract) => !contract.client);
        }

        return contracts.filter((contract) => !contract.executor);
    }
);

forward({
    from: MiningContractsGate.open,
    to: getMiningContractsEffect,
});

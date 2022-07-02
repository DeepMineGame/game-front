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
    ContractStatus,
    ContractDto,
    ContractType,
    getContractsNameConfig,
    mapSearchParamForIndexPositionToFindContracts,
} from 'entities/smartcontract';

export enum Filter {
    LookingForMineOwner = 'Looking for Mine owner',
    LookingForContractor = 'Looking for Contractor',
}

export const MiningContractsGate = createGate('MiningContractsGate');
export const changeFilterEvent = createEvent<Filter>();

export const getMiningContractsEffect = createEffect(() =>
    getTableData(
        getContractsNameConfig(
            '',
            mapSearchParamForIndexPositionToFindContracts.clientId,
            150
        )
    )
);

export const miningContractsStore = createStore<ContractDto[]>([]).on(
    getMiningContractsEffect.doneData,
    (_, contracts) =>
        contracts.rows?.filter(
            (contract: ContractDto) =>
                contract.type === ContractType.mineowner_contractor &&
                (!contract.client || !contract.executor)
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
            return contracts.filter(
                (contract) =>
                    contract.status === ContractStatus.signed_by_executor
            );
        }

        return contracts.filter(
            (contract) => contract.status === ContractStatus.signed_by_client
        );
    }
);

forward({
    from: MiningContractsGate.open,
    to: getMiningContractsEffect,
});

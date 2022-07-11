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
    getContractsNameConfig,
    mapSearchParamForIndexPositionToFindContracts,
} from 'entities/smartcontract';

export enum Filter {
    LookingForMineOwner,
    LookingForLandlord,
}

export const MineOperationContractsGate = createGate();
export const changeFilterEvent = createEvent<Filter>();

export const getMineOperationContractsEffect = createEffect(() =>
    getTableData(
        getContractsNameConfig(
            1,
            mapSearchParamForIndexPositionToFindContracts.contractType,
            150
        )
    )
);

export const mineOperationContractsStore = createStore<ContractDto[]>([]).on(
    getMineOperationContractsEffect.doneData,
    (_, contracts) =>
        contracts.rows?.filter(
            (contract: ContractDto) => !contract.client || !contract.executor
        ) ?? []
);

export const filterStore = createStore<Filter>(Filter.LookingForMineOwner).on(
    changeFilterEvent,
    (_state, filter) => filter
);

export const filteredMineOperationContractsStore = combine(
    mineOperationContractsStore,
    filterStore,
    (contracts, filter) => {
        if (filter === Filter.LookingForMineOwner) {
            return contracts.filter((contract) => !contract.executor);
        }

        return contracts.filter((contract) => !contract.client);
    }
);

forward({
    from: MineOperationContractsGate.open,
    to: getMineOperationContractsEffect,
});

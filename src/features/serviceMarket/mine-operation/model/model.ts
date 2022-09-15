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

export enum MineOperationFilter {
    LookingForMineOwner,
    LookingForLandlord,
}

// TODO: use common contracts gate
export const MineOperationContractsGate = createGate();
export const mineOperationChangeFilterEvent =
    createEvent<MineOperationFilter>();

export const getMineOperationContractsEffect = createEffect(() =>
    getTableData(
        getContractsNameConfig(
            ContractType.landlord_mineowner,
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

export const mineOperationFilterStore = createStore<MineOperationFilter>(
    MineOperationFilter.LookingForMineOwner
).on(mineOperationChangeFilterEvent, (_state, filter) => filter);

export const filteredMineOperationContractsStore = combine(
    mineOperationContractsStore,
    mineOperationFilterStore,
    (contracts, filter) => {
        if (filter === MineOperationFilter.LookingForMineOwner) {
            return contracts.filter((contract) => !contract.executor);
        }

        return contracts.filter((contract) => !contract.client);
    }
);

forward({
    from: MineOperationContractsGate.open,
    to: getMineOperationContractsEffect,
});

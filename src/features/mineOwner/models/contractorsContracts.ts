import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { ContractDto, ContractType } from 'entities/smartcontract';
import { FilterOrderStatus, getOrders, Role } from 'entities/gameStat';

export const MiningContractsGate = createGate<{
    searchParam: string;
}>('ContractGate');

export const getMiningContractsFx = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getOrders({
            userRole: Role.mineowner,
            status: FilterOrderStatus.current,
            user: searchParam,
        });
    }
);

export const $MiningContracts = createStore<ContractDto[]>([]).on(
    getMiningContractsFx.doneData,
    (_, contracts) =>
        contracts.filter(
            (contract) => contract.type === ContractType.mineowner_contractor
        )
);

forward({
    from: MiningContractsGate.open,
    to: getMiningContractsFx,
});

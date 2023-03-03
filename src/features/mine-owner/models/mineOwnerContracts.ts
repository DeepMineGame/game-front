import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { ContractDto, ContractType } from 'entities/smartcontract';
import { FilterOrderStatus, getOrders, Role } from 'entities/game-stat';

export const MineOwnerContractsGate = createGate<{
    searchParam: string;
}>('ContractGate');

export const getMineOwnerContractsFx = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getOrders({
            userRole: Role.mineowner,
            status: FilterOrderStatus.current,
            user: searchParam,
        });
    }
);

export const $MineOwnerContracts = createStore<ContractDto[]>([]).on(
    getMineOwnerContractsFx.doneData,
    (_, contracts) =>
        contracts.filter(
            (contract) => contract.type === ContractType.landlord_mineowner
        )
);

forward({
    from: MineOwnerContractsGate.open,
    to: getMineOwnerContractsFx,
});

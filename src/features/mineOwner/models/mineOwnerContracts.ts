import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { ContractDto } from 'entities/smartcontract';
import { FilterOrderStatus, getOrders, Role } from 'entities/gameStat';

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
    (_, contracts) => contracts
);

forward({
    from: MineOwnerContractsGate.open,
    to: getMineOwnerContractsFx,
});

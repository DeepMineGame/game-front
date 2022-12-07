import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { ContractDto } from 'entities/smartcontract';
import { FilterOrderStatus, getOrders, Role } from 'entities/gameStat';

export const ContractorContractsGate = createGate<{
    searchParam: string;
}>('ContractGate');

export const getLandlordContractsFX = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getOrders({
            userRole: Role.mineowner,
            status: FilterOrderStatus.current,
            user: searchParam,
        });
    }
);

export const $ContractorContracts = createStore<ContractDto[]>([]).on(
    getLandlordContractsFX.doneData,
    (_, contracts) => contracts
);

forward({
    from: ContractorContractsGate.open,
    to: getLandlordContractsFX,
});

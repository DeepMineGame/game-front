import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { ContractDto } from 'entities/smartcontract';
import { FilterOrderStatus, getOrders, Role } from 'entities/gameStat';

export const ContractorContractsGate = createGate<{
    searchParam: string;
}>('ContractGate');

export const getContractContractsFx = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getOrders({
            userRole: Role.contractor,
            status: FilterOrderStatus.current,
            user: searchParam,
        });
    }
);

export const $ContractorContracts = createStore<ContractDto[]>([]).on(
    getContractContractsFx.doneData,
    (_, contracts) => contracts
);

forward({
    from: ContractorContractsGate.open,
    to: getContractContractsFx,
});

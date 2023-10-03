import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { ContractDto, ContractType } from 'entities/smartcontract';
import { getMarketOrders, OrderStatus, Roles } from 'entities/game-stat';

export const MineOwnerContractsGate = createGate<{
    searchParam: string;
}>('ContractGate');

export const getMineOwnerContractsFx = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getMarketOrders({
            user_role: Roles.landlord,
            statuses: OrderStatus.current,
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

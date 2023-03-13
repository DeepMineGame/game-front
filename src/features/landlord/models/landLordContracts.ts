import { createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { ContractDto, ContractType } from 'entities/smartcontract';

import { getMyOrders } from 'entities/game-stat';

export const LandlordContractsGate = createGate<{ searchParam: string }>(
    'LandlordContractsGate'
);
export const getLandLordContractsEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getMyOrders({
            user: searchParam,
        });
    }
);

export const $LandlordContracts = createStore<ContractDto[]>([]).on(
    getLandLordContractsEffect.doneData,
    (_, contracts) =>
        contracts?.filter(
            ({ type }) => type === ContractType.landlord_mineowner
        )
);

forward({
    from: LandlordContractsGate.open,
    to: getLandLordContractsEffect,
});

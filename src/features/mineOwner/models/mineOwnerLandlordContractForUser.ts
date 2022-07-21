import { createEffect, createStore } from 'effector';
import { getTableData } from 'shared';
import {
    ContractDto,
    ContractType,
    getContractsNameConfig,
    mapSearchParamForIndexPositionToFindContracts,
} from 'entities/smartcontract';

export const getContractEffectByExecutor = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getTableData(
            getContractsNameConfig(
                searchParam,
                mapSearchParamForIndexPositionToFindContracts.executorId,
                1000
            )
        );
    }
);
export const mineOwnerLandlordContractForUserStore = createStore<
    ContractDto | null | undefined
>(null).on(
    getContractEffectByExecutor.doneData,
    (_, { rows }) =>
        rows
            ?.filter(
                ({ type }: ContractDto) =>
                    type === ContractType.landlord_mineowner
            )
            ?.reverse()[0]
);

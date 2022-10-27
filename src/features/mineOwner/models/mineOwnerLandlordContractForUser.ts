import { createEffect, createStore } from 'effector';
import { getTableData } from 'shared';
import {
    ContractDto,
    ContractStatus,
    ContractType,
    getContractsNameConfig,
    mapSearchParamForIndexPositionToFindContracts,
} from 'entities/smartcontract';

export const getContractEffectByExecutor = createEffect<
    {
        searchParam: string;
    },
    ContractDto[],
    Error
>(({ searchParam }) =>
    getTableData(
        getContractsNameConfig(
            searchParam,
            mapSearchParamForIndexPositionToFindContracts.executorId,
            1000
        )
    )
);

export const mineOwnerLandlordContractForUserStore =
    createStore<ContractDto | null>(null).on(
        getContractEffectByExecutor.doneData,
        (_, rows) =>
            rows?.find(
                ({ type, status }: ContractDto) =>
                    type === ContractType.landlord_mineowner &&
                    status === ContractStatus.active
            ) || null
    );

import { createEffect, createEvent } from 'effector';
import { getTableData } from 'shared';
import {
    ContractDto,
    getContractsNameConfig,
    getHistoryConfig,
    getUserConfig,
    mapSearchParamForIndexPositionToFindContracts,
} from 'entities/smartcontract';

export const setMiningOverEvent = createEvent<boolean>();

export const getLandlordContractsEffect = createEffect<
    { searchParam: string },
    { rows: ContractDto[] },
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

export const getUserContractsEffect = createEffect(
    ({ searchParam }: { searchParam: string }) =>
        getTableData(
            getContractsNameConfig(
                searchParam,
                mapSearchParamForIndexPositionToFindContracts.executorId,
                1000
            )
        )
);

export const getUserHistoryEffect = createEffect(
    ({ searchParam }: { searchParam: string }) =>
        getTableData(getHistoryConfig(searchParam))
);

export const getUserInfoEffect = createEffect(
    ({ searchParam }: { searchParam: string }) =>
        getTableData(getUserConfig(searchParam))
);

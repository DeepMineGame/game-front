import { createEffect, createEvent } from 'effector';
import { getTableData } from 'shared';
import {
    ContractDto,
    getContractsNameConfig,
    getHistoryConfig,
    getUserConfig,
    mapSearchParamForIndexPositionToFindContracts,
    UserHistoryType,
    UserInfoType,
} from 'entities/smartcontract';
import { getLastMiningStatus } from './api';

export const setMiningOverEvent = createEvent<boolean>();

export const getLandlordContractsEffect = createEffect<
    { searchParam: string },
    { rows: ContractDto[] }
>(({ searchParam }) =>
    getTableData(
        getContractsNameConfig(
            searchParam,
            mapSearchParamForIndexPositionToFindContracts.executorId,
            1000
        )
    )
);

export const getUserContractsEffect = createEffect<
    { searchParam: string },
    { rows: ContractDto[] }
>(({ searchParam }) =>
    getTableData(
        getContractsNameConfig(
            searchParam,
            mapSearchParamForIndexPositionToFindContracts.executorId,
            1000
        )
    )
);

export const getUserHistoryEffect = createEffect<
    { searchParam: string },
    { rows: UserHistoryType[] }
>(({ searchParam }) => getTableData(getHistoryConfig(searchParam)));

export const getUserInfoEffect = createEffect<
    { searchParam: string },
    { rows: UserInfoType[] }
>(({ searchParam }) => getTableData(getUserConfig(searchParam)));

export const getLastMiningStatusEffect = createEffect(getLastMiningStatus);

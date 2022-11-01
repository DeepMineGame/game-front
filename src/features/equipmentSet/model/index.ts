import { createGate } from 'effector-react';
import { createEffect, createStore, forward } from 'effector';
import { getTableData } from 'shared';
import {
    ContractDto,
    ContractorDto,
    ContractStatus,
    ContractType,
    getContractorsTableData,
    getContractsNameConfig,
    getInventoriesEffect,
    mapSearchParamForIndexPositionToFindContracts,
} from 'entities/smartcontract';

export const EquipmentSetGate = createGate<{ searchParam: string }>(
    'EquipmentSetGate'
);

const getContractsEffect = createEffect<
    {
        searchParam: string;
    },
    { rows: ContractDto[] },
    Error
>(({ searchParam }) =>
    getTableData(
        getContractsNameConfig(
            searchParam,
            mapSearchParamForIndexPositionToFindContracts.executorId,
            10000
        )
    )
);

export const getContractorsEffect = createEffect<
    {
        searchParam: string;
    },
    { rows: ContractorDto[] },
    Error
>(({ searchParam }) =>
    getContractorsTableData({
        searchParam,
    })
);

export const contractorContractIdStore = createStore<null | number>(null).on(
    getContractsEffect.doneData,
    (_, { rows: userContracts }) =>
        userContracts.find(
            ({ status, type }: ContractDto) =>
                type === ContractType.mineowner_contractor &&
                status === ContractStatus.active
        )?.id
);

export const contractorsStore = createStore<ContractorDto[] | null>(null).on(
    getContractorsEffect.doneData,
    (_, { rows }) => rows
);

forward({
    from: EquipmentSetGate.open,
    to: [getContractsEffect, getContractorsEffect, getInventoriesEffect],
});

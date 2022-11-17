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
    { searchParam: string },
    { rows: ContractDto[] } | undefined
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
    { searchParam: string },
    { rows: ContractorDto[] } | undefined
>(getContractorsTableData);

export const contractorContractIdStore = createStore<null | number>(null).on(
    getContractsEffect.doneData,
    (_, data) =>
        data?.rows?.find(
            ({ status, type }: ContractDto) =>
                type === ContractType.mineowner_contractor &&
                status === ContractStatus.active
        )?.id
);

export const contractorsStore = createStore<ContractorDto[] | null>(null).on(
    getContractorsEffect.doneData,
    (_, data) => data?.rows
);

forward({
    from: EquipmentSetGate.open,
    to: [getContractsEffect, getContractorsEffect, getInventoriesEffect],
});

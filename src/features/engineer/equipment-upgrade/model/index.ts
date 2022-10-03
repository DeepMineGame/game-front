import { createEffect, createStore, sample } from 'effector';

import { AssetDataType, getAtomicAssetsDataById } from 'entities/atomicassets';
import { FilterOrderStatus, getOrders, Role } from 'entities/gameStat';
import { ContractDto, ContractType } from 'entities/smartcontract';

const getContractsExecutorEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getOrders({
            userRole: Role.engineer,
            status: FilterOrderStatus.current,
            user: searchParam,
        });
    }
);

const getEquipmentByIdEffect = createEffect(async (searchParam: string) =>
    getAtomicAssetsDataById(searchParam)
);

const $engineerContracts = createStore<ContractDto[]>([]).on(
    getContractsExecutorEffect.doneData,
    (_, contracts) =>
        contracts.filter(
            (contract) => contract.type === ContractType.level_upgrade
        )
);

sample({
    source: $engineerContracts,
    target: getEquipmentByIdEffect,
    fn: (contracts) =>
        contracts?.find((contract) => !contract.deleted_at)?.client_asset_id ||
        '',
    filter: (contracts) =>
        !!contracts.find((contract) => !contract.deleted_at)?.client_asset_id,
});

const $equipment = createStore<AssetDataType | null>(null).on(
    getEquipmentByIdEffect.doneData,
    (_, data) => data || null
);

export {
    $equipment,
    $engineerContracts,
    getEquipmentByIdEffect,
    getContractsExecutorEffect,
};
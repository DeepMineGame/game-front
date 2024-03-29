import { createEffect, createStore, sample } from 'effector';

import { AssetDataType, getAssets } from 'entities/atomicassets';
import { getMarketOrders, OrderStatus, Roles } from 'entities/game-stat';
import {
    ContractDto,
    ContractStatus,
    ContractType,
} from 'entities/smartcontract';
import { getContractWithoutReport } from '../lib';

const getContractsExecutorEffect = createEffect(
    async ({ searchParam }: { searchParam: string }) => {
        return getMarketOrders({
            user_role: Roles.engineer,
            statuses: OrderStatus.current,
            user: searchParam,
        });
    }
);

const getEquipmentByIdEffect = createEffect<
    string,
    AssetDataType[] | undefined
>((assets) => getAssets(assets.split(',')));

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
    fn: (contracts) => {
        const withoutReport = getContractWithoutReport(contracts);
        if (withoutReport?.attrs.find(({ key }) => key === 'asset_ids')) {
            return (
                withoutReport.attrs?.find(({ key }) => key === 'asset_ids')
                    ?.value || ''
            );
        }

        return (
            contracts
                ?.find(
                    (contract) =>
                        !contract.deleted_at &&
                        contract.status === ContractStatus.active
                )
                ?.attrs?.find(({ key }) => key === 'asset_ids')?.value || ''
        );
    },
    filter: (contracts) => {
        const withoutReport = getContractWithoutReport(contracts);
        if (withoutReport) {
            return !!withoutReport?.attrs?.find(
                ({ key }) => key === 'asset_ids'
            )?.value;
        }

        return !!contracts
            .find((contract) => !contract.deleted_at)
            ?.attrs?.find(({ key }) => key === 'asset_ids')?.value;
    },
});

const $equipment = createStore<AssetDataType[] | null>(null).on(
    getEquipmentByIdEffect.doneData,
    (_, data) => data || null
);

export {
    $equipment,
    $engineerContracts,
    getEquipmentByIdEffect,
    getContractsExecutorEffect,
};

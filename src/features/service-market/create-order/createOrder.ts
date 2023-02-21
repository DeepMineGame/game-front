import { DAY_IN_SECONDS, HOUR_IN_SECONDS } from 'shared';
import { deepminesmrt } from 'entities/smartcontract';
import { BaseOrder, LevelUpgradeOrder, MineOrder } from 'entities/order';

const getBaseFields = (orderData: BaseOrder) => {
    const isClient = Boolean(orderData.is_client);
    const assetId = Number(orderData.opt_asset_id);

    return {
        wax_user: orderData.wax_user,
        opt_client: orderData.opt_client,
        opt_executor: orderData.opt_executor,
        opt_asset_id: Number.isNaN(assetId) ? undefined : assetId,
        is_client: isClient,
        penalty_amount: Number(orderData.penalty_amount || 0) * 10 ** 8,
        deadline_duration:
            orderData.deadline_duration_in_days * DAY_IN_SECONDS +
            orderData.deadline_duration_in_hours * HOUR_IN_SECONDS,
    };
};

export const createMineOrder = (orderData: MineOrder) => {
    return {
        actions: [
            {
                account: deepminesmrt,
                name: 'crtcontype1',
                authorization: [
                    {
                        actor: orderData.wax_user,
                        permission: 'active',
                    },
                ],
                data: {
                    ...getBaseFields(orderData),
                    contract_type: orderData.contract_type,
                    fee_percent: Number(orderData.fee_percent),
                    contract_duration:
                        orderData.contract_duration * DAY_IN_SECONDS,
                    opt_level: orderData.opt_level ?? null,
                    opt_rarity: orderData.opt_rarity ?? null,
                },
            },
        ],
    };
};

export const createLevelUpgradeOrder = (orderData: LevelUpgradeOrder) => {
    return {
        actions: [
            {
                account: deepminesmrt,
                name: 'crtcontype2',
                authorization: [
                    {
                        actor: orderData.wax_user,
                        permission: 'active',
                    },
                ],
                data: {
                    ...getBaseFields(orderData),
                    opt_schema_type: orderData.opt_schema_type,
                    opt_level: orderData.opt_level,
                    opt_rarity: orderData.opt_rarity,
                    cost_of_execution: Number(orderData.cost_of_execution),
                },
            },
        ],
    };
};

import { addDaysToCurrentDateUnixTime } from 'shared';
import { deepminegame } from '../../constants';
import { ContractType } from '../../tables';

export const createContrFormFields = {
    contractType: 'contract_type' as const,
    isClient: 'is_client' as const,
    assetId: 'asset_id' as const,
    fee: 'fee_percent' as const,
    deadlineTime: 'deadline_time' as const,
    finishesAt: 'finishes_at' as const,
    daysForPenalty: 'days_for_penalty' as const,
    feeDailyMinAmount: 'fee_daily_min_amount' as const,
    penaltyAmount: 'penalty_amount' as const,
};

export type CreateContrDto = {
    wax_user: string;
    contract_type: ContractType;
    asset_id: number;
    is_client: 0 | 1;
    client: string;
    executor: string;
    fee_percent: number;
    fee_daily_min_amount: number;
    days_for_penalty: number;
    penalty_amount: number;
    deadline_time: number;
    finishes_at: number;
};

export function createContr(data: CreateContrDto) {
    return {
        actions: [
            {
                account: deepminegame,
                name: 'createcontr',
                authorization: [
                    {
                        actor: data.wax_user,
                        permission: 'active',
                    },
                ],
                data: {
                    wax_user: data.wax_user,
                    contract_type: data[createContrFormFields.contractType],
                    opt_asset_id: data[createContrFormFields.assetId] || 0,
                    is_client: data[createContrFormFields.isClient],
                    fee_percent: data[createContrFormFields.fee],
                    fee_daily_min_amount:
                        data[createContrFormFields.feeDailyMinAmount],
                    days_for_penalty:
                        data[createContrFormFields.daysForPenalty],
                    penalty_amount: data[createContrFormFields.penaltyAmount],
                    deadline_time: addDaysToCurrentDateUnixTime(
                        data[createContrFormFields.deadlineTime]
                    ),
                    finishes_at: addDaysToCurrentDateUnixTime(
                        data[createContrFormFields.finishesAt]
                    ),
                    attrs: [],
                },
            },
        ],
    };
}

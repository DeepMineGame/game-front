import { DAY_IN_SECONDS } from 'shared';
import { deepminegame } from '../../constants';
import { ContractType } from '../../tables';

export const createContrFormFields = {
    contractType: 'contract_type' as const,
    isClient: 'is_client' as const,
    assetId: 'asset_id' as const,
    fee: 'fee_percent' as const,
    deadlineDuration: 'deadline_duration' as const,
    contractDuration: 'contract_duration' as const,
    daysForPenalty: 'days_for_penalty' as const,
    feeDailyMinAmount: 'fee_daily_min_amount' as const,
    penaltyAmount: 'penalty_amount' as const,
};

export type CreateContrDto = {
    wax_user: string;
    contract_type: ContractType;
    asset_id: number;
    is_client: number;
    fee_percent: number;
    fee_daily_min_amount: number;
    days_for_penalty: number;
    penalty_amount: number;
    deadline_duration: number;
    contract_duration: number;
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
                    opt_asset_id: data[createContrFormFields.assetId],
                    is_client: Boolean(data[createContrFormFields.isClient]),
                    fee_percent: data[createContrFormFields.fee],
                    fee_daily_min_amount:
                        data[createContrFormFields.feeDailyMinAmount],
                    days_for_penalty:
                        data[createContrFormFields.daysForPenalty],
                    penalty_amount: data[createContrFormFields.penaltyAmount],
                    deadline_duration:
                        data[createContrFormFields.deadlineDuration]! *
                        DAY_IN_SECONDS,
                    contract_duration:
                        data[createContrFormFields.contractDuration]! *
                        DAY_IN_SECONDS,
                },
            },
        ],
    };
}

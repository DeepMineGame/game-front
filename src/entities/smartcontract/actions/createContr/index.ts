import { DAY_IN_SECONDS, HOUR_IN_SECONDS } from 'shared';
import { deepminegame } from '../../constants';
import { ContractType } from '../../tables';

export const createContrFormFields = {
    contractType: 'contract_type',
    isClient: 'is_client',
    assetId: 'asset_id',
    fee: 'fee_percent',
    deadlineDurationInDays: 'deadline_duration_in_days',
    deadlineDurationInHours: 'deadline_duration_in_hours',
    contractDuration: 'contract_duration',
    daysForPenalty: 'days_for_penalty',
    feeDailyMinAmount: 'fee_daily_min_amount',
    penaltyAmount: 'penalty_amount',
} as const;

export enum ContractRole {
    executor,
    client,
}
export type CreateContrDto = {
    wax_user: string;
    contract_type: ContractType;
    asset_id: number;
    is_client: ContractRole;
    fee_percent: number;
    fee_daily_min_amount: number;
    days_for_penalty: number;
    penalty_amount: number;
    deadline_duration_in_days: number;
    deadline_duration_in_hours: number;
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
                        data[createContrFormFields.deadlineDurationInDays] *
                            DAY_IN_SECONDS +
                        data[createContrFormFields.deadlineDurationInHours] *
                            HOUR_IN_SECONDS,
                    contract_duration:
                        data[createContrFormFields.contractDuration]! *
                        DAY_IN_SECONDS,
                },
            },
        ],
    };
}

import { BaseOrder } from '../../order';
import { deepminesmrt } from '../constants';

export type RentOrderDto = BaseOrder & {
    wax_user: string;
    opt_renter: null | string;
    asset_ids: number[];
    deposit_amount: number;
    fee_percent: number;
    contract_duration: number;
    autorenew_enabled: boolean;
    insurance_wax_amount: number;
    insurance_dme_amount: number;
    insurance_dmp_amount: number;
    buyout_price: number;
    fee_min_amount: number;
};

export enum rentOrderField {
    wax_user = 'wax_user',
    opt_renter = 'opt_renter',
    asset_ids = 'asset_ids',
    deposit_amount = 'deposit_amount',
    fee_percent = 'fee_percent',
    contract_duration = 'contract_duration',
    autorenew_enabled = 'autorenew_enabled',
    insurance_wax_amount = 'insurance_wax_amount',
    insurance_dme_amount = 'insurance_dme_amount',
    insurance_dmp_amount = 'insurance_dmp_amount',
    buyout_price = 'buyout_price',
    fee_min_amount = 'fee_min_amount',
}
const SECONDS_IN_DAY = 86400;
export const createRentOrder = (orderData: RentOrderDto) => {
    console.log(orderData.asset_ids);
    return {
        actions: [
            {
                account: deepminesmrt,
                name: 'crtrcontract',
                authorization: [
                    {
                        actor: orderData.wax_user,
                        permission: 'active',
                    },
                ],
                data: {
                    wax_user: orderData.wax_user,
                    opt_renter: null,
                    asset_ids: orderData.asset_ids,
                    deposit_type: 1,
                    deposit_amount: orderData.deposit_amount,
                    fee_percent: orderData.fee_percent,
                    contract_duration:
                        orderData.contract_duration * SECONDS_IN_DAY,
                    autorenew_enabled: orderData.autorenew_enabled,
                    insurance_wax_amount: orderData.insurance_wax_amount,
                    insurance_dme_amount: orderData.insurance_dmp_amount,
                    insurance_dmp_amount: orderData.insurance_dmp_amount,
                    buyout_price: orderData.buyout_price,
                    fee_min_amount: orderData.fee_min_amount,
                },
            },
        ],
    };
};

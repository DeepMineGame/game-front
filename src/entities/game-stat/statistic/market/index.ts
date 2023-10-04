import axios from 'axios';
import { defaultConfig, ENDPOINT } from 'app/constants';
import { ContractDto } from 'entities/smartcontract';

export enum OrderStatus {
    current = 'current',
    new = 'new',
    completed = 'completed',
}

export enum Roles {
    contractor = 'contractor',
    mineowner = 'mineowner',
    engineer = 'engineer',
    landlord = 'landlord',
}

export type GetMarketOrdersParams = {
    user?: string;
    user_role?: Roles;
    search_role?: Roles;
    statuses?: OrderStatus;
    levels?: string;
    rarities?: string;
    nickname?: string;
    order?: string;
    order_by?: string;
    offers?: true;
    asset_types?: string | number;
};

export const getMarketOrders = async (params: GetMarketOrdersParams) => {
    const { data = [] } = await axios.get<ContractDto[]>(
        `${ENDPOINT}/statistic/market/v2/orders`,
        {
            params,
            ...defaultConfig,
        }
    );

    return data;
};

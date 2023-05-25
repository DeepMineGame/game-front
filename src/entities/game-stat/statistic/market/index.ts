import axios from 'axios';
import { defaultConfig, ENDPOINT } from 'app/constants';
import qs from 'qs';
import { ContractDto, ContractType } from 'entities/smartcontract';

export enum OrderStatus {
    current = 'current',
    new = 'new',
    completed = 'completed',
}

export enum Roles {
    contractor = 'contractor',
    mineowner = 'mineowner',
    citizen = 'citizen',
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

export interface ServiceMarketMyOrdersFilter {
    user?: string;
    nickname?: string;
    offers?: boolean;
    types?: ContractType[];
    statuses?: OrderStatus[];
    order?: string;
    orderBy?: string;
}

export const getMyOrders = async (params: ServiceMarketMyOrdersFilter) => {
    const { data = [] } = await axios.get<ContractDto[]>(
        `${ENDPOINT}/statistic/market/my_orders`,
        {
            params,
            paramsSerializer: (p) => {
                return qs.stringify(p, { arrayFormat: 'comma' });
            },
            ...defaultConfig,
        }
    );

    return data;
};

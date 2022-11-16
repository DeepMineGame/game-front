import axios from 'axios';
import { ENDPOINT } from 'app';
import { ContractDto } from 'entities/smartcontract';

export type GetContractsParams = {
    user?: string;
    userRole?: string;
    searchRole?: string;
    statuses?: string;
    levels?: string;
    rarities?: string;
    nickname?: string;
    order?: string;
    orderBy?: string;
};

export const getContracts = async ({
    userRole,
    searchRole,
    orderBy,
    ...params
}: GetContractsParams) => {
    const { data = [] } = await axios.get<ContractDto[]>(
        `${ENDPOINT}/statistic/market/orders`,
        {
            params: {
                ...params,
                user_role: userRole,
                search_role: searchRole,
                order_by: orderBy,
            },
        }
    );

    return data;
};

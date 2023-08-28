import axios from 'axios';
import { defaultConfig, ENDPOINT } from 'app/constants';
import type { ContractDto } from 'entities';

type GetOrderParams = {
    id: string;
};

export const getRentOrder = async ({ id }: GetOrderParams) => {
    const { data } = await axios.get<ContractDto>(
        `${ENDPOINT}/rent-market-api/contract/${id}`,
        defaultConfig
    );
    return data;
};

export const getRentOrders = async ({
    user,
    offers,
    my_contracts,
}: {
    user?: string;
    offers?: boolean;
    my_contracts?: boolean;
}) => {
    const { data } = await axios.get<ContractDto[]>(
        `${ENDPOINT}/rent-market-api/contract`,
        { params: { offers, user, my_contracts }, ...defaultConfig }
    );

    return data;
};

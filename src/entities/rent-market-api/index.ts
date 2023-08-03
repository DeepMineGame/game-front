import axios from 'axios';
import { ENDPOINT } from 'app/constants';
import type { ContractDto } from 'entities';

type GetOrderParams = {
    id: string;
};

export const getRentOrder = async ({ id }: GetOrderParams) => {
    const { data } = await axios.get<ContractDto[]>(
        `${ENDPOINT}/rent-market-api/contract`,
        { params: { id } }
    );

    return data?.[0];
};

export const getRentOrders = async ({
    user,
    offers,
}: {
    user?: string;
    offers?: boolean;
}) => {
    const { data } = await axios.get<ContractDto[]>(
        `${ENDPOINT}/rent-market-api/contract`,
        { params: { offers, user } }
    );

    return data;
};

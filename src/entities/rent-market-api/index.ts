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

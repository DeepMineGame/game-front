import { defaultConfig, ENDPOINT } from 'app';
import axios from 'axios';
import type { ContractDto } from 'entities';

type GetOrderParams = {
    id: string;
};

export const getOrder = async ({ id }: GetOrderParams) => {
    const { data } = await axios.get<ContractDto>(
        `${ENDPOINT}/statistic/order`,
        { params: { id }, ...defaultConfig }
    );

    return data;
};

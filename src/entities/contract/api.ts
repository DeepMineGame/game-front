import axios from 'axios';
import { defaultConfig, ENDPOINT } from 'app/constants';
import type { ContractDto } from 'entities';

type GetOrderParams = {
    id: string;
    accountName: string;
};

export const getOrder = async ({ id, accountName }: GetOrderParams) => {
    const { data } = await axios.get<ContractDto>(
        `${ENDPOINT}/statistic/order`,
        { params: { id, for_user: accountName }, ...defaultConfig }
    );

    return data;
};

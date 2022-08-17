import axios from 'axios';
import { defaultConfig, ENDPOINT } from 'app';
import { ContractDto } from '../../../../smartcontract';

export enum FilterOrderStatus {
    Current = 'current',
    New = 'new',
    Completed = 'completed',
}

export const getOrders = async ({
    status,
    user,
}: {
    status: FilterOrderStatus;
    user: string;
}) => {
    const { data = [] } = await axios.get<ContractDto[]>(
        `${ENDPOINT}/statistic/user/orders?user=${user}&status=${status}`,
        defaultConfig
    );

    return data;
};

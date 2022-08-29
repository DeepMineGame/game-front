import axios from 'axios';
import { defaultConfig, ENDPOINT } from 'app';
import { Role } from 'features';
import { ContractDto } from 'entities/smartcontract';

export enum FilterOrderStatus {
    Current = 'current',
    New = 'new',
    Completed = 'completed',
}

export type GetOrdersParams = {
    user?: string;
    userRole?: Role;
    status?: FilterOrderStatus;
    order?: string;
    orderBy?: string;
};

export const getOrders = async ({
    user,
    userRole,
    status,
    order,
    orderBy,
}: GetOrdersParams) => {
    const paramsWithoutRole = {
        user,
        status,
        order,
        order_by: orderBy,
    };
    const { data = [] } = await axios.get<ContractDto[]>(
        `${ENDPOINT}/statistic/user/orders`,
        {
            params:
                userRole === Role.all
                    ? paramsWithoutRole
                    : { ...paramsWithoutRole, user_role: userRole },
            ...defaultConfig,
        }
    );

    return data;
};

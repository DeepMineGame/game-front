import axios from 'axios';
import { ENDPOINT } from 'app';
import { UserRoles } from 'entities/smartcontract';

export enum ActionStatus {
    'success',
    'error',
}

export type UserActionDto = {
    id: string;
    tx: string;
    action: string;
    user: string;
    role: UserRoles;
    data: any;
    time: Date;
    started_at: Date;
    finished_at: Date;
    status: 'success' | 'error';
    client_asset_id: string;
};

export const getActions = async ({
    searchParam: user,
    role = UserRoles.citizen,
    cursor = 0,
}: {
    searchParam: string;
    role?: UserRoles;
    cursor?: number;
}) => {
    const { data = [] } = await axios.get<UserActionDto[]>(
        `${ENDPOINT}/statistic/actions`,
        {
            params: {
                user,
                role,
                cursor,
            },
        }
    );

    return data;
};

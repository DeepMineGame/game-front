import axios from 'axios';
import { ENDPOINT } from 'app/constants';
import { Roles } from '../market';

export type MineStatUnit = {
    date: number;
    events: {
        date: number;
        duration: number;
        amount: string;
        breakdowns: number;
    }[];
};

export const getMineStats = async ({
    searchParam: user,
    role,
}: {
    searchParam: string;
    role: Roles;
}) => {
    const { data = [] } = await axios.get<MineStatUnit[]>(
        `${ENDPOINT}/statistic/mining/stat`,
        {
            params: {
                user,
                role,
            },
        }
    );

    return data;
};

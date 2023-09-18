import axios from 'axios';
import { ENDPOINT } from 'app/constants';
import { Role } from '../user';

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
    role: Role;
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

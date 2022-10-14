import axios from 'axios';
import { ENDPOINT } from 'app';
import { Role } from '../user';

export type MineStatUnit = {
    date: number;
    events: {
        date: number;
        duration: number;
        amount: number;
        fossil_mined: number;
        breakdowns: number;
    }[];
};

export const getMineOwnerStats = async ({
    searchParam: user,
    role,
}: {
    searchParam: string;
    role: Role;
}) => {
    const { data = [] } = await axios.get<MineStatUnit[]>(
        `${ENDPOINT}/statistic/mine/stat`,
        {
            params: {
                user,
                role,
            },
        }
    );

    return data;
};

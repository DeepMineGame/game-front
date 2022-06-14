import axios from 'axios';
import { WAX_GET_TABLE_ENDPOINT } from 'app';

export const fetchDmeBalance = async ({
    searchParam,
}: {
    searchParam: string;
}) => {
    const {
        data: { rows },
    } = await axios.post(WAX_GET_TABLE_ENDPOINT, {
        code: 'deepminedmet',
        index_position: 1,
        json: true,
        limit: '1',
        scope: searchParam,
        table: 'accounts',
    });

    const balance = rows?.[0]?.balance;
    const [value] = balance ? balance.split(' ') : [0];

    return Number(value).toFixed(1);
};

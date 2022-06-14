import axios from 'axios';
import { WAX_GET_BALANCE_ENDPOINT } from 'app';

export const fetchWaxBalance = async ({
    searchParam,
}: {
    searchParam: string;
}) => {
    const { data = [] } = await axios.post(WAX_GET_BALANCE_ENDPOINT, {
        code: 'eosio.token',
        account: searchParam,
        symbol: 'WAX',
    });

    const [value] = data.length ? data[0].split(' ') : [0];

    return Number(value).toFixed(1);
};

import axios from 'axios';
import { WAX_GET_BALANCE_ENDPOINT } from 'app';

export const fetchWaxBalance = async ({ account }: { account: string }) => {
    const { data } = await axios.post(WAX_GET_BALANCE_ENDPOINT, {
        code: 'eosio.token',
        account,
        symbol: 'WAX',
    });

    if (!data[0]) return `0 WAX`;

    const [value] = data[0].split(' ');

    return Number(value).toFixed(1);
};

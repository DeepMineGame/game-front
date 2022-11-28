import axios from 'axios';
import { RequestSubject, poolRequest } from 'shared';

export const fetchWaxBalance = async ({
    searchParam,
}: {
    searchParam: string;
}): Promise<string | undefined> => {
    let fetchedData;

    await poolRequest(RequestSubject.Wax, async (endpoint: string) => {
        const { data = [] } = await axios.post(
            `${endpoint}/v1/chain/get_currency_balance`,
            {
                code: 'eosio.token',
                account: searchParam,
                symbol: 'WAX',
            }
        );

        const [value] = data.length ? data[0].split(' ') : [0];
        fetchedData = Number(value).toFixed(1);
    });

    return fetchedData;
};

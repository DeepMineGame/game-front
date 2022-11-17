import { ConnectionCountLimit, endpoints } from 'app/constants';
import axios from 'axios';
import { nodeUrlSwitcher } from 'shared';

// eslint-disable-next-line prefer-const
let [currentWaxEndpoint] = endpoints.wax;

export const fetchWaxBalance = async ({
    searchParam,
    connectionCount = 0,
}: {
    searchParam: string;
    connectionCount?: number;
}): Promise<string | undefined> => {
    let fetchedData;

    await nodeUrlSwitcher(
        async () => {
            connectionCount++;

            const { data = [] } = await axios.post(
                `${currentWaxEndpoint}/v1/chain/get_currency_balance`,
                {
                    code: 'eosio.token',
                    account: searchParam,
                    symbol: 'WAX',
                }
            );

            const [value] = data.length ? data[0].split(' ') : [0];

            fetchedData = Number(value).toFixed(1);
        },
        {
            connectionCount,
            connectionCountLimit: ConnectionCountLimit.wax,
            currentEndpoint: currentWaxEndpoint,
            endpointsList: endpoints.wax,
        }
    );

    return fetchedData;
};

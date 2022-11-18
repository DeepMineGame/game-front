import {
    ConnectionCountLimit,
    defaultConfig,
    endpoints,
    getNextEndpoint,
} from 'app/constants';
import axios from 'axios';
import { nodeUrlSwitcher } from 'shared';

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
                    ...defaultConfig,
                }
            );

            const [value] = data.length ? data[0].split(' ') : [0];

            fetchedData = Number(value).toFixed(1);
        },
        () => {
            currentWaxEndpoint = getNextEndpoint({
                endpointsList: endpoints.wax,
                currentEndpoint: currentWaxEndpoint,
            });
        },
        { connectionCount, connectionCountLimit: ConnectionCountLimit.wax }
    );

    return fetchedData;
};

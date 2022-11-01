import {
    ConnectionCountLimit,
    endpoints,
    getNextEndpoint,
} from 'app/constants';
import axios, { AxiosError } from 'axios';
import { wait } from 'shared';

let [currentWaxEndpoint] = endpoints.wax;

export const fetchWaxBalance = async ({
    searchParam,
    connectionCount = 0,
}: {
    searchParam: string;
    connectionCount?: number;
}): Promise<string> => {
    try {
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

        return Number(value).toFixed(1);
    } catch (e) {
        const error = e as AxiosError;

        if (
            error.message === 'Network Error' ||
            (error.response && Number(error?.response.status) >= 500)
        ) {
            if (connectionCount >= ConnectionCountLimit.wax)
                throw new Error('Network Error', error);

            currentWaxEndpoint = getNextEndpoint({
                endpointsList: endpoints.wax,
                currentEndpoint: currentWaxEndpoint,
            });

            await wait(1);
            return await fetchWaxBalance({
                searchParam,
                connectionCount,
            });
        }

        throw new Error(error.message);
    }
};

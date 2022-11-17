import { ConnectionCountLimit, endpoints } from 'app/constants';
import axios from 'axios';
import { nodeUrlSwitcher } from 'shared';

// eslint-disable-next-line prefer-const
let [currentWaxEndpoint] = endpoints.wax;

export const fetchDmeBalance = async ({
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

            const {
                data: { rows },
            } = await axios.post<{ rows: { balance: string }[] }>(
                `${currentWaxEndpoint}/v1/chain/get_table_rows`,
                {
                    code: 'deepminedmet',
                    index_position: 1,
                    json: true,
                    limit: '1',
                    scope: searchParam,
                    table: 'accounts',
                }
            );

            const balance = rows?.[0]?.balance;
            const [value] = balance ? balance.split(' ') : [0];

            fetchedData = Number(value).toFixed(4);
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

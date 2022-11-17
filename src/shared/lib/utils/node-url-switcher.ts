import { getNextEndpoint } from 'app/constants';
import { AxiosError } from 'axios';
import { isServerError } from './is-server-error';
import { wait } from './wait';

type Config = {
    connectionCount: number;
    connectionCountLimit: number;
    endpointsList: string[];
    currentEndpoint: string;
};

export const nodeUrlSwitcher = async (
    fn: () => Promise<any>,
    {
        connectionCount,
        connectionCountLimit,
        endpointsList,
        currentEndpoint,
    }: Config
): Promise<any> => {
    try {
        await fn();
    } catch (e) {
        const error = e as AxiosError;

        if (isServerError(error)) {
            if (connectionCount >= connectionCountLimit)
                throw new Error('Network Error', error);

            // remove after tests
            // eslint-disable-next-line no-console
            console.log(`current node endpoint: ${currentEndpoint}`);

            currentEndpoint = getNextEndpoint({
                endpointsList,
                currentEndpoint,
            });

            // remove after tests
            // eslint-disable-next-line no-console
            console.log(`new node endpoint: ${currentEndpoint}`);

            await wait(1);

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            return await nodeUrlSwitcher(fn, {
                connectionCount,
                connectionCountLimit,
                endpointsList,
                currentEndpoint,
            });
        }

        throw new Error(error.message);
    }

    return undefined;
};

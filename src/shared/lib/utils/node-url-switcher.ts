import { isServerError } from './is-server-error';
import { wait } from './wait';

type Config = {
    connectionCount: number;
    connectionCountLimit: number;
};

export const nodeUrlSwitcher = async (
    requestFn: () => Promise<any>,
    switchFn: () => void,
    { connectionCount, connectionCountLimit }: Config
): Promise<any> => {
    try {
        await requestFn();
    } catch (e) {
        const error = e as Error & { response: { status: number } };

        if (isServerError(error)) {
            if (connectionCount >= connectionCountLimit)
                throw new Error('Network Error', error);

            switchFn();

            await wait(1);

            return await nodeUrlSwitcher(requestFn, switchFn, {
                connectionCount,
                connectionCountLimit,
            });
        }

        throw new Error(error.message);
    }

    return undefined;
};

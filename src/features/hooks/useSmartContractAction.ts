import { errorNotify, useChainAuthContext } from 'shared';
import { Action } from 'entities/smartcontracts';

const defaultTransactionOptions = {
    blocksBehind: 3,
    expireSeconds: 30,
};

export function useSmartContractAction<T>(
    action: { actions: Action<T> },
    options = defaultTransactionOptions
) {
    const chainAccount = useChainAuthContext();

    return () =>
        chainAccount?.activeUser
            ?.signTransaction(action, options)
            .catch(errorNotify);
}

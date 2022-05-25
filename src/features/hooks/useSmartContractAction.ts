import { errorNotify, useChainAuthContext } from 'shared';
import { Action } from 'entities/smartcontract';

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

export const useSmartContractActionDynamic = () => {
    const chainAccount = useChainAuthContext();

    return <T>(
        action: { actions: Action<T> },
        options = defaultTransactionOptions
    ) =>
        chainAccount?.activeUser
            ?.signTransaction(action, options)
            .catch(errorNotify);
};

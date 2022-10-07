import {
    createErrorMessage,
    showErrorModal,
    showErrorNotification,
    useChainAuthContext,
} from 'shared';
import { useTranslation } from 'react-i18next';
import { Action } from 'entities/smartcontract';

const defaultTransactionOptions = {
    blocksBehind: 3,
    expireSeconds: 30,
};

type UseSmartContractActionParams<T> = {
    action: { actions: Action<T> };
    options?: typeof defaultTransactionOptions;
    onSignSuccess?: () => void;
};

export const useSmartContractAction = <T>({
    action,
    options = defaultTransactionOptions,
    onSignSuccess,
}: UseSmartContractActionParams<T>) => {
    const chainAccount = useChainAuthContext();
    const { t } = useTranslation();

    return async () => {
        try {
            await chainAccount?.activeUser?.signTransaction(action, options);
            onSignSuccess?.();
        } catch (e) {
            const err = e as Error;
            showErrorNotification(err);
            showErrorModal({
                title: t('components.common.status.error'),
                content: createErrorMessage(err, t),
            });
            throw e;
        }
    };
};

export const useSmartContractActionDynamic = () => {
    const chainAccount = useChainAuthContext();
    const { t } = useTranslation();

    return <T>(
        action: { actions: Action<T> },
        options = defaultTransactionOptions
    ) =>
        chainAccount?.activeUser
            ?.signTransaction(action, options)
            .catch((e) => {
                const err = e as Error;
                showErrorNotification(err);
                showErrorModal({
                    title: t('components.common.status.error'),
                    content: createErrorMessage(err, t),
                });
                throw e;
            });
};

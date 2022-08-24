import { error, errorNotify, getErrorCode, useChainAuthContext } from 'shared';
import { useTranslation } from 'react-i18next';
import { Action } from 'entities/smartcontract';

const defaultTransactionOptions = {
    blocksBehind: 3,
    expireSeconds: 30,
};

export const useSmartContractAction = <T>(
    action: { actions: Action<T> },
    options = defaultTransactionOptions
) => {
    const chainAccount = useChainAuthContext();
    const { t } = useTranslation();

    return async () => {
        try {
            await chainAccount?.activeUser?.signTransaction(action, options);
        } catch (e) {
            errorNotify(e as Error);
            error({
                title: t('components.common.status.error'),
                content: t(`blockchainErrors.${getErrorCode(e as string)}`),
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
                errorNotify(e);
                error({
                    title: t('components.common.status.error'),
                    content: t(`blockchainErrors.${getErrorCode(e)}`),
                });
            });
};

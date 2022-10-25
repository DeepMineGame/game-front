import {
    createErrorMessage,
    getTimeLeftFromUtc,
    showErrorNotification,
    useChainAuthContext,
} from 'shared';
import { useTranslation } from 'react-i18next';
import { Modal } from 'antd';
import {
    Action,
    ActionDto,
    actionMap,
    getActionsTable,
    mapSearchParamForIndexPosition,
} from 'entities/smartcontract';

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
            const { rows } = await getActionsTable({
                searchIdentification:
                    mapSearchParamForIndexPosition.ownerUserId,
                searchParam: chainAccount.activeUser?.accountName!,
                limit: 1,
            });
            const lastAction: ActionDto | null = rows?.[0];
            const lastActionInProgress =
                (lastAction?.finishes_at || 0) * 1000 > Date.now();
            if (lastActionInProgress && lastAction) {
                return Modal.warn({
                    title: t('components.actionModal.actionNotPossible'),
                    content: `${t('components.actionModal.busy')} ${
                        actionMap[lastAction.type]
                    } ${t(
                        'components.actionModal.willEnd'
                    )} ${getTimeLeftFromUtc(lastAction.finishes_at)}`,
                });
            }
            await chainAccount?.activeUser?.signTransaction(action, options);
            return onSignSuccess?.();
        } catch (e) {
            const err = e as Error;
            showErrorNotification(err);
            Modal.error({
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
                Modal.error({
                    title: t('components.common.status.error'),
                    content: createErrorMessage(err, t),
                });
                throw e;
            });
};

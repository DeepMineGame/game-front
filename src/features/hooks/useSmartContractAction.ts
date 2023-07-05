import {
    createErrorMessage,
    getTimeLeftFromUtc,
    showErrorNotification,
    useChainAuthContext,
} from 'shared';
import { useTranslation } from 'react-i18next';
import { App, Modal } from 'antd';
import { useActionName } from 'features/user';
import {
    Action,
    ActionDto,
    ActionType,
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
const config = {
    title: 'Use Hook!',
    content: 'error',
};
export const useSmartContractAction = <T>({
    action,
    options = defaultTransactionOptions,
    onSignSuccess,
}: UseSmartContractActionParams<T>) => {
    const { modal } = App.useApp();
    const chainAccount = useChainAuthContext();
    const { t } = useTranslation();
    let actionType: ActionType = ActionType.undefined;
    const actionName = useActionName(actionType);

    return async () => {
        try {
            const data = await getActionsTable<ActionDto>({
                searchIdentification:
                    mapSearchParamForIndexPosition.ownerUserId,
                searchParam: chainAccount.activeUser?.accountName!,
                limit: 1,
            });
            actionType = data?.rows?.[0]?.type || ActionType.undefined;
            const lastAction: ActionDto | null = data?.rows?.[0] || null;
            const lastActionInProgress =
                lastAction && (lastAction.finishes_at || 0) * 1000 > Date.now();
            if (lastActionInProgress) {
                return modal.warning({
                    title: t('components.actionModal.actionNotPossible'),
                    content: `${t('components.actionModal.busy')} ${
                        actionName || t('components.actionModal.lastAction')
                    } ${t(
                        'components.actionModal.willEnd'
                    )} ${getTimeLeftFromUtc(lastAction.finishes_at)}`,
                });
            }
            await chainAccount?.activeUser?.signTransaction(action, options);
            return onSignSuccess?.();
        } catch (e) {
            const err = e as Error;
            modal.error({
                title: t('components.common.status.error'),
                content: createErrorMessage(err, t),
            });
            throw e;
        }
    };
};

export const useSmartContractActionDynamic = () => {
    const { modal } = App.useApp();
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

                modal.error({
                    title: t('components.common.status.error'),
                    content: createErrorMessage(err, t),
                });
                throw e;
            });
};

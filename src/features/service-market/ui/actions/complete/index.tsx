import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSmartContractAction } from 'features/hooks';
import { terminateContract } from 'entities/smartcontract';
import { Alert, Button } from 'shared/ui';
import {
    DEFAULT_BLOCKCHAIN_BACKEND_SYNC_TIME,
    setSomethingCountDownEvent,
} from '../../../../something-in-progess-modal';

type Props = {
    accountName: string;
    contractId: number;
    onComplete?: () => Promise<void>;
};

const CompletedButton: FC<Props> = ({
    accountName,
    contractId,
    onComplete,
}) => {
    const { t } = useTranslation();

    const terminateAction = useSmartContractAction({
        action: terminateContract(accountName, contractId),
        onSignSuccess: () =>
            setSomethingCountDownEvent(DEFAULT_BLOCKCHAIN_BACKEND_SYNC_TIME),
    });

    const handleComplete = async () => {
        if (onComplete) {
            await onComplete();
        } else {
            await terminateAction();
        }
    };
    return (
        <Button ghost type="primary" onClick={handleComplete}>
            {t('pages.serviceMarket.contract.completeContract')}
        </Button>
    );
};

const CompletedAlert: FC<Props> = ({ accountName, contractId, onComplete }) => {
    const { t } = useTranslation();

    return (
        <Alert
            message={t(
                'pages.serviceMarket.contract.completeContractDescription'
            )}
            action={
                <CompletedButton
                    accountName={accountName}
                    contractId={contractId}
                    onComplete={onComplete}
                />
            }
            type="info"
            showIcon
        />
    );
};

export { CompletedAlert, CompletedButton };

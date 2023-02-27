import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, SuccessModal, useReloadPage, WarningModal } from 'shared';
import { useSmartContractAction } from 'features';
import { terminateContract } from 'entities/smartcontract';

type Props = {
    accountName: string;
    contractId: number;
};

const TerminateContract: FC<Props> = ({ accountName, contractId }) => {
    const { t } = useTranslation();
    const reloadPage = useReloadPage();

    const [isTerminateModalVisible, setIsTerminateModalVisible] =
        useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

    const openSuccessModal = () => {
        setIsSuccessModalVisible(true);
    };

    const closeSuccessModal = () => {
        setIsSuccessModalVisible(false);
    };

    const submitSuccessModal = () => {
        closeSuccessModal();
        setIsTerminateModalVisible(false);
        reloadPage();
    };

    const getTerminate = useSmartContractAction({
        action: terminateContract(accountName, contractId),
    });

    const handleTerminate = async () => {
        await getTerminate();
        openSuccessModal();
    };

    return (
        <div>
            <Button onClick={() => setIsTerminateModalVisible(true)}>
                {t('pages.serviceMarket.contract.terminateContract')}
            </Button>

            <WarningModal
                visible={isTerminateModalVisible}
                onSubmit={handleTerminate}
                onCancel={() => setIsTerminateModalVisible(false)}
                title={t('pages.serviceMarket.contract.terminateModal.title')}
                submitText={t(
                    'pages.serviceMarket.contract.terminateModal.submit'
                )}
                description={t(
                    'pages.serviceMarket.contract.terminateModal.description'
                )}
            />

            <SuccessModal
                visible={isSuccessModalVisible}
                onCancel={closeSuccessModal}
                onSubmit={submitSuccessModal}
                title={t('pages.serviceMarket.contract.terminateModal.title')}
                description={t(
                    'pages.serviceMarket.contract.terminateModal.success'
                )}
            />
        </div>
    );
};

export { TerminateContract };

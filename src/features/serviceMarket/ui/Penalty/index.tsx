import React, { useState } from 'react';
import { InfoCircleFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { Button, ExclamationModal, SuccessModal, useAccountName } from 'shared';
import { terminateContract } from 'entities/smartcontract';
import { useSmartContractAction } from '../../../hooks';
import styles from './styles.module.scss';

type Props = {
    contractId: number;
};

export const Penalty = ({ contractId }: Props) => {
    const { t } = useTranslation();
    const accountName = useAccountName();

    const [isCollectModalVisible, setIsCollectModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isNoCollectModalVisible, setIsNoCollectModalVisible] =
        useState(false);

    const getPenaltyAction = useSmartContractAction(
        terminateContract(accountName, contractId, 1)
    );
    const getNoPenaltyAction = useSmartContractAction(
        terminateContract(accountName, contractId, 0)
    );

    const closeSuccessModal = () => {
        setIsSuccessModalVisible(false);
    };
    const openSuccessModal = () => {
        setIsSuccessModalVisible(true);
    };
    const submitSuccessModal = () => {
        closeSuccessModal();
        setIsCollectModalVisible(false);
    };

    const handlePenaltyClick = async () => {
        await getPenaltyAction();
        openSuccessModal();
    };

    const handleNoPenaltyClick = async () => {
        await getNoPenaltyAction();
    };

    return (
        <div className={styles.penalty}>
            <InfoCircleFilled />
            <div className={styles.content}>
                <div className={styles.description}>
                    {t('pages.serviceMarket.contract.penaltyDescription')}
                </div>
                <div className={styles.buttons}>
                    <Button
                        ghost
                        className={styles.button}
                        onClick={() => setIsCollectModalVisible(true)}
                    >
                        {t('pages.serviceMarket.contract.collectPenalty')}
                    </Button>
                    <Button
                        ghost
                        className={styles.button}
                        onClick={() => setIsNoCollectModalVisible(true)}
                    >
                        {t('pages.serviceMarket.contract.noCollectPenalty')}
                    </Button>
                </div>
            </div>
            <ExclamationModal
                visible={isCollectModalVisible}
                onSubmit={handlePenaltyClick}
                onCancel={() => setIsCollectModalVisible(false)}
                title={t('pages.serviceMarket.contract.collectPenalty')}
                description={t(
                    'pages.serviceMarket.contract.collectDescription'
                )}
                submitText={t('pages.serviceMarket.contract.collect')}
            />
            <SuccessModal
                visible={isSuccessModalVisible}
                onCancel={closeSuccessModal}
                onSubmit={submitSuccessModal}
                title={t('pages.serviceMarket.contract.termination')}
                description={t('pages.serviceMarket.contract.youReceived')}
            />
            <ExclamationModal
                visible={isNoCollectModalVisible}
                onSubmit={handleNoPenaltyClick}
                onCancel={() => setIsNoCollectModalVisible(false)}
                title={t('pages.serviceMarket.contract.noCollectPenalty')}
                description={t(
                    'pages.serviceMarket.contract.noCollectDescription'
                )}
                submitText={t('pages.serviceMarket.contract.noCollect')}
            />
        </div>
    );
};

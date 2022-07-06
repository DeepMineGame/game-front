import React, { useState } from 'react';
import { InfoCircleFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { Button, ExclamationModal, SuccessModal } from 'shared';
import styles from './styles.module.scss';

export const Penalty = () => {
    const { t } = useTranslation();
    const [isCollectModalVisible, setIsCollectModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isNoCollectModalVisible, setIsNoCollectModalVisible] =
        useState(false);

    const closeSuccessModal = () => {
        setIsSuccessModalVisible(false);
    };
    const openSuccessModal = () => {
        setIsSuccessModalVisible(true);
    };

    const handlePenaltyClick = () => {
        console.log('penalty');
        openSuccessModal();
    };

    const handleNoPenaltyClick = () => {
        console.log('no penalty');
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
                onSubmit={closeSuccessModal}
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

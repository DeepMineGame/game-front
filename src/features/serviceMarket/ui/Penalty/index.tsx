import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
    Alert,
    Button,
    ExclamationModal,
    SuccessModal,
    useAccountName,
} from 'shared';
import { serviceMarket } from 'app/router/paths';
import { terminateContract } from 'entities/smartcontract';
import { useSmartContractAction } from '../../../hooks';
import styles from './styles.module.scss';

type Props = {
    penalty: number;
    contractId: number;
    isViolated: boolean;
};

export const Penalty: FC<Props> = ({ isViolated, contractId, penalty }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
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
        navigate(serviceMarket);
    };

    const handlePenaltyClick = async () => {
        await getPenaltyAction();
        openSuccessModal();
    };

    const handleNoPenaltyClick = async () => {
        await getNoPenaltyAction();
        navigate(serviceMarket);
    };

    return (
        <>
            <Alert
                className={styles.penalty}
                message={t(
                    isViolated
                        ? 'pages.serviceMarket.contract.penaltyViolatedDescription'
                        : 'pages.serviceMarket.contract.penaltyTerminatedDescription'
                )}
                action={
                    <div className={styles.buttons}>
                        <Button
                            ghost
                            type="primary"
                            onClick={() => setIsCollectModalVisible(true)}
                        >
                            {t(
                                isViolated
                                    ? 'pages.serviceMarket.contract.collectPenaltyAndBreak'
                                    : 'pages.serviceMarket.contract.collectPenalty'
                            )}
                        </Button>
                        <Button
                            ghost
                            type="primary"
                            onClick={() => setIsNoCollectModalVisible(true)}
                        >
                            {t(
                                isViolated
                                    ? 'pages.serviceMarket.contract.noCollectPenaltyAndBreak'
                                    : 'pages.serviceMarket.contract.noCollectPenalty'
                            )}
                        </Button>
                    </div>
                }
                type="info"
                showIcon
            />

            <ExclamationModal
                visible={isCollectModalVisible}
                onSubmit={handlePenaltyClick}
                onCancel={() => setIsCollectModalVisible(false)}
                title={t('pages.serviceMarket.contract.collectPenalty')}
                description={t(
                    'pages.serviceMarket.contract.collectDescription',
                    { amount: penalty * 2 }
                )}
                submitText={t('pages.serviceMarket.contract.collect')}
            />
            <SuccessModal
                visible={isSuccessModalVisible}
                onCancel={closeSuccessModal}
                onSubmit={submitSuccessModal}
                title={t('pages.serviceMarket.contract.termination')}
                description={t('pages.serviceMarket.contract.youReceived', {
                    amount: penalty * 2,
                })}
            />
            <ExclamationModal
                visible={isNoCollectModalVisible}
                onSubmit={handleNoPenaltyClick}
                onCancel={() => setIsNoCollectModalVisible(false)}
                title={t('pages.serviceMarket.contract.noCollectPenalty')}
                description={t(
                    'pages.serviceMarket.contract.noCollectDescription',
                    { amount: penalty * 2 }
                )}
                submitText={t('pages.serviceMarket.contract.noCollect')}
            />
        </>
    );
};

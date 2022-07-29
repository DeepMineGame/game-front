import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from 'antd';

import {
    Button,
    Title,
    ActionModal,
    greenGreen6,
    sunsetOrange6,
    useAccountName,
    ExclamationModal,
    useReloadPage,
} from 'shared';
import { engageArea, unEngageArea, claimArea } from 'entities/smartcontract';
import { useSmartContractAction } from '../../../../hooks';
import styles from './styles.module.scss';

type Props = {
    isActive: boolean;
    areaId?: number;
};

export const AreaClaim: FC<Props> = ({ isActive, areaId }) => {
    const { t } = useTranslation();
    const accountName = useAccountName();
    const [isModalActionVisible, setIsModalActionVisible] = useState(false);
    const [isModalUnengageVisible, setIsModalUnengageVisible] = useState(false);
    const engageAreaAction = useSmartContractAction(
        engageArea({ waxUser: accountName, areaId })
    );
    const unEngageAreaAction = useSmartContractAction(
        unEngageArea({ waxUser: accountName, areaId })
    );
    const reloadPage = useReloadPage();
    const claimAction = useSmartContractAction(
        claimArea({ waxUser: accountName, areaId })
    );

    const onEngage = async () => {
        await engageAreaAction();
        reloadPage();
    };

    const onUnengage = async () => {
        await unEngageAreaAction();
        reloadPage();
    };

    const handleClaim = async () => {
        await claimAction();
    };

    return (
        <div className={styles.areaClaim}>
            <div className={styles.claimContainer}>
                <div className={styles.statusContainer}>
                    <Title
                        fontFamily="orbitron"
                        level={4}
                        className={styles.title}
                    >
                        {t('components.common.area')}
                    </Title>
                    <Badge
                        className={styles.status}
                        color={isActive ? greenGreen6 : sunsetOrange6}
                        text={t(
                            isActive
                                ? 'components.common.status.active'
                                : 'components.common.status.inactive'
                        )}
                    />
                </div>
                <Button
                    onClick={handleClaim}
                    type={isActive ? 'primary' : 'ghost'}
                    disabled={!isActive}
                    block
                    className={styles.claimButton}
                >
                    {t('pages.areaManagement.claim')}
                </Button>
            </div>

            <div className={styles.engageContainer}>
                {isActive ? (
                    <Button
                        type="ghost"
                        onClick={() => setIsModalUnengageVisible(true)}
                    >
                        {t('pages.areaManagement.unengage')}
                    </Button>
                ) : (
                    <Button
                        type="ghost"
                        onClick={() => setIsModalActionVisible(true)}
                    >
                        {t('pages.areaManagement.engage')}
                    </Button>
                )}
            </div>

            <ExclamationModal
                visible={isModalUnengageVisible}
                onSubmit={onUnengage}
                onCancel={() => setIsModalUnengageVisible(false)}
                title={t('pages.areaManagement.unengage')}
                description={t('pages.areaManagement.unengageDescription')}
                submitText={t('pages.areaManagement.unengage')}
            />
            <ActionModal
                submitText={t('components.common.button.activate')}
                visible={isModalActionVisible}
                onCancel={() => setIsModalActionVisible(false)}
                onSubmit={onEngage}
                title={t('pages.areaManagement.landActivation')}
            />
        </div>
    );
};

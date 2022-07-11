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
} from 'shared';
import { engageArea, unEngageArea, claimArea } from 'entities/smartcontract';
import { UnengageAreaModal } from '../UnengageAreaModal';
import { useSmartContractAction } from '../../../../hooks';
import styles from './styles.module.scss';

type Props = {
    isActive: boolean;
    areaId?: number;
    onUpdate?: () => void;
};

export const AreaClaim: FC<Props> = ({ isActive, areaId, onUpdate }) => {
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
    const claimAction = useSmartContractAction(
        claimArea({ waxUser: accountName, areaId })
    );

    const onEngage = async () => {
        await engageAreaAction();
        if (onUpdate) {
            onUpdate();
        }
        setIsModalActionVisible(false);
    };

    const onUnengage = async () => {
        await unEngageAreaAction();
        if (onUpdate) {
            onUpdate();
        }
        setIsModalUnengageVisible(false);
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

            <UnengageAreaModal
                onSubmit={onUnengage}
                visible={isModalUnengageVisible}
                onCancel={() => setIsModalUnengageVisible(false)}
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

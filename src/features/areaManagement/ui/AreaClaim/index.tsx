import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { Button, Title, ActionModal } from 'shared';
import { UnengageAreaModal } from '../UnengageAreaModal';
import styles from './styles.module.scss';

type Props = {
    isActive: boolean;
};

export const AreaClaim: FC<Props> = ({ isActive }) => {
    const { t } = useTranslation();
    const [isModalActionVisible, setIsModalActionVisible] = useState(false);
    const [isModalUnengageVisible, setIsModalUnengageVisible] = useState(false);

    const onEngage = () => {
        // some logic
        setIsModalActionVisible(false);
    };

    const onUnengage = () => {
        // some logic
        setIsModalUnengageVisible(false);
    };

    return (
        <div className={styles.areaClaim}>
            <div className={styles.claimContainer}>
                <div className={styles.statusContainer}>
                    <Title
                        fontFamily="orbitron"
                        level={4}
                        className={styles.area}
                    >
                        {t('pages.areaManagement.area')}
                    </Title>
                    <div
                        className={cn(
                            styles.status,
                            isActive
                                ? styles.statusActive
                                : styles.statusInactive
                        )}
                    >
                        {t(
                            isActive
                                ? 'pages.areaManagement.active'
                                : 'pages.areaManagement.inactive'
                        )}
                    </div>
                </div>
                <Button
                    type={isActive ? 'primary' : 'ghost'}
                    disabled={!isActive}
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
                        onClick={() => setIsModalActionVisible(false)}
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

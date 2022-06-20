import React from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { Button, Title } from 'shared';
import styles from './styles.module.scss';

export const AreaClaim = () => {
    const { t } = useTranslation();
    const isActive = true;

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
                <Button type="ghost">{t('pages.areaManagement.engage')}</Button>
            </div>
        </div>
    );
};

import React from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from 'shared';
import { AreaClaim, AreaManagementTable } from 'features';
import styles from './styles.module.scss';

export const AreaManagementPage = () => {
    const { t } = useTranslation();

    const isActive = true;

    return (
        <Page headerTitle={t('pages.areaManagement.title')}>
            <AreaClaim isActive={isActive} />
            <div className={styles.miningSlots}>
                {t('pages.areaManagement.mineSlots')} <span>10/100</span>
            </div>
            <AreaManagementTable disabled={!isActive} />
        </Page>
    );
};

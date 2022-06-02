import { Page } from 'shared';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { Addons, MineControlPanel } from 'features';
import styles from './styles.module.scss';

export const MineManagementPage = () => {
    const { t } = useTranslation();

    return (
        <Page headerTitle={t('pages.mineManagement.title')}>
            <div className={styles.item}>
                <MineControlPanel />
            </div>

            <Addons />
        </Page>
    );
};

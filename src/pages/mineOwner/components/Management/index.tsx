import { Page, useChainAuthContext } from 'shared';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { Addons, MineControlPanel } from 'features';
import styles from './styles.module.scss';

export const MineManagementPage = () => {
    const { t } = useTranslation();
    const chainAccount = useChainAuthContext();
    const chainAccountName = chainAccount?.activeUser?.accountName;

    return (
        <Page headerTitle={t('pages.mineManagement.title')}>
            {chainAccountName && (
                <div className={styles.item}>
                    <MineControlPanel chainAccountName={chainAccountName} />
                </div>
            )}

            <Addons />
        </Page>
    );
};

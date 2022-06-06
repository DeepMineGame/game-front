import { Page, useAccountName, KeyValueTable } from 'shared';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { Addons, MineControlPanel } from 'features';
import { useStore } from 'effector-react';
import { minesStore } from 'entities/smartcontract';
import styles from './styles.module.scss';

export const MineManagementPage = () => {
    const { t } = useTranslation();
    const mineStore = useStore(minesStore);
    const mine = mineStore?.[0];
    const chainAccountName = useAccountName();
    return (
        <Page headerTitle={t('pages.mineManagement.title')}>
            {chainAccountName && (
                <div className={styles.item}>
                    <MineControlPanel chainAccountName={chainAccountName} />
                </div>
            )}

            <div className={styles.table}>
                <KeyValueTable
                    items={{
                        [t('features.mining.mineLevel')]: mine?.level,
                        [t('features.mining.mineSublevel')]: mine?.sub_level,
                        [t('features.mining.depthLevel')]: mine?.layer_depth,
                    }}
                />
            </div>
            <Addons />
        </Page>
    );
};

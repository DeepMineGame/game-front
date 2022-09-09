import { Page, useAccountName, KeyValueTable } from 'shared';
import { useTranslation } from 'react-i18next';
import { Addons, MineControlPanel, userMineStore } from 'features';
import { useStore } from 'effector-react';
import styles from './styles.module.scss';

export const MineManagementPage = () => {
    const { t } = useTranslation();
    const mineStore = useStore(userMineStore);
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

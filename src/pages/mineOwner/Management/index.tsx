import { Page, useAccountName, KeyValueTable } from 'shared';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { Addons, MineControlPanel, $userMine } from 'features';
import { useStore } from 'effector-react';
import { Progress, Space } from 'antd';
import styles from './styles.module.scss';
import { DepthChanger } from './ui/DepthChanger';

const SUB_LEVELS_MAX_AMOUNT = 5;

export const MineManagementPage = () => {
    const mineStore = useStore($userMine);
    const mine = mineStore?.[0];

    const { t } = useTranslation();
    const chainAccountName = useAccountName();
    const mineSubLevelToPercent =
        mine &&
        mine.sublevel > 0 &&
        (mine.sublevel + 1 / SUB_LEVELS_MAX_AMOUNT) * 100;

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

                        [t('features.mining.mineSublevel')]: (
                            <Progress
                                percent={mineSubLevelToPercent || 0}
                                steps={5}
                            />
                        ),
                        [t('features.mining.depthLevel')]: (
                            <Space>
                                <div>
                                    {t('features.mining.currentDepthLevel')}{' '}
                                    {mine?.layer_depth}
                                </div>
                                <DepthChanger />
                            </Space>
                        ),
                    }}
                />
            </div>
            <Addons />
        </Page>
    );
};

import { DMECoinIcon, KeyValueTable, Page, useAccountName } from 'shared';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { $userMine, Addons, MineControlPanel, $mineNft } from 'features';
import { useStore } from 'effector-react';
import { Progress, Space, Tooltip } from 'antd';
import Icon, { InfoCircleOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
import { DepthChanger } from './ui/DepthChanger';

const SUB_LEVELS_MAX_AMOUNT = 5;

export const MineManagementPage = () => {
    const mine = useStore($userMine);
    const mineNft = useStore($mineNft);

    const dmeToLevelUpgradePercent =
        mineNft &&
        Math.floor(
            (100 * Number(mineNft?.data['DME Mined'])) /
                Number(mineNft?.data['DME to Upgrade'])
        );
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
                        [t('features.mining.mineLevel')]: (
                            <div className={styles.mineLevelLine}>
                                <Progress
                                    className={styles.mineLevelProgress}
                                    percent={Number(
                                        dmeToLevelUpgradePercent || 0
                                    )}
                                    showInfo={false}
                                />{' '}
                                {mineNft?.data['DME Mined'] &&
                                mineNft?.data['DME to Upgrade'] ? (
                                    <>
                                        <span>
                                            {Math.floor(
                                                mineNft?.data['DME Mined']
                                            )}
                                        </span>
                                        /
                                        <span>
                                            {Math.floor(
                                                mineNft?.data['DME to Upgrade']
                                            )}
                                        </span>
                                    </>
                                ) : null}
                                {'\u00a0'}
                                <Icon component={DMECoinIcon} />
                                {'\u00a0'}
                                <Tooltip overlay="DME to claim to unlock next level">
                                    <InfoCircleOutlined />
                                </Tooltip>
                                <div>
                                    {'\u00a0'}
                                    {mine?.level}
                                </div>
                            </div>
                        ),

                        [t('features.mining.mineSublevel')]: (
                            <Progress
                                percent={mineSubLevelToPercent || 25}
                                steps={5}
                                showInfo={false}
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

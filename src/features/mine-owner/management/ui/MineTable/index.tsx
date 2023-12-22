import { Progress, Tooltip } from 'antd';
import { DMECoinIcon, neutral3Color, primary6 } from 'shared';
import Icon, { InfoCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';

import { $mineOwnerManagementData } from '../../../models/mineOwnerManagement';
import styles from './styles.module.scss';

const SUB_LEVELS_MAX_AMOUNT = 5;

export const MineTable = () => {
    const { t } = useTranslation();
    const mineOwnerManagementData = useStore($mineOwnerManagementData);

    const mineNft = mineOwnerManagementData?.mine_asset;
    const dmeToLevelUpgradePercent =
        mineNft &&
        Math.floor(
            (100 * Number(mineNft?.dme_mined)) / Number(mineNft?.dme_to_upgrade)
        );
    const mineSubLevelToPercent =
        Number(mineOwnerManagementData?.mine_sublevel) > 0 &&
        ((Number(mineOwnerManagementData?.mine_sublevel) + 1) /
            SUB_LEVELS_MAX_AMOUNT) *
            100;
    return (
        <div className={styles.table}>
            <div className={styles.line}>
                <div>{t('Mine level')}</div>
                <div className={styles.mineLevelLine}>
                    <Progress
                        className={styles.mineLevelProgress}
                        strokeColor={primary6}
                        trailColor={neutral3Color}
                        percent={Number(dmeToLevelUpgradePercent || 0)}
                        showInfo={false}
                    />{' '}
                    {mineNft?.dme_mined && mineNft?.dme_to_upgrade ? (
                        <>
                            <span>{mineNft?.dme_mined}</span>/
                            <span>{mineNft?.dme_to_upgrade}</span>
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
                        {mineOwnerManagementData?.mine_level}
                    </div>
                </div>
            </div>
            <div className={styles.line}>
                <div>{t('Mine sublevel')}</div>
                <div>
                    <Progress
                        percent={mineSubLevelToPercent || 25}
                        steps={5}
                        showInfo={false}
                        strokeColor={primary6}
                        trailColor={neutral3Color}
                    />
                </div>
            </div>
            {/* <div className={styles.line}> */}
            {/*    <div>{t('Depth level')}</div> */}
            {/*    <Space> */}
            {/*        <div> */}
            {/*            {t('features.mining.currentDepthLevel')}{' '} */}
            {/*            {mine?.layer_depth} */}
            {/*        </div> */}
            {/*        <DepthChanger /> */}
            {/*    </Space> */}
            {/* </div> */}
        </div>
    );
};

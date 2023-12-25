import { App, Dropdown, Menu } from 'antd';
import React, { useState } from 'react';
import { useSmartContractActionDynamic } from 'features';
import {
    ActionModal,
    getTimeLeftFromUtc,
    Loader,
    useAccountName,
    useReloadPage,
    useTick,
} from 'shared';
import { useGate, useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { cmdStart, cmdFinish } from 'entities/smartcontract';
import { $changeDepthAction, ChangeDepthGate } from '../../model';
import { $mineOwnerManagementData } from '../../../models/mineOwnerManagement';
import styles from './styles.module.scss';

export const DepthChanger = () => {
    const { modal } = App.useApp();
    const mineOwnerManagementData = useStore($mineOwnerManagementData);

    const accountName = useAccountName();
    const reloadPage = useReloadPage();
    const { t } = useTranslation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedDepth, setSelectedDepth] = useState(0);

    useGate(ChangeDepthGate, { searchParam: accountName });
    const changeDepthAction = useStore($changeDepthAction);
    const changeDepthToAttr = changeDepthAction?.attrs.find(
        ({ first }) => first === 'depth_to'
    )?.second;
    const isTimeExpire =
        Date.now() >= (changeDepthAction?.finishes_at || 0) * 1000;
    const ableToFinalise = mineOwnerManagementData?.change_depth_in_progress
        ? getTimeLeftFromUtc(mineOwnerManagementData.change_depth_seconds_left)
        : '';
    const callAction = useSmartContractActionDynamic();
    const getMenuItemsByCount = (amount: number) =>
        Array.from(Array(amount).keys()).map((key) => ({
            key,
            label: key,
            onClick: () => {
                setModalVisible(true);
                setSelectedDepth(key);
            },
        }));
    useTick(!isTimeExpire);
    const timeExpireText = isTimeExpire ? (
        t('features.mineOwner.management.changeDepth')
    ) : (
        <div>
            <Loader className={styles.loader} size="small" />{' '}
            <span className={styles.timer}>
                {mineOwnerManagementData?.change_depth_seconds_left}
            </span>{' '}
            {t('features.mineOwner.management.changeMineDepth')}
        </div>
    );

    const amountSection = ableToFinalise ? null : changeDepthToAttr;
    const finishChangeDepthAction = () =>
        callAction(
            cmdFinish({
                waxUser: accountName,
                mineId: mineOwnerManagementData?.mine_asset.asset_id!,
            })
        )?.then(reloadPage);
    const notifyAboutToChangeDepthNeeded = () =>
        modal.warning({
            title: t('features.mineOwner.management.selectTheDepth'),
        });
    const startChangeDepthAction = () =>
        callAction(
            cmdStart({
                waxUser: accountName,
                mineId: mineOwnerManagementData?.mine_asset.asset_id!,
                depthTo: selectedDepth,
            })
        )?.then(reloadPage);
    return (
        <>
            <Dropdown.Button
                overlay={
                    <Menu
                        disabled={!isTimeExpire && !ableToFinalise}
                        items={getMenuItemsByCount(
                            mineOwnerManagementData?.mine_asset.level
                                ? Number(
                                      (mineOwnerManagementData?.mine_asset
                                          .level || 0) + 1
                                  )
                                : 0
                        )}
                    />
                }
                disabled={mineOwnerManagementData?.mine_asset.level === 0}
                icon={amountSection}
                onClick={
                    ableToFinalise
                        ? finishChangeDepthAction
                        : notifyAboutToChangeDepthNeeded
                }
            >
                {ableToFinalise
                    ? `${t(
                          'features.mineOwner.management.finalizeDepthChange'
                      )} ${changeDepthToAttr}`
                    : timeExpireText}
            </Dropdown.Button>
            <ActionModal
                texts={{
                    onOk: t('Active'),
                    title: t('features.mineOwner.management.changeMineDepth'),
                }}
                costs={{ timeSeconds: 15 }}
                visible={isModalVisible}
                onCancel={() => setModalVisible(false)}
                onSubmit={startChangeDepthAction}
            />
        </>
    );
};

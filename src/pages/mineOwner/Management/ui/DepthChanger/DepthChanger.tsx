import { Dropdown, Menu, Modal } from 'antd';
import React, { useState } from 'react';
import { $userMine, useSmartContractActionDynamic } from 'features';
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
import { ActionState, cmdStart, cmdFinish } from 'entities/smartcontract';
import { $changeDepthAction, ChangeDepthGate } from '../../model';
import styles from './styles.module.scss';

export const DepthChanger = () => {
    const accountName = useAccountName();
    const reloadPage = useReloadPage();
    const { t } = useTranslation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedDepth, setSelectedDepth] = useState(0);

    useGate(ChangeDepthGate, { searchParam: accountName });
    const changeDepthAction = useStore($changeDepthAction);
    const changeDepthToAttr = changeDepthAction?.attrs.find(
        ({ key }) => key === 'depth_to'
    )?.value;
    const isTimeExpire =
        Date.now() >= (changeDepthAction?.finishes_at || 0) * 1000;
    const ableToFinalise =
        changeDepthAction?.state === ActionState.active && isTimeExpire;
    const timeLeft = changeDepthAction?.finishes_at
        ? getTimeLeftFromUtc(changeDepthAction.finishes_at)
        : '';
    const mineStore = useStore($userMine);
    const mine = mineStore?.[0];
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
            <span className={styles.timer}>{timeLeft}</span>{' '}
            {t('features.mineOwner.management.changeMineDepth')}
        </div>
    );

    const amountSection = ableToFinalise ? null : changeDepthToAttr;
    const finishChangeDepthAction = () =>
        callAction(
            cmdFinish({
                waxUser: accountName,
                mineId: mine!.id,
            })
        )?.then(reloadPage);
    const notifyAboutToChangeDepthNeeded = () =>
        Modal.warn({
            title: t('features.mineOwner.management.selectTheDepth'),
        });
    const startChangeDepthAction = () =>
        callAction(
            cmdStart({
                waxUser: accountName,
                mineId: mine!.id,
                depthTo: selectedDepth,
            })
        )?.then(reloadPage);
    return (
        <>
            <Dropdown.Button
                overlay={
                    <Menu
                        disabled={!isTimeExpire && !ableToFinalise}
                        items={getMenuItemsByCount(mine?.level || 0)}
                    />
                }
                disabled={mine?.level === 0}
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
                    onOk: t('components.common.button.activate'),
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

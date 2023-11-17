import { App, Dropdown, Menu } from 'antd';
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
    const { modal } = App.useApp();

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
    const ableToFinalise =
        changeDepthAction?.state === ActionState.active && isTimeExpire;
    const timeLeft = changeDepthAction?.finishes_at
        ? getTimeLeftFromUtc(changeDepthAction.finishes_at)
        : '';
    const mine = useStore($userMine);
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
        modal.warning({
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
                        items={getMenuItemsByCount(
                            mine?.level ? Number(mine.level + 1) : 0
                        )}
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

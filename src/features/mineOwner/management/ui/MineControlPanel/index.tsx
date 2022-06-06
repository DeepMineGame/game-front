import { Button, greenGreen6, sunsetOrange6, Title } from 'shared';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';
import { Badge, Space } from 'antd';
import { useGate, useStore } from 'effector-react';
import { useSmartContractAction } from 'features';
import {
    minesStore,
    MineState,
    deactmine,
    activatemine,
    getMinesByOwnerEffect,
} from 'entities/smartcontract';
import { MineManagementGate } from '../../../models/mineManagement';
import styles from './styles.module.scss';

type Props = {
    chainAccountName: string;
};

export const MineControlPanel: FC<Props> = ({ chainAccountName }) => {
    useGate(MineManagementGate, {
        searchParam: chainAccountName,
    });
    const { t } = useTranslation();
    const isMinesLoading = useStore(getMinesByOwnerEffect.pending);
    const mines = useStore(minesStore);
    const mine = mines?.[0];
    const isMineActive = mine?.state === MineState.activated;
    const statusText = isMineActive
        ? t('pages.mining.active')
        : t('pages.mining.inactive');

    const deactivateMine = useSmartContractAction(
        deactmine({ waxUser: chainAccountName, mineId: mine?.id })
    );
    const activateMine = useSmartContractAction(
        activatemine({ waxUser: chainAccountName, mineId: mine?.id })
    );

    return (
        <div className={styles.background}>
            <Space size="large">
                <Title className={styles.title} fontFamily="orbitron" level={4}>
                    {t('pages.mineManagement.mine')}
                </Title>
                <Badge
                    className={styles.badgeText}
                    color={isMineActive ? greenGreen6 : sunsetOrange6}
                    text={statusText}
                />
            </Space>
            <div>
                <Space direction="vertical">
                    <Button
                        type={isMineActive ? 'ghost' : 'primary'}
                        onClick={isMineActive ? deactivateMine : activateMine}
                        loading={isMinesLoading}
                    >
                        {isMineActive
                            ? t('components.common.button.deactivate')
                            : t('components.common.button.activate')}
                    </Button>
                    <Button
                        ghost
                        danger
                        className={styles.wideButton}
                        loading={isMinesLoading}
                    >
                        {t('features.mineOwner.management.unsetup')}
                    </Button>
                </Space>
            </div>
        </div>
    );
};

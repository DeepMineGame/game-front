import { Button, greenGreen6, sunsetOrange6, Title } from 'shared';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';
import { Badge, Space } from 'antd';
import { useGate, useStore } from 'effector-react';
import { useSmartContractAction } from 'features';
import { FrownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {
    minesStore,
    MineState,
    deactmine,
    activatemine,
    getMinesByOwnerEffect,
} from 'entities/smartcontract';
import { MineManagementGate } from '../../../models/mineManagement';
import { ClaimDME } from '../ClaimDME';
import styles from './styles.module.scss';

type Props = {
    chainAccountName: string;
};

export const MineControlPanel: FC<Props> = ({ chainAccountName }) => {
    useGate(MineManagementGate, {
        searchParam: chainAccountName,
    });
    const navigate = useNavigate();
    const reloadPage = () => navigate(0);
    const { t } = useTranslation();
    const isMinesLoading = useStore(getMinesByOwnerEffect.pending);
    const mines = useStore(minesStore);
    const mine = mines?.[0];
    const isMineActive = mine?.state === MineState.activated;
    const statusText = isMineActive
        ? t('components.common.status.active')
        : t('components.common.status.inactive');

    const deactivateMine = useSmartContractAction(
        deactmine({ waxUser: chainAccountName, mineId: mine?.id })
    );
    const activateMine = useSmartContractAction(
        activatemine({ waxUser: chainAccountName, mineId: mine?.id })
    );
    const onActivationButtonClick = async () => {
        const action = isMineActive ? deactivateMine : activateMine;
        await action();
        return reloadPage();
    };
    if (mines?.length === 0) {
        return (
            <div className={styles.background}>
                <Title className={styles.title}>
                    <Space direction="vertical" align="center">
                        <FrownOutlined />
                        <div>There is no mine</div>
                    </Space>
                </Title>
            </div>
        );
    }

    return (
        <div className={styles.background}>
            <Space direction="vertical">
                <Space size="large">
                    <Title
                        className={styles.title}
                        fontFamily="orbitron"
                        level={4}
                    >
                        {t('pages.mineManagement.mine')}
                    </Title>
                    <Badge
                        className={styles.badgeText}
                        color={isMineActive ? greenGreen6 : sunsetOrange6}
                        text={statusText}
                    />
                </Space>
                <ClaimDME />
            </Space>

            <div>
                <Space direction="vertical">
                    <Button
                        type={isMineActive ? 'ghost' : 'primary'}
                        onClick={onActivationButtonClick}
                        loading={isMinesLoading}
                    >
                        {isMineActive
                            ? t('components.common.button.deactivate')
                            : t('components.common.button.activate')}
                    </Button>
                    <Button
                        disabled
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

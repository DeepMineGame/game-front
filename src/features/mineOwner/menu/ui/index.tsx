import { Space, Tooltip } from 'antd';
import React, { FC } from 'react';
import { Menu, MenuItem } from 'shared';
import {
    DesktopOutlined,
    ProjectOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {
    mineManagement,
    mineOwnerMineCrew,
    mineOwnerStatsAndInfo,
} from 'app/router/paths';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';
import {
    MineConsumerGate,
    mineOwnerCabinState,
    $mineOwnerCabinState,
    $userMine,
} from '../../models';
import styles from './styles.module.scss';

type Props = {
    currentMineOwnerCabinState: mineOwnerCabinState;
    accountName: string;
};
export const MineOwnerMenu: FC<Props> = ({
    currentMineOwnerCabinState,
    accountName,
}) => {
    useGate(MineConsumerGate, { searchParam: accountName });
    const navigate = useNavigate();
    const { t } = useTranslation();
    const userMine = useStore($userMine);
    const cabinState = useStore($mineOwnerCabinState);
    const baseButtonDisableStates = [mineOwnerCabinState.needMineNft];
    const statusThatDisableManagementButton = [...baseButtonDisableStates];
    const statusThatDisableTeamButton = [...baseButtonDisableStates];
    const statusThatDisableStatsButton = [...baseButtonDisableStates];
    const menuItems = [
        {
            link: mineManagement,
            icon: <DesktopOutlined />,
            disabled:
                !userMine ||
                statusThatDisableManagementButton.includes(
                    currentMineOwnerCabinState
                ),
            tooltip: t('pages.mineOwner.menu.manageMine'),
        },
        {
            link: mineOwnerMineCrew,
            icon: <TeamOutlined />,
            disabled:
                !userMine ||
                statusThatDisableTeamButton.includes(
                    currentMineOwnerCabinState
                ),
            tooltip: t('pages.mineOwner.menu.team'),
            ...(cabinState === mineOwnerCabinState.needCrew && {
                showTooltip: true,
            }),
        },
        {
            link: mineOwnerStatsAndInfo,
            icon: <ProjectOutlined />,
            disabled:
                !userMine ||
                statusThatDisableStatsButton.includes(
                    currentMineOwnerCabinState
                ),
            tooltip: t('pages.mineOwner.menu.stats'),
        },
    ];
    return (
        <Menu className={styles.mineOwnerMenu}>
            <Space size="middle">
                {menuItems.map(
                    ({ tooltip, link, icon, disabled, showTooltip }) => (
                        <Tooltip
                            overlay={tooltip}
                            key={tooltip}
                            visible={showTooltip}
                        >
                            <div>
                                <MenuItem
                                    onClick={() => navigate(link)}
                                    icon={icon}
                                    disabled={disabled}
                                />
                            </div>
                        </Tooltip>
                    )
                )}
            </Space>
        </Menu>
    );
};

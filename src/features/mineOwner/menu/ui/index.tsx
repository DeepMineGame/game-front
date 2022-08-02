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
import { mineOwnerCabinState } from '../../models/mineOwnerState';
import { MineConsumerGate, userMineStore } from '../../models';

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
    const userMine = useStore(userMineStore)?.[0];
    const baseButtonDisableStates = [
        mineOwnerCabinState.hasNoMineNft,
        mineOwnerCabinState.needSignContractWithLandLord,
    ];
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
        <Menu>
            <Space>
                {menuItems.map(({ tooltip, link, icon, disabled }) => (
                    <Tooltip overlay={tooltip} key={tooltip}>
                        <div>
                            <MenuItem
                                onClick={() => navigate(link)}
                                icon={icon}
                                disabled={disabled}
                            />
                        </div>
                    </Tooltip>
                ))}
            </Space>
        </Menu>
    );
};

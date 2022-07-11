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
import { mineOwnerCabinState } from '../../models/mineOwnerState';

type Props = {
    currentMineOwnerCabinState: mineOwnerCabinState;
};
export const MineOwnerMenu: FC<Props> = ({ currentMineOwnerCabinState }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const baseButtonDisableStates = [
        mineOwnerCabinState.hasNoMineNft,
        mineOwnerCabinState.needSignContractWithLandLord,
    ];
    const statusThatDisableManagementButton = [...baseButtonDisableStates];
    const statusThatDisableTeamButton = [...baseButtonDisableStates];
    const statusThatDisableStatsButton = [
        ...baseButtonDisableStates,
        mineOwnerCabinState.contractsFree,
    ];
    const menuItems = [
        {
            link: mineManagement,
            icon: <DesktopOutlined />,
            disabled: statusThatDisableManagementButton.includes(
                currentMineOwnerCabinState
            ),
            tooltip: t('pages.mineOwner.menu.manageMine'),
        },
        {
            link: mineOwnerMineCrew,
            icon: <TeamOutlined />,
            disabled: statusThatDisableTeamButton.includes(
                currentMineOwnerCabinState
            ),
            tooltip: t('pages.mineOwner.menu.team'),
        },
        {
            link: mineOwnerStatsAndInfo,
            icon: <ProjectOutlined />,
            disabled: statusThatDisableStatsButton.includes(
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

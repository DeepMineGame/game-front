import { Space } from 'antd';
import React, { FC } from 'react';
import { Menu, MenuItem } from 'shared';
import {
    DesktopOutlined,
    ProjectOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mineManagement, mineOwnerStatsAndInfo } from 'app/router/paths';
import { mineOwnerCabinState } from '../../models/mineOwnerState';

type Props = {
    currentMineOwnerCabinState: mineOwnerCabinState;
};
export const MineOwnerMenu: FC<Props> = ({ currentMineOwnerCabinState }) => {
    const navigate = useNavigate();
    const baseButtonDisableStates = [
        mineOwnerCabinState.hasNoMineNft,
        mineOwnerCabinState.isOutsideFromLocation,
        mineOwnerCabinState.needSignContractWithLandLord,
    ];
    const statusThatDisableManagementButton = [
        ...baseButtonDisableStates,
        mineOwnerCabinState.isMineSet,
    ];
    const statusThatDisableTeamButton = [...baseButtonDisableStates];
    const statusThatDisableStatsButton = [
        ...baseButtonDisableStates,
        mineOwnerCabinState.contractsFree,
    ];

    return (
        <Menu>
            <Space>
                <MenuItem
                    onClick={() => navigate(mineOwnerStatsAndInfo)}
                    icon={<DesktopOutlined />}
                    disabled={statusThatDisableManagementButton.includes(
                        currentMineOwnerCabinState
                    )}
                />
                <MenuItem
                    onClick={() => {}}
                    icon={<TeamOutlined />}
                    disabled={statusThatDisableTeamButton.includes(
                        currentMineOwnerCabinState
                    )}
                />
                <MenuItem
                    onClick={() => navigate(mineManagement)}
                    icon={<ProjectOutlined />}
                    disabled={statusThatDisableStatsButton.includes(
                        currentMineOwnerCabinState
                    )}
                />
            </Space>
        </Menu>
    );
};

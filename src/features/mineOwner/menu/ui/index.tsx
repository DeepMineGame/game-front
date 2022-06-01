import { Space } from 'antd';
import React, { FC } from 'react';
import { Menu, MenuItem } from 'shared';
import {
    DesktopOutlined,
    ProjectOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import { mineOwnerCabinState } from '../../model';

type Props = {
    currentMineOwnerCabinState: mineOwnerCabinState;
};
export const MineOwnerMenu: FC<Props> = ({ currentMineOwnerCabinState }) => {
    const prepareStates = [
        mineOwnerCabinState.hasNoMineNft,
        mineOwnerCabinState.isOutsideFromLocation,
        mineOwnerCabinState.needSignContractWithLandLord,
    ];
    const statusThatDisableManagementButton = [
        ...prepareStates,
        mineOwnerCabinState.isMineSet,
    ];
    const statusThatDisableTeamButton = [...prepareStates];
    const statusThatDisableStatsButton = [
        ...prepareStates,
        mineOwnerCabinState.isMineSet,
        mineOwnerCabinState.contractsFree,
    ];

    return (
        <Menu>
            <Space>
                <MenuItem
                    onClick={() => {}}
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
                    onClick={() => {}}
                    icon={<ProjectOutlined />}
                    disabled={statusThatDisableStatsButton.includes(
                        currentMineOwnerCabinState
                    )}
                />
            </Space>
        </Menu>
    );
};

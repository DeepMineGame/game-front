import { Space } from 'antd';
import React, { FC } from 'react';
import { Menu, MenuItem } from 'shared';
import { DesktopOutlined } from '@ant-design/icons';
import { mineOwnerCabinState } from '../../model';

type Props = {
    currentMineOwnerCabinState: mineOwnerCabinState;
};
export const MineOwnerMenu: FC<Props> = ({ currentMineOwnerCabinState }) => {
    const statusThatDisableManagementButton = [
        mineOwnerCabinState.hasNoMineNft,
        mineOwnerCabinState.isOutsideFromLocation,
        mineOwnerCabinState.needSignContractWithLandLord,
        mineOwnerCabinState.isMineSetupInProgress,
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
                    tooltipText="Go here to form a team"
                />
            </Space>
        </Menu>
    );
};

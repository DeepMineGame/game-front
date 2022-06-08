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
                <Tooltip overlay={t('pages.mineOwner.menu.manageMine')}>
                    {/* TODO: Remove div wrapper after figure out why it doesn't work without it */}
                    <div>
                        <MenuItem
                            onClick={() => navigate(mineOwnerStatsAndInfo)}
                            icon={<DesktopOutlined />}
                            disabled={statusThatDisableManagementButton.includes(
                                currentMineOwnerCabinState
                            )}
                        />
                    </div>
                </Tooltip>
                <Tooltip overlay={t('pages.mineOwner.menu.team')}>
                    <div>
                        <MenuItem
                            onClick={() => navigate(mineOwnerMineCrew)}
                            icon={<TeamOutlined />}
                            disabled={statusThatDisableTeamButton.includes(
                                currentMineOwnerCabinState
                            )}
                        />
                    </div>
                </Tooltip>
                <Tooltip overlay={t('pages.mineOwner.menu.stats')}>
                    <div>
                        <MenuItem
                            onClick={() => navigate(mineManagement)}
                            icon={<ProjectOutlined />}
                            disabled={statusThatDisableStatsButton.includes(
                                currentMineOwnerCabinState
                            )}
                        />
                    </div>
                </Tooltip>
            </Space>
        </Menu>
    );
};

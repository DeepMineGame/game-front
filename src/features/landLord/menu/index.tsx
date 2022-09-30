import { Space, Tooltip } from 'antd';
import React, { FC } from 'react';
import { Menu, MenuItem } from 'shared';
import { BuildOutlined, ProjectOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { areaManagement, landLordStats } from 'app/router/paths';
import { useTranslation } from 'react-i18next';
import { CABIN_STATUS, useLandLordStatus } from '../cabin';

export const LandLordMenu: FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { status } = useLandLordStatus();

    return (
        <Menu>
            <Space size="middle">
                <Tooltip overlay={t('pages.landLord.menu.goLandActivate')}>
                    {/* TODO: Remove div wrapper after figure out why it doesn't work without it */}
                    <div>
                        <MenuItem
                            onClick={() => navigate(areaManagement)}
                            icon={<BuildOutlined />}
                            disabled={status < CABIN_STATUS.setup}
                        />
                    </div>
                </Tooltip>
                <Tooltip overlay={t('pages.landLord.menu.statsAndInfo')}>
                    <div>
                        <MenuItem
                            onClick={() => navigate(landLordStats)}
                            icon={<ProjectOutlined />}
                            disabled={status < CABIN_STATUS.searching}
                        />
                    </div>
                </Tooltip>
            </Space>
        </Menu>
    );
};

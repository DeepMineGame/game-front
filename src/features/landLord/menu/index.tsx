import { Space } from 'antd';
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
                <MenuItem
                    onClick={() => navigate(areaManagement)}
                    icon={<BuildOutlined />}
                    disabled={status < CABIN_STATUS.setup}
                    tooltipOverlay={t('pages.landLord.menu.goLandActivate')}
                />
                <MenuItem
                    onClick={() => navigate(landLordStats)}
                    icon={<ProjectOutlined />}
                    disabled={status < CABIN_STATUS.searching}
                    tooltipOverlay={t('pages.landLord.menu.statsAndInfo')}
                />
            </Space>
        </Menu>
    );
};

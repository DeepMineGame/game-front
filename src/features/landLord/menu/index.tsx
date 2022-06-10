import { Space, Tooltip } from 'antd';
import React, { FC } from 'react';
import { Menu, MenuItem } from 'shared';
import { BuildOutlined, ProjectOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { wipPage } from 'app/router/paths';
import { useTranslation } from 'react-i18next';

export const LandLordMenu: FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Menu>
            <Space>
                <Tooltip overlay={t('pages.landLord.menu.goLandActivate')}>
                    {/* TODO: Remove div wrapper after figure out why it doesn't work without it */}
                    <div>
                        <MenuItem
                            onClick={() => navigate(wipPage)}
                            icon={<BuildOutlined />}
                            disabled
                        />
                    </div>
                </Tooltip>
                <Tooltip overlay={t('pages.landLord.menu.statsAndInfo')}>
                    <div>
                        <MenuItem
                            onClick={() => navigate(wipPage)}
                            icon={<ProjectOutlined />}
                            disabled
                        />
                    </div>
                </Tooltip>
            </Space>
        </Menu>
    );
};

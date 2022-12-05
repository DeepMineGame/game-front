import { Space, Tooltip } from 'antd';
import React, { FC } from 'react';
import { Menu, MenuItem } from 'shared';
import { BuildOutlined, ProjectOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { areaManagement, landLordStats } from 'app/router/paths';
import { useTranslation } from 'react-i18next';
import { CABIN_STATUS, useLandLordStatus } from '../cabin';

const getTooltipForFirstItem = (status: CABIN_STATUS) => {
    if (status <= CABIN_STATUS.engage) return 'goLandActivate';
    if (status === CABIN_STATUS.setup) return 'installMineTooltip';

    return 'manageAreaTooltip';
};

export const LandLordMenu: FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { status } = useLandLordStatus();
    const tooltip = getTooltipForFirstItem(status);

    return (
        <Menu>
            <Space size="middle">
                <Tooltip overlay={t(`pages.landLord.menu.${tooltip}`)}>
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

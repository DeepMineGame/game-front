import React, { FC } from 'react';
import { Menu, MenuItem, Page, useAccountName, useReloadPage } from 'shared';
import { useStore } from 'effector-react';
import { Travel } from 'features';
import { Space, Tooltip } from 'antd';
import { AreaChartOutlined, HddOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { warehouse } from 'app/router/paths';
import { Flat, isUserInHive } from 'features/hive';
import { LOCATION_TO_ID } from 'entities/smartcontract';
import styles from './styles.module.scss';

export * from './info';

export const HivePage: FC = () => {
    const isUserInFlat = useStore(isUserInHive);
    const accountName = useAccountName();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const reloadPage = useReloadPage();
    return (
        <Flat>
            <Page className={styles.page} headerTitle="Hive" />
            {!isUserInFlat && (
                <Travel
                    toLocationId={LOCATION_TO_ID.hive}
                    onSuccess={reloadPage}
                />
            )}
            <Menu>
                <Space size="middle">
                    <Tooltip overlay={t('components.hive.info&Actions')}>
                        {/* TODO: Remove div wrapper after figure out why it doesn't work without it */}
                        <div>
                            <MenuItem
                                onClick={() => navigate(`/user/${accountName}`)}
                                icon={<AreaChartOutlined />}
                            />
                        </div>
                    </Tooltip>
                    <Tooltip overlay={t('components.hive.warehouse')}>
                        <div>
                            <MenuItem
                                onClick={() => navigate(warehouse)}
                                icon={<HddOutlined />}
                            />
                        </div>
                    </Tooltip>
                </Space>
            </Menu>
        </Flat>
    );
};

import { useNavigate } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons';
import React from 'react';
import { useLogout } from 'features';
import { Dropdown } from 'shared';
import { hive } from 'app/router/paths';
import { useTranslation } from 'react-i18next';
import styles from '../../styles.module.scss';

export function SettingMenu() {
    const navigate = useNavigate();
    const logout = useLogout(() => navigate('/'));
    const { t } = useTranslation();

    return (
        <Dropdown
            items={[
                {
                    label: t('components.user.accountSettings'),
                    key: 'Account settings',
                    onClick: () => navigate(hive),
                },
                {
                    label: t('components.user.personalInfo'),
                    key: 'Personal information',
                    onClick: () => navigate(hive),
                },
                {
                    type: 'divider',
                },
                {
                    label: t('components.common.logout'),
                    key: 'logout',
                    onClick: logout,
                },
            ]}
        >
            <div className={styles.settingsIcon}>
                <SettingOutlined />
            </div>
        </Dropdown>
    );
}

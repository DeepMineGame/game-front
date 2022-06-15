import { useNavigate } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons';
import React from 'react';
import { useLogout } from 'features';
import { Dropdown, useAccountName } from 'shared';
import { hive } from 'app/router/paths';
import { useTranslation } from 'react-i18next';
import styles from '../../styles.module.scss';

export function SettingMenu() {
    const navigate = useNavigate();
    const accountName = useAccountName();
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
                    onClick: () => navigate(`/user/${accountName}`),
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

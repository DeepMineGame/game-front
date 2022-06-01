import { Button, sunsetOrange6, Title } from 'shared';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { Badge, Space } from 'antd';
import styles from './styles.module.scss';

export function MineControlPanel() {
    const { t } = useTranslation();

    return (
        <div className={styles.background}>
            <Space size="large">
                <Title className={styles.title} fontFamily="orbitron" level={4}>
                    {t('pages.mineManagement.mine')}
                </Title>
                <Badge
                    className={styles.badgeText}
                    color={sunsetOrange6}
                    text="Inactive"
                />
            </Space>
            <div>
                <Space direction="vertical">
                    <Button type="primary">Activate</Button>
                    <Button ghost danger>
                        Unsetup
                    </Button>
                </Space>
            </div>
        </div>
    );
}

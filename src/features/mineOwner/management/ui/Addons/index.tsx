import { Button, Petobot, Title } from 'shared';
import React, { FC } from 'react';
import { Space, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import Icon, { GroupOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';

export const Addons: FC = () => {
    const { t } = useTranslation();

    return (
        <Tooltip overlay="Coming soon...">
            <div className={styles.background}>
                <Title
                    level={4}
                    className={styles.disabled}
                    fontFamily="orbitron"
                >
                    {t('features.mineOwner.management.addons')}
                </Title>
                <Space>
                    <Button
                        disabled
                        ghost
                        icon={
                            <Icon
                                className={styles.disabledIcon}
                                component={Petobot}
                            />
                        }
                    >
                        {t('features.mineOwner.management.petobot')}
                    </Button>
                    <Button disabled ghost icon={<GroupOutlined />}>
                        {t('features.mineOwner.management.modules')}
                    </Button>
                </Space>
            </div>
        </Tooltip>
    );
};

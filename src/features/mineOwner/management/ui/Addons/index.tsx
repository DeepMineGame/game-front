import { Button, Petobot, Title, Tooltip } from 'shared';
import { FC } from 'react';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';
import Icon, { GroupOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';

export const Addons: FC = () => {
    const { t } = useTranslation();

    return (
        <Tooltip overlay="Coming soon...">
            <div className={styles.background}>
                <Title level={4}>
                    {t('features.mineOwner.management.addons')}
                </Title>
                <Space>
                    <Button disabled ghost icon={<Icon component={Petobot} />}>
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

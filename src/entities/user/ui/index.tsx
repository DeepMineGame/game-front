import { FC, useState } from 'react';
import { Row, Space } from 'antd';
import {
    Button,
    Drawer,
    KeyValueTable,
    Text,
    Title,
    WaxCoinIcon,
} from 'shared';
import Icon, { DatabaseOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { UserAction } from 'features';
import { useNavigate } from 'react-router-dom';
import { useGate, useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { warehouse } from 'app/router/paths';
import { smartContractUserStore } from 'entities/smartcontract';
import { locationMap } from '../../smartcontract';
import { balancesStore, UserGate } from '../model';
import styles from './styles.module.scss';
import { AvatarWithLvl } from './components/AvatarWithLvl';
import { SettingMenu } from './components/SettingMenu';

type Props = {
    user: string;
};

export * from './components/UserLocator';

export const UserAvatarAndDrawer: FC<Props> = ({ user }) => {
    useGate(UserGate, { searchParam: user });
    const navigate = useNavigate();
    const smartContractUsers = useStore(smartContractUserStore);
    const smartContractUserData = smartContractUsers?.[0];
    const { waxBalance, dmeBalance } = useStore(balancesStore);
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const avatar = smartContractUserData ? (
        <AvatarWithLvl
            onClick={showDrawer}
            smartContractUserData={smartContractUserData}
        />
    ) : (
        <div>
            <SettingMenu />
        </div>
    );
    return (
        <>
            <Row>
                <Space size={12}>
                    {smartContractUserData && (
                        <Row align="middle">
                            <Space size={8}>
                                <ThunderboltOutlined />
                                <Title level={5}>
                                    {smartContractUserData?.stamina}
                                </Title>
                            </Space>
                        </Row>
                    )}
                    {avatar}
                </Space>
            </Row>
            <Drawer
                placement="right"
                onClose={onClose}
                visible={visible}
                closable={false}
                width={292}
                title={
                    <>
                        <Space align="start" size={12}>
                            {avatar}
                            <Space direction="vertical" size={0}>
                                <Title level={5}>
                                    {smartContractUserData?.owner}
                                </Title>
                                <Text variant="body1">
                                    {`${t('components.common.level')} ${
                                        smartContractUserData?.level
                                    }`}
                                </Text>
                                <Text variant="body1">
                                    {`${t('components.common.exp')} ${
                                        smartContractUserData?.experience
                                    }`}
                                </Text>
                            </Space>
                        </Space>

                        <Row justify="space-between">
                            <Text>{user}</Text>
                            {waxBalance && (
                                <Text strong>
                                    <Icon component={WaxCoinIcon} />
                                    {` ${waxBalance}`}
                                </Text>
                            )}
                        </Row>
                    </>
                }
            >
                <SettingMenu />
                <div className={styles.grid}>
                    <div>
                        <Text variant="body1">{t('kit.timer.energy')}</Text>
                        <div>
                            <Text strong>
                                {smartContractUserData?.stamina || '-'}
                            </Text>
                        </div>
                    </div>
                    <div>
                        <Text variant="body1">
                            {t('components.common.reputation')}
                        </Text>
                        <div>
                            <Text strong>
                                {smartContractUserData?.reputation || '-'}
                            </Text>
                        </div>
                    </div>
                    <div>
                        <Text variant="body1">
                            {t('components.common.button.dme')}
                        </Text>
                        <div>
                            <Text strong>{dmeBalance}</Text>
                        </div>
                    </div>
                    <div>
                        <Text variant="body1">
                            {t('components.common.button.dmp')}
                        </Text>
                        <div>
                            <Text strong>-</Text>
                        </div>
                    </div>
                </div>
                <div>
                    {smartContractUserData && (
                        <>
                            <KeyValueTable
                                className={styles.location}
                                items={{
                                    Location: (
                                        <Text variant="body1" strong>
                                            {
                                                locationMap[
                                                    smartContractUserData
                                                        .location
                                                ]
                                            }
                                        </Text>
                                    ),
                                }}
                            />
                            <UserAction
                                className={styles.userAction}
                                smartContractUserData={smartContractUserData}
                            />
                        </>
                    )}
                </div>
                <div className={styles.buttonWrapper}>
                    <Button
                        ghost
                        block
                        type="default"
                        icon={<DatabaseOutlined />}
                        onClick={() => navigate(warehouse)}
                    >
                        {t('components.common.inventory')}
                    </Button>
                </div>
            </Drawer>
        </>
    );
};

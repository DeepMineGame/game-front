import React, { FC, useState } from 'react';
import { Space } from 'antd';
import {
    Button,
    Divider,
    Drawer,
    KeyValueTable,
    neutral3Color,
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
import {
    rolesStore,
    smartContractUserStore,
    UserRoles,
} from 'entities/smartcontract';

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
    const roles = useStore(rolesStore) || [];
    const navigate = useNavigate();
    const smartContractUsers = useStore(smartContractUserStore);
    const smartContractUserData = smartContractUsers?.[0];
    const { waxBalance, dmeBalance } = useStore(balancesStore);
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);
    const citizenRole = roles.find(({ role }) => role === UserRoles.citizen);
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
            <div className={styles.wrapper}>
                {smartContractUserData && (
                    <div>
                        <ThunderboltOutlined />
                        <span>
                            <Text
                                className={styles.energyCount}
                                fontFamily="orbitron"
                            >
                                {smartContractUserData?.stamina}
                            </Text>
                        </span>
                    </div>
                )}
                {avatar}
            </div>
            <Drawer
                placement="right"
                onClose={onClose}
                visible={visible}
                closable={false}
                width={292}
                bodyStyle={{
                    background: neutral3Color,
                    padding: 0,
                    position: 'relative',
                }}
            >
                <SettingMenu />
                <div className={styles.item}>
                    <Space>
                        {avatar}
                        <div className={styles.userMenuHeader}>
                            <Title
                                className={styles.name}
                                level={5}
                                fontFamily="orbitron"
                            >
                                {smartContractUserData?.owner}
                            </Title>
                            <div>
                                {t('components.common.level')}{' '}
                                {citizenRole?.level}
                            </div>
                            <div>
                                {t('components.common.exp')}{' '}
                                {citizenRole?.experience}
                            </div>
                        </div>
                    </Space>
                    <div className={styles.attrs}>
                        {user && <div>{user}</div>}
                        {waxBalance && (
                            <Title level={5} className={styles.dataUnitTitle}>
                                <Icon component={WaxCoinIcon} /> {waxBalance}
                            </Title>
                        )}
                    </div>
                </div>
                <Divider />
                <div className={styles.grid}>
                    <div>
                        <div>{t('kit.timer.energy')}</div>
                        <Title className={styles.dataUnitTitle} level={5}>
                            {smartContractUserData?.stamina || '-'}
                        </Title>
                    </div>
                    <div>
                        <div>{t('components.common.button.dme')}</div>
                        <Title className={styles.dataUnitTitle} level={5}>
                            {dmeBalance}
                        </Title>
                    </div>
                    <div>
                        <div>{t('components.common.button.dmp')}</div>
                        <Title className={styles.dataUnitTitle} level={5}>
                            -
                        </Title>
                    </div>
                </div>
                <div>
                    {smartContractUserData && (
                        <>
                            <KeyValueTable
                                className={styles.location}
                                items={{
                                    Location: (
                                        <Title level={5} style={{ margin: 0 }}>
                                            {
                                                locationMap[
                                                    smartContractUserData
                                                        .location
                                                ]
                                            }
                                        </Title>
                                    ),
                                }}
                            />
                            <UserAction />
                        </>
                    )}
                </div>
                <div className={styles.buttonWrapper}>
                    <Button
                        className={styles.button}
                        ghost
                        icon={<DatabaseOutlined />}
                        onClick={() => navigate(warehouse)}
                        size="large"
                    >
                        {t('components.common.inventory')}
                    </Button>
                </div>
            </Drawer>
        </>
    );
};

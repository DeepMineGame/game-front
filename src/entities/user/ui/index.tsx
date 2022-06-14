import React, { FC, useState } from 'react';
import { Avatar, Badge, Progress, Space } from 'antd';
import {
    AvatarIcon,
    Button,
    Divider,
    Drawer,
    KeyValueTable,
    neutral3Color,
    Text,
    Title,
    useTableData,
    WaxCoinIcon,
} from 'shared';
import Icon, {
    DatabaseOutlined,
    LogoutOutlined,
    ThunderboltOutlined,
} from '@ant-design/icons';
import { useLogout, UserAction } from 'features';
import { useNavigate } from 'react-router-dom';
import { useGate, useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { inventory } from 'app/router/paths';
import {
    getUserConfig,
    smartContractUserStore,
    UserInfoType,
} from 'entities/smartcontract';
import { User } from '../model/type';

import { locationMap } from '../../smartcontract';
import { balancesStore, UserGate } from '../model';
import styles from './styles.module.scss';

type Props = {
    user: User;
};

export const UserAvatarAndDrawer: FC<Props> = ({ user }) => {
    useGate(UserGate, { searchParam: user.wax_address });
    const avatar = () => <Avatar src={user?.avatar} icon={<AvatarIcon />} />;
    const navigate = useNavigate();
    const logout = useLogout(() => navigate('/'));
    const smartContractUsers = useStore(smartContractUserStore);
    const smartContractUserData = smartContractUsers?.[0];
    const { waxBalance, dmeBalance } = useStore(balancesStore);
    const { t } = useTranslation();
    const userInfo = useTableData<UserInfoType>(getUserConfig)?.[0];
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const avatarWithData = (
        <Text fontFamily="bai" onClick={showDrawer}>
            <Badge
                count={smartContractUserData?.level}
                showZero
                offset={[-35, 30]}
                color={neutral3Color}
                size="small"
            >
                <Progress
                    percent={smartContractUserData?.experience}
                    type="circle"
                    width={38}
                    format={avatar}
                    strokeWidth={8}
                    strokeColor="#F5C913"
                />
            </Badge>
        </Text>
    );

    return (
        <>
            <div className={styles.wrapper}>
                <div>
                    <ThunderboltOutlined />
                    <span>
                        <Text
                            className={styles.energyCount}
                            fontFamily="orbitron"
                        >
                            {userInfo?.stamina}
                        </Text>
                    </span>
                </div>
                {avatarWithData}
            </div>
            <Drawer
                placement="right"
                onClose={onClose}
                visible={visible}
                closable={false}
                width={292}
                bodyStyle={{ background: neutral3Color, padding: 0 }}
            >
                <div className={styles.item}>
                    <Space>
                        {avatarWithData}
                        <div className={styles.userMenuHeader}>
                            <Title
                                className={styles.name}
                                level={5}
                                fontFamily="orbitron"
                            >
                                {smartContractUserData?.owner}
                            </Title>
                            <div>Level {smartContractUserData?.level}</div>
                        </div>
                    </Space>
                    <div className={styles.attrs}>
                        {user?.wax_address && <div>{user.wax_address}</div>}
                        {waxBalance && (
                            <Title level={5} className={styles.dataUnitTitle}>
                                <Icon component={WaxCoinIcon} /> {waxBalance}
                            </Title>
                        )}
                    </div>
                </div>
                <Divider />
                <div className={cn(styles.dataUnit)}>
                    <div>
                        <div>{t('kit.timer.energy')}</div>
                        <Title className={styles.dataUnitTitle} level={5}>
                            {userInfo?.stamina || '-'}
                        </Title>
                    </div>
                    <div>
                        <div>{t('components.common.reputation')}</div>
                        <Title className={styles.dataUnitTitle} level={5}>
                            {userInfo?.reputation || '-'}
                        </Title>
                    </div>
                </div>
                <div className={cn(styles.dataUnit)}>
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
                                        <Title
                                            level={5}
                                            title={styles.locationTitle}
                                        >
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
                            <UserAction
                                className={styles.userAction}
                                smartContractUserData={smartContractUserData}
                            />
                        </>
                    )}
                </div>
                <div>
                    <Button
                        className={styles.logoutButton}
                        ghost
                        icon={<LogoutOutlined />}
                        onClick={logout}
                    >
                        {t('components.common.logout')}
                    </Button>
                    <Button
                        className={styles.logoutButton}
                        ghost
                        icon={<DatabaseOutlined />}
                        onClick={() => navigate(inventory)}
                    >
                        {t('components.common.inventory')}
                    </Button>
                </div>
            </Drawer>
        </>
    );
};

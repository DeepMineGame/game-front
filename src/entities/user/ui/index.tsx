import React, { FC, useEffect, useState } from 'react';
import { Avatar, Badge, Progress } from 'antd';
import {
    AvatarIcon,
    Button,
    Divider,
    Dropdown,
    neutral3Color,
    Text,
    WaxCoinIcon,
} from 'shared';
import Icon, { LogoutOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useLogout, fetchWaxBalance } from 'features';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import {
    getSmartContractUserEffect,
    smartContractUserStore,
} from 'entities/smartcontract';
import { User } from '../model/type';

import styles from './styles.module.scss';

type Props = {
    user: User | null;
};

export const UserAvatar: FC<Props> = ({ user }) => {
    const avatar = () => <Avatar src={user?.avatar} icon={<AvatarIcon />} />;
    const navigate = useNavigate();
    const logout = useLogout(() => navigate('/'));
    const smartContractUsers = useStore(smartContractUserStore);
    const smartContractUserData = smartContractUsers?.[0];
    const [waxBalance, setWaxBalance] = useState<null | string>(null);
    const { t } = useTranslation();

    useEffect(() => {
        if (user?.wax_address) {
            getSmartContractUserEffect({
                searchParam: user?.wax_address,
            });
        }
    }, [user?.wax_address]);

    useEffect(() => {
        if (user?.wax_address) {
            fetchWaxBalance({
                account: user.wax_address,
            }).then(setWaxBalance);
        }
    }, [user?.wax_address]);

    const avatarWithData = (
        <Text fontFamily="bai">
            <Badge
                count={smartContractUserData?.level}
                showZero
                offset={[-35, 30]}
                color={neutral3Color}
                size="small"
            >
                <Badge
                    dot
                    offset={[-42, 4]}
                    style={{ boxShadow: 'none' }}
                    status="success"
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
            </Badge>
        </Text>
    );

    const userDropdownOverlay = () => (
        <div className={styles.overlay}>
            {avatarWithData}
            <div className={styles.attrs}>
                {user?.wax_address && <div>{user.wax_address}</div>}
                {waxBalance && (
                    <div className={styles.balance}>
                        <Icon component={WaxCoinIcon} /> {waxBalance}
                    </div>
                )}
            </div>
            <Divider />
            <Button
                className={styles.logoutButton}
                ghost
                icon={<LogoutOutlined />}
                onClick={logout}
            >
                {t('components.common.logout')}
            </Button>
        </div>
    );

    return (
        <div className={styles.wrapper}>
            <div>
                <ThunderboltOutlined />
                <span>
                    <Text className={styles.energyCount} fontFamily="orbitron">
                        58
                    </Text>
                </span>
            </div>
            <Dropdown overlay={userDropdownOverlay}>{avatarWithData}</Dropdown>
        </div>
    );
};

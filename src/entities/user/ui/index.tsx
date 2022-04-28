import React, { FC } from 'react';
import { Avatar, Badge, Progress } from 'antd';
import { AvatarIcon, Text } from 'shared';
import { ThunderboltOutlined } from '@ant-design/icons';
import { User } from '../model/type';
import styles from './styles.module.scss';

const neutral3Color = '#262626';

type Props = {
    user: User | null;
};

export const UserAvatar: FC<Props> = ({ user }) => {
    const avatar = () => <Avatar src={user?.avatar} icon={<AvatarIcon />} />;
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
            <Text fontFamily="bai">
                <Badge
                    count={5}
                    showZero
                    offset={[-35, 30]}
                    color={neutral3Color}
                    size="small"
                >
                    <Badge dot offset={[-42, 4]} style={{ boxShadow: 'none' }}>
                        <Progress
                            percent={75}
                            type="circle"
                            width={38}
                            format={avatar}
                            strokeWidth={8}
                            strokeColor="#F5C913"
                        />
                    </Badge>
                </Badge>
            </Text>
        </div>
    );
};

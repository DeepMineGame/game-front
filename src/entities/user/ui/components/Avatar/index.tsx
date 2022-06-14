import { Avatar, Badge, Progress } from 'antd';
import React from 'react';
import { AvatarIcon, neutral3Color, primary6, Text } from 'shared';
import { UserDto } from 'entities/smartcontract';
import styles from '../../styles.module.scss';

type Props = {
    onClick: () => void;
    smartContractUserData: UserDto;
    avatarSrc?: string;
};

export function AvatarWithLvl(props: Props) {
    const avatar = () => <Avatar src={props.avatarSrc} icon={<AvatarIcon />} />;

    return (
        <Text
            fontFamily="bai"
            onClick={props.onClick}
            className={styles.avatar}
        >
            <Badge
                count={props.smartContractUserData?.level}
                showZero
                offset={[-35, 30]}
                color={neutral3Color}
                size="small"
            >
                <Progress
                    percent={props.smartContractUserData?.experience}
                    type="circle"
                    width={38}
                    format={avatar}
                    strokeWidth={8}
                    strokeColor={primary6}
                />
            </Badge>
        </Text>
    );
}

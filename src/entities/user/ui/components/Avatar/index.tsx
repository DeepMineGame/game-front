import { Avatar, Badge, Progress } from 'antd';
import { AvatarIcon, neutral3Color, primary6, Text } from 'shared';
import { useStore } from 'effector-react';
import { UserDto } from 'entities/smartcontract';
import styles from '../../styles.module.scss';
import { userStore } from '../../../model';

type Props = {
    onClick?: () => void;
    smartContractUserData: UserDto;
};

export const AvatarWithLvl = (props: Props) => {
    const user = useStore(userStore);

    const avatar = () => <Avatar src={user?.avatar} icon={<AvatarIcon />} />;

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
};

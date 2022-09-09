import { Avatar, Progress } from 'antd';
import { AvatarIcon, Badge, Button, neutral3Color, primary6 } from 'shared';
import { useStore } from 'effector-react';
import { UserDto } from 'entities/smartcontract';
import { userStore } from '../../../model';

type Props = {
    onClick?: () => void;
    smartContractUserData: UserDto;
};

export function AvatarWithLvl(props: Props) {
    const user = useStore(userStore);

    const avatar = () => <Avatar src={user?.avatar} icon={<AvatarIcon />} />;

    return (
        <Button type="link" onClick={props.onClick}>
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
        </Button>
    );
}

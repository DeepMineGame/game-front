import Rive from '@rive-app/react-canvas';
import { useStore } from 'effector-react';
import { Avatar } from 'antd';
import { AvatarIcon } from 'shared';
import { userStore } from '../../../model';
import styles from './styles.module.scss';

export const UserLocator = () => {
    const user = useStore(userStore);

    return (
        <div className={styles.wrapper}>
            <Avatar
                className={styles.avatar}
                src={user?.avatar}
                icon={<AvatarIcon />}
            />
            <Rive src="/animations/location_indicator.riv" />
        </div>
    );
};

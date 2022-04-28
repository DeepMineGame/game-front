import React, { FC } from 'react';
import { DeepMineLogo } from 'shared';
import { useStore } from 'effector-react';
import { UserAvatar, userStore } from 'entities/user';
import styles from './styles.module.scss';

export const Header: FC = () => {
    const user = useStore(userStore);

    return (
        <div className={styles.header}>
            <div />
            <DeepMineLogo className={styles.logo} />
            <UserAvatar user={user} />
        </div>
    );
};

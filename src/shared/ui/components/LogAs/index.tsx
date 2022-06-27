import React, { useState } from 'react';
import { UserSwitchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { useLogout } from 'features';
import { useStore } from 'effector-react';
import { userStore } from 'entities/user';
import { Button } from 'shared/ui/ui-kit';

import styles from './styles.module.scss';

export const LogAs = () => {
    const { t } = useTranslation();
    const logout = useLogout();
    const user = useStore(userStore);

    const [isOpened, setIsOpened] = useState(false);

    const handleClick = () => {
        setIsOpened((state) => !state);
    };

    return (
        <div
            className={cn(styles.logAs, { [styles.logAsOpened]: isOpened })}
            onClick={handleClick}
        >
            <UserSwitchOutlined className={styles.logAsIcon} />
            <span>
                You’re logged in as another user <b>{user?.email}</b>
            </span>
            <Button type="link" onClick={logout}>
                {t('intro.Logout')}
            </Button>
        </div>
    );
};

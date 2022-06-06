import React from 'react';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { Button } from 'shared';
import { useLogout } from 'features';
import { User } from 'entities/user';
import styles from './styles.module.scss';

type Props = {
    user: User;
};

export const LoggedInBlock: React.FC<Props> = ({ user }) => {
    const { t } = useTranslation();
    const logout = useLogout();

    return (
        <div className={styles.loggedInBlock}>
            <p>
                <Typography.Text className={styles.textColor}>
                    {t('intro.loggedIn')}
                </Typography.Text>
            </p>
            <p>
                <Typography.Text className={styles.textColor} strong>
                    {user.email}
                </Typography.Text>
            </p>
            <Button
                type="link"
                className={styles.logoutButton}
                onClick={logout}
            >
                {t('intro.Logout')}
            </Button>
        </div>
    );
};

import React, { useCallback } from 'react';
import { authDeepMineUserEffect } from 'features';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router';
import { Typography } from 'antd';
import { useChainAuthContext, DeepMineLogo, Button } from 'shared';
import { home } from 'app/router/paths';
import { useLogout } from 'features/useLogout';
import { userStore } from 'entities/user';
import styles from './styles.module.scss';

export const IntroPage = () => {
    const { activeUser: chainUser, showModal } = useChainAuthContext();
    const logout = useLogout();
    const user = useStore(userStore);
    const isUserLoading = useStore(authDeepMineUserEffect.pending);
    const { t } = useTranslation();

    const onAuthButtonClick = useCallback(() => {
        if (chainUser) {
            return logout();
        }
        return showModal();
    }, [chainUser, logout, showModal]);

    if (chainUser) return <Navigate to={home} replace />;

    return (
        <div className={styles.wrapper}>
            <div className={styles.logoWrapper}>
                <DeepMineLogo />
            </div>
            <div className={styles.buttonWrapper}>
                <Button
                    size="large"
                    onClick={onAuthButtonClick}
                    className={styles.actionButton}
                    type="primary"
                    ghost
                    loading={isUserLoading}
                >
                    {user ? t('intro.disconnect') : t('intro.connect')}
                </Button>
            </div>
            <Typography.Text type="danger" className={styles.warning}>
                {user && !user.is_admin && t('intro.only-members')}
            </Typography.Text>
        </div>
    );
};

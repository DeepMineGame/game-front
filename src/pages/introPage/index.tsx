import React, { useCallback, useEffect } from 'react';
import { authDeepMineUserEffect } from 'features';
import { useStore } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useChainAuthContext, DeepMineLogo, Button } from 'shared';
import { Typography } from 'antd';
import { useLogout } from 'features/useLogout';
import { userStore } from 'entities/user';
import styles from './styles.module.scss';

export default function IntroPage() {
    const { activeUser: chainUser, showModal } = useChainAuthContext();
    const logout = useLogout();
    const user = useStore(userStore);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const onAuthButtonClick = useCallback(() => {
        if (chainUser) {
            return logout();
        }
        return showModal();
    }, [chainUser, logout, showModal]);

    useEffect(() => {
        if (chainUser) {
            authDeepMineUserEffect(chainUser.accountName).then(() =>
                navigate('/contractor-cabin')
            );
        }
    }, [chainUser, navigate]);

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
                >
                    {user ? t('intro.disconnect') : t('intro.connect')}
                </Button>
            </div>
            <Typography.Text type="danger" className={styles.warning}>
                {user && !user.is_admin && t('intro.only-members')}
            </Typography.Text>
        </div>
    );
}

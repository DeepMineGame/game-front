import React, { useCallback, useEffect } from 'react';
import { authDeepMineUserEffect } from 'features';
import { useStore } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useChainAuthContext } from 'shared';
import { useLogout } from 'features/useLogout';
import { userStore } from 'entities/user';
import { DeepMineLogo, Button } from 'shared/ui';
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
                <Button className={styles.button} onClick={onAuthButtonClick}>
                    {user ? t('intro.connect') : t('intro.disconnect')}
                </Button>
            </div>
            <div className={styles.warning}>
                {user && !user.is_admin && t('intro.only-members')}
            </div>
        </div>
    );
}

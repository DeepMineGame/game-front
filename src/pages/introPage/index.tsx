import React, { useCallback, useContext, useEffect } from 'react';
import { UALContext } from 'ual-reactjs-renderer';
import { fetchUserFromDeepMineBackendEffect } from 'features';
import { useStore } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLogout } from 'features/useLogout';
import { userStore } from 'entities/user';
import { DeepMineLogo, Button } from 'shared/ui';
import styles from './styles.module.scss';

export default function IntroPage() {
    const { activeUser: waxUser, showModal } = useContext(UALContext);
    const logout = useLogout();
    const user = useStore(userStore);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const onAuthButtonClick = useCallback(() => {
        if (waxUser) {
            return logout();
        }
        return showModal();
    }, [waxUser, logout, showModal]);

    useEffect(() => {
        if (waxUser) {
            fetchUserFromDeepMineBackendEffect(waxUser.accountName).then(() =>
                navigate('/contractor-cabin')
            );
        }
    }, [waxUser, navigate]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.logoWrapper}>
                <DeepMineLogo />
            </div>
            <div className={styles.buttonWrapper}>
                <Button className={styles.button} onClick={onAuthButtonClick}>
                    {user
                        ? t('DISCONNECT WAX WALLET')
                        : t('CONNECT WAX WALLET')}
                </Button>
            </div>
            <div className={styles.warning}>
                {user &&
                    !user.is_admin &&
                    t('Only DeepMine team members are allowed access')}
            </div>
        </div>
    );
}

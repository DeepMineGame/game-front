import React, { useEffect, useState } from 'react';
import { useEvent, useStore } from 'effector-react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Typography } from 'antd';
import { DeepMineLogo, Button, LoadingScreen } from 'shared';
import {
    userStore,
    getUserFromSessionEffect,
    authUserFromGoogleEffect,
    getAuthLinks,
} from 'entities/user';
import styles from '../styles.module.scss';
import { LoggedInBlock } from '../LoggedInBlock';

type Props = {
    onSuccess: () => void;
};

export const GoogleAuthPage: React.FC<Props> = ({ onSuccess }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const getUserFromSession = useEvent(getUserFromSessionEffect);
    const authUserFromGoogle = useEvent(authUserFromGoogleEffect);
    const user = useStore(userStore);

    const [isFetching, setIsFetching] = useState(true);
    const [isAuthLinkFetching, setIsAuthLinkFetching] = useState(false);

    useEffect(() => {
        if (user?.is_admin || user?.is_beta) onSuccess();
    }, [user]);

    useEffect(() => {
        const request = async () => {
            try {
                const authCode = new URLSearchParams(
                    window.location.search
                ).get('code');
                navigate('/', { replace: true });

                if (authCode) {
                    await authUserFromGoogle({
                        code: authCode,
                        redirect_uri: window.location.origin,
                    });
                } else {
                    await getUserFromSession();
                }
            } finally {
                setIsFetching(false);
            }
        };

        request();
    }, []);

    const handleAuthClick = async () => {
        try {
            setIsAuthLinkFetching(true);
            const { google } = await getAuthLinks();

            window.location.href = `${google}&redirect_uri=${encodeURIComponent(
                window.location.origin
            )}`;
        } finally {
            setIsAuthLinkFetching(false);
        }
    };

    if (isFetching) return <LoadingScreen key="loading" size="large" />;

    return (
        <div className={styles.wrapper}>
            <DeepMineLogo width={240} height={142} />
            <div className={styles.content}>
                {user?.is_admin === false && user?.is_beta === false ? (
                    <Typography.Text
                        type="danger"
                        className={styles.warning}
                        style={{ marginTop: 45 }}
                    >
                        {t('intro.only-members')}
                    </Typography.Text>
                ) : (
                    <Button
                        size="large"
                        onClick={handleAuthClick}
                        className={styles.actionButton}
                        type="primary"
                        loading={isAuthLinkFetching}
                        ghost
                    >
                        {t('intro.signInGoogle')}
                    </Button>
                )}
            </div>
            {!!user && <LoggedInBlock user={user} />}
        </div>
    );
};

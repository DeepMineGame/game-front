import React, { useEffect, useState } from 'react';
import { useEvent, useStore } from 'effector-react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, Space, Typography } from 'antd';
import { LoadingScreen } from 'shared';
import { GoogleOutlined } from '@ant-design/icons';
import {
    userStore,
    getUserFromSessionEffect,
    authUserFromGoogleEffect,
    getAuthLinks,
} from 'entities/user';
import styles from '../styles.module.scss';

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
        if (user) onSuccess();
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
            <div className={styles.panel}>
                <Typography.Title className={styles.title}>
                    {t('LOGIN')}
                </Typography.Title>
                <Space direction="vertical" size="large">
                    <Typography.Text className={styles.subTitle}>
                        {t('Discover the DeepMine universe!')}
                    </Typography.Text>
                    <Button
                        onClick={handleAuthClick}
                        className={styles.button}
                        size="large"
                        type="primary"
                        ghost
                        block
                        loading={isAuthLinkFetching}
                        icon={<GoogleOutlined />}
                    >
                        {t('Sign with Google')}
                    </Button>
                </Space>
            </div>
            <div className={styles.panel}>
                <div className={styles.description}>
                    {t('intro.attention')}
                    <a
                        href="https://medium.com/@deepmineworld/deepmine-beta-is-live-63167681173d"
                        target="_blank"
                        rel="noreferrer"
                    >
                        {t('intro.live')}
                    </a>
                </div>
            </div>
        </div>
    );
};

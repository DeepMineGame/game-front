import React, { useEffect, useState } from 'react';
import { useEvent, useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { Space, Typography } from 'antd';
import { WaxUser } from '@eosdacio/ual-wax';

import {
    Button,
    useChainAuthContext,
    LoadingScreen,
    showErrorNotification,
    getTableData,
    WaxChainIcon,
} from 'shared';
import { authorizeUser, getUserConfig } from 'entities/smartcontract';
import {
    userStore,
    User,
    connectUserWithWaxAccountEffect,
    userStoreError,
    setUserEvent,
} from 'entities/user';
import { LoggedInBlock } from '../LoggedInBlock';
import styles from '../styles.module.scss';

type Props = {
    onSuccess: () => void;
};

export const BlockchainAuthPage: React.FC<Props> = ({ onSuccess }) => {
    const { t } = useTranslation();
    const { activeUser, showModal, logout, notLoggedIn } =
        useChainAuthContext();
    const user = useStore(userStore) as User;
    const userError = useStore(userStoreError);
    const connectUserWithWaxAccount = useEvent(connectUserWithWaxAccountEffect);
    const setUser = useEvent(setUserEvent);

    const [isWaitingForConnectWax, setIsWaitingForConnectWax] = useState(false);
    const [hasError, setHasError] = useState(false);

    const authorizeUserInBlockchain = async (
        chain: WaxUser,
        waxAddress: string,
        userId: string
    ) => {
        try {
            await chain.signTransaction(authorizeUser(waxAddress, userId), {
                blocksBehind: 3,
                expireSeconds: 30,
            });
            setIsWaitingForConnectWax(true);
            await new Promise((resolve) => {
                window.setTimeout(resolve, 3000);
            });
            setIsWaitingForConnectWax(false);
        } catch (error) {
            showErrorNotification(error as Error);
            throw error;
        }
    };

    useEffect(() => {
        (async () => {
            if (activeUser && !user.user_created) {
                if (user.wax_address) {
                    if (activeUser.accountName !== user.wax_address) {
                        setHasError(true);
                    } else {
                        const data = await getTableData(
                            getUserConfig(user.wax_address)
                        );
                        const isExist = !!data?.rows?.length;

                        if (!isExist) {
                            await authorizeUserInBlockchain(
                                activeUser,
                                user.wax_address,
                                user.id
                            );
                        }

                        onSuccess();
                    }
                } else {
                    const waxAddress = activeUser.accountName;
                    await authorizeUserInBlockchain(
                        activeUser,
                        waxAddress,
                        user.id
                    );
                    await connectUserWithWaxAccount(waxAddress);
                    onSuccess();
                }
            }
        })();
    }, [activeUser, user.user_created, user.wax_address]);

    const handleConnectClick = () => {
        logout();
        showModal();
        setHasError(false);
        setUser({
            ...user,
            user_created: false,
        });
    };

    if (!activeUser && !notLoggedIn)
        return <LoadingScreen key="loading" size="large" />;

    if (isWaitingForConnectWax) {
        return (
            <LoadingScreen key="loading" size="large">
                <div>{t('pages.auth.wait')}</div>
            </LoadingScreen>
        );
    }

    return (
        <div className={styles.wrapper}>
            <Space size="large" direction="vertical">
                <div className={styles.panel}>
                    <Typography.Title className={styles.title}>
                        {t('GREETINGS')}
                    </Typography.Title>
                    <Space direction="vertical" size="large">
                        <Typography.Text className={styles.subTitle}>
                            {t('Welcome on board')}
                        </Typography.Text>
                        <Button
                            onClick={handleConnectClick}
                            className={styles.button}
                            size="large"
                            type="primary"
                            ghost
                            block
                            icon={<WaxChainIcon />}
                        >
                            {t('intro.connect')}
                        </Button>
                    </Space>
                    {(!!userError || hasError) && (
                        <p style={{ marginTop: 4 }}>
                            <Typography.Text
                                type="danger"
                                className={styles.warning}
                            >
                                {t('intro.waxAlreadyExists')}
                            </Typography.Text>
                        </p>
                    )}
                    <LoggedInBlock user={user} />
                </div>
                <div className={styles.onboardingButton}>
                    {/* <Button */}
                    {/*    onClick={() => { */}
                    {/*        window.location.href = */}
                    {/*            'https://onboarding.deepmine.world'; */}
                    {/*    }} */}
                    {/* > */}
                    {/*    {t('intro.onBoarding')} */}
                    {/* </Button> */}
                </div>
            </Space>
        </div>
    );
};

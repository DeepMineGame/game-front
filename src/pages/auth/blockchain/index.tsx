import React, { useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { Typography } from 'antd';

import {
    DeepMineLogo,
    Button,
    useChainAuthContext,
    LoadingScreen,
    errorNotify,
} from 'shared';
import {
    createSignTransactionData,
    deepminegame,
} from 'entities/smartcontract';
import { userStore, User, connectUserWithWaxAccount } from 'entities/user';
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
    const [isWaxWalletAlreadyExists, setIsWaxWalletAlreadyExists] =
        useState(false);

    useEffect(() => {
        if (activeUser && user.wax_address) onSuccess();
    }, [user, activeUser]);

    useEffect(() => {
        if (!user.wax_address) {
            if (activeUser) {
                activeUser
                    .signTransaction(
                        createSignTransactionData({
                            contractName: deepminegame,
                            contractAction: 'authorize',
                            accountName: activeUser.accountName,
                            data: {
                                wax_user: activeUser.accountName,
                                key: user.id,
                            },
                        }),
                        { expireSeconds: 300 }
                    )
                    .then(async () => {
                        try {
                            await connectUserWithWaxAccount(
                                activeUser.accountName
                            );
                        } catch (error) {
                            setIsWaxWalletAlreadyExists(true);
                        }
                    })
                    .catch(errorNotify);
            }
        }
    }, [activeUser, user, onSuccess]);

    const handleConnectClick = () => {
        logout();
        showModal();
    };

    if (!activeUser && !notLoggedIn)
        return <LoadingScreen key="loading" size="large" />;

    return (
        <div className={styles.wrapper}>
            <DeepMineLogo width={240} height={142} />
            <div className={styles.content}>
                <Button
                    size="large"
                    onClick={handleConnectClick}
                    className={styles.actionButton}
                    type="primary"
                    ghost
                >
                    {t('intro.connect')}
                </Button>
                {isWaxWalletAlreadyExists && (
                    <p style={{ marginTop: 4 }}>
                        <Typography.Text
                            type="danger"
                            className={styles.warning}
                        >
                            {t('intro.waxAlreadyExists')}
                        </Typography.Text>
                    </p>
                )}
            </div>
            <LoggedInBlock user={user} />
        </div>
    );
};

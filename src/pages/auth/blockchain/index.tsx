import { useEffect, useState, FC } from 'react';
import { useEvent, useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { Typography } from 'antd';
import { WaxUser } from '@eosdacio/ual-wax';

import {
    DeepMineLogo,
    Button,
    useChainAuthContext,
    LoadingScreen,
    errorNotify,
    getTableData,
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

export const BlockchainAuthPage: FC<Props> = ({ onSuccess }) => {
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
                expireSeconds: 300,
            });
            setIsWaitingForConnectWax(true);
            await new Promise((resolve) => {
                window.setTimeout(resolve, 3000);
            });
            setIsWaitingForConnectWax(false);
        } catch (error) {
            errorNotify(error as Error);
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
                        const isExist = !!data.rows?.length;

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
            </div>
            <LoggedInBlock user={user} />
        </div>
    );
};

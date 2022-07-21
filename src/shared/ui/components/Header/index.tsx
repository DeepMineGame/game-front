import React, { FC } from 'react';
import {
    BackButton,
    DeepMineLogo,
    desktopS,
    Title,
    useAccountName,
    useMediaQuery,
} from 'shared';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { home } from 'app/router/paths';
import { SettingMenu, UserAvatarAndDrawer } from 'entities/user';
import styles from './styles.module.scss';

type Props = {
    title?: string;
    hideLogo?: boolean;
    withBackButton?: boolean;
};

export const Header: FC<Props> = ({ withBackButton, title, hideLogo }) => {
    const user = useAccountName();
    const navigate = useNavigate();
    const goToBack = () => navigate(-1);
    const isDesktop = useMediaQuery(desktopS);
    const navigateToHome = () => navigate(home);
    return (
        <>
            <div className={styles.header}>
                {withBackButton ? <BackButton onClick={goToBack} /> : <div />}
                {title && !isDesktop ? (
                    <div
                        className={styles.iconAndTitleWrapper}
                        onClick={goToBack}
                    >
                        <LeftOutlined className={styles.backArrow} />
                        <Title
                            level={4}
                            className={styles.title}
                            fontFamily="orbitron"
                        >
                            {title}
                        </Title>
                    </div>
                ) : (
                    <div onClick={navigateToHome}>
                        <DeepMineLogo
                            className={classNames(styles.logo, {
                                [styles.hideLogo]: hideLogo,
                            })}
                        />
                    </div>
                )}
                {user ? (
                    <UserAvatarAndDrawer user={user} />
                ) : (
                    <div>
                        <SettingMenu />
                    </div>
                )}
            </div>
            {title && (
                <div className={styles.backButtonAndTitleWrapper}>
                    <BackButton onClick={goToBack} />
                    <Title className={styles.title} fontFamily="orbitron">
                        {title}
                    </Title>
                    <div />
                </div>
            )}
        </>
    );
};

import React, { FC } from 'react';
import {
    Button,
    DeepMineLogo,
    desktopS,
    Title,
    useAccountName,
    useMediaQuery,
} from 'shared';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { city } from 'app/router/paths';

import { useTranslation } from 'react-i18next';
import { SettingMenu, UserAvatarAndDrawer } from 'entities/user';
import styles from './styles.module.scss';

type Props = {
    title?: string;
    hideLogo?: boolean;
    withBackButton?: boolean;
};

export const Header: FC<Props> = ({ withBackButton, title, hideLogo }) => {
    const accountName = useAccountName();
    const navigate = useNavigate();
    const goToBack = () => navigate(-1);
    const isDesktop = useMediaQuery(desktopS);
    const navigateToHome = () => navigate(city);
    const { t } = useTranslation();

    const backButton = (
        <Button type="text" icon={<LeftOutlined />} onClick={goToBack}>
            {t('kit.back')}
        </Button>
    );

    return (
        <>
            <div className={styles.header}>
                {withBackButton ? backButton : <div />}
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
                    <div
                        className={styles.logoContainer}
                        onClick={navigateToHome}
                    >
                        <DeepMineLogo
                            className={classNames(styles.logo, {
                                [styles.hideLogo]: hideLogo,
                            })}
                        />
                    </div>
                )}
                {accountName ? (
                    <UserAvatarAndDrawer user={accountName} />
                ) : (
                    <div>
                        <SettingMenu />
                    </div>
                )}
            </div>
            {title && (
                <div className={styles.backButtonAndTitleWrapper}>
                    {backButton}
                    <Title className={styles.title} fontFamily="orbitron">
                        {title}
                    </Title>
                    <div />
                </div>
            )}
        </>
    );
};

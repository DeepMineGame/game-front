import React, { FC } from 'react';
import {
    BackButton,
    DeepMineLogo,
    desktopS,
    Title,
    useMediaQuery,
} from 'shared';
import { useStore } from 'effector-react';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { UserAvatar, userStore } from 'entities/user';
import styles from './styles.module.scss';

type Props = {
    title?: string;
};
export const Header: FC<Props> = ({ title }) => {
    const user = useStore(userStore);
    const navigate = useNavigate();
    const goToBack = () => navigate(-1);
    const isDesktop = useMediaQuery(desktopS);

    return (
        <>
            <div className={styles.header}>
                <div />
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
                    <DeepMineLogo className={styles.logo} />
                )}
                <UserAvatar user={user} />
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

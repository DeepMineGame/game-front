import React, { FC } from 'react';
import { DeepMineLogo, Title } from 'shared';
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

    return (
        <div className={styles.header}>
            <div />

            {title ? (
                <div className={styles.iconAndTitleWrapper} onClick={goToBack}>
                    <LeftOutlined />
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
    );
};

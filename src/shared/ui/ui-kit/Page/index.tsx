import React, { FC } from 'react';
import { Header } from 'shared';
import styles from './styles.module.scss';

type Props = {
    headerTitle: string;
};

export const Page: FC<Props> = ({ headerTitle, children }) => {
    return (
        <div className={styles.wrapper}>
            <Header title={headerTitle} />
            <div className={styles.content}>{children}</div>
        </div>
    );
};

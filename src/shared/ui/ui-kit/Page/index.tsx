import React, { FC } from 'react';
import { Header } from 'shared';
import styles from './styles.module.scss';

type Props = {
    headerTitle: string;
    removeContentPadding?: boolean;
};

export const Page: FC<Props> = ({
    headerTitle,
    children,
    removeContentPadding,
}) => {
    return (
        <div className={styles.wrapper}>
            <Header title={headerTitle} />
            <div className={removeContentPadding ? undefined : styles.content}>
                {children}
            </div>
        </div>
    );
};

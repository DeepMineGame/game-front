import classNames from 'classnames';
import React, { ReactNode } from 'react';
import styles from './index.module.scss';

export function MainActionButton({
    children,
    onClick,
}: {
    children: ReactNode;
    onClick: () => void;
}) {
    return (
        <div className={classNames(styles.button)} onClick={onClick}>
            <span className={styles.text}>{children}</span>
        </div>
    );
}

import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

export function Header({ children }: { children: React.ReactNode }) {
    return <div className={classNames(styles.header)}>{children}</div>;
}

import React, { FC } from 'react';
import styles from './styles.module.scss';

export * from './components';
export const Menu: FC = ({ children }) => {
    return <div className={styles.menu}>{children}</div>;
};

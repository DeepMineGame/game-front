import React, { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

export * from './components';
export const Menu: FC<{ className?: string }> = ({ children, className }) => {
    return <div className={cn(styles.menu, className)}>{children}</div>;
};

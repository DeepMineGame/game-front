import React from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

interface Props {
    children: React.ReactNode;
    className?: string;
}

export const Line = ({ children, className }: Props) => {
    return <div className={cn(styles.line, className)}>{children}</div>;
};

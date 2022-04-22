import React, { MouseEventHandler, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

export const Button = ({
    children,
    onClick,
    className,
}: {
    children: ReactNode;
    onClick: MouseEventHandler;
    className: string;
}) => {
    return (
        <div onClick={onClick} className={classNames(styles.button, className)}>
            {children}
        </div>
    );
};

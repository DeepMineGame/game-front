import React, { MouseEventHandler, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

type Props = {
    children: ReactNode;
    onClick: MouseEventHandler;
    className: string;
};
export const Button = ({ children, onClick, className }: Props) => {
    return (
        <div onClick={onClick} className={classNames(styles.button, className)}>
            {children}
        </div>
    );
};

import React, { MouseEventHandler, ReactNode } from 'react';
import classNames from 'classnames';
import { Button as ButtonAnt, ButtonProps } from 'antd';
import styles from './styles.module.scss';

type Props = {
    children: ReactNode;
    onClick: MouseEventHandler;
} & ButtonProps;
export const Button = ({ children, onClick, className, ...props }: Props) => {
    return (
        <ButtonAnt
            onClick={onClick}
            className={classNames(styles.button, className)}
            {...props}
            type="ghost"
        >
            {children}
        </ButtonAnt>
    );
};

import React, { FC, MouseEventHandler } from 'react';
import classNames from 'classnames';
import { Button as ButtonAnt, ButtonProps } from 'antd';
import styles from './styles.module.scss';

type Props = {
    onClick: MouseEventHandler;
} & ButtonProps;

export const Button: FC<Props> = ({
    children,
    onClick,
    className,
    ...props
}) => {
    return (
        <ButtonAnt
            onClick={onClick}
            className={classNames(className, {
                [styles.button]: true,
                [styles.disabled]: props.disabled,
                [styles.primary]: props?.type === 'primary',
                [styles.ghost]: props?.ghost,
            })}
            {...props}
        >
            {children}
        </ButtonAnt>
    );
};

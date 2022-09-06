import { FC, memo, MouseEventHandler } from 'react';
import classNames from 'classnames';
import { Button as ButtonAnt, ButtonProps } from 'antd';
import styles from './styles.module.scss';

type Props = {
    onClick?: MouseEventHandler;
} & ButtonProps;

export const Button: FC<Props> = memo(
    ({ children, onClick, className, type = 'primary', ...props }) => (
        <ButtonAnt
            onClick={onClick}
            className={classNames(className, {
                [styles.primary]: type === 'primary',
                [styles.default]: type === 'default',
                [styles.text]: type === 'text',
                [styles.link]: type === 'link',
                [styles.danger]: props.danger,
                [styles.ghost]: props.ghost,
                [styles.loading]: props.loading,
                [styles.disabled]: props.disabled,
            })}
            type={type}
            {...props}
        >
            {children}
        </ButtonAnt>
    )
);

import { FC, memo, MouseEventHandler } from 'react';
import { Button as ButtonAnt, ButtonProps } from 'antd';
import './styles.module.scss';

type Props = {
    onClick?: MouseEventHandler;
} & ButtonProps;

export const Button: FC<Props> = memo(
    ({ children, onClick, className, type = 'primary', ...props }) => (
        <ButtonAnt
            onClick={onClick}
            className={className}
            type={type}
            {...props}
        >
            {children}
        </ButtonAnt>
    )
);

import { FC, MouseEventHandler } from 'react';
import { Button as ButtonAnt, ButtonProps } from 'antd';

type Props = {
    onClick?: MouseEventHandler;
} & ButtonProps;

export const Button: FC<Props> = ({ children, onClick, ...props }) => {
    return (
        <ButtonAnt onClick={onClick} {...props}>
            {children}
        </ButtonAnt>
    );
};

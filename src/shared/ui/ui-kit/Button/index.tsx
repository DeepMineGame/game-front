import React, { FC } from 'react';
import { Button as ButtonAnt, ButtonProps } from 'antd';

type Props = {
    onClick?: any;
} & ButtonProps;

export const Button: FC<Props> = ({ children, onClick, ...props }) => {
    return (
        <ButtonAnt onClick={onClick} {...props}>
            {children}
        </ButtonAnt>
    );
};

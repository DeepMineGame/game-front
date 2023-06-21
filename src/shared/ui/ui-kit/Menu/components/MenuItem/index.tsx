import { Button, Tooltip } from 'antd';
import React, { FC, MouseEventHandler, ReactNode } from 'react';
import { ButtonType } from 'antd/es/button';

type Props = {
    icon: ReactNode;
    disabled?: boolean;
    onClick?: MouseEventHandler;
    tooltipText?: string;
};

export const MenuItem: FC<Props> = ({
    icon,
    disabled,
    onClick,
    tooltipText,
}) => {
    const button = (
        <Button
            size="large"
            onClick={onClick}
            icon={icon}
            disabled={disabled}
        />
    );
    if (tooltipText) {
        return (
            <Tooltip title={tooltipText} open>
                {button}
            </Tooltip>
        );
    }
    return button;
};

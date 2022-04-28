import { Tooltip } from 'antd';
import React, { FC, MouseEventHandler, ReactNode } from 'react';
import { Button } from 'shared';
import { ButtonType } from 'antd/lib/button/button';

type Props = {
    icon: ReactNode;
    disabled?: boolean;
    onClick?: MouseEventHandler;
    type?: ButtonType;
    ghost?: boolean;
    tooltipText?: string;
};

export const MenuItem: FC<Props> = ({
    type = 'ghost',
    ghost = false,
    icon,
    disabled,
    onClick,
    tooltipText,
}) => {
    const button = (
        <Button
            type={type}
            size="middle"
            onClick={onClick}
            icon={icon}
            disabled={disabled}
            ghost={ghost}
        />
    );
    if (tooltipText) {
        return (
            <Tooltip title={tooltipText} visible>
                {button}
            </Tooltip>
        );
    }
    return button;
};

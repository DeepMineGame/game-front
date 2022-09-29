import { Tooltip } from 'antd';
import { FC, MouseEventHandler, ReactNode } from 'react';
import { Button } from 'shared';
import { ButtonType } from 'antd/lib/button/button';

type Props = {
    icon: ReactNode;
    disabled?: boolean;
    onClick?: MouseEventHandler;
    type?: ButtonType;
    ghost?: boolean;
    tooltipOverlay?: string;
};

export const MenuItem: FC<Props> = ({
    type = 'ghost',
    ghost = false,
    icon,
    disabled,
    onClick,
    tooltipOverlay,
}) => (
    <Tooltip overlay={tooltipOverlay || undefined}>
        <Button
            type={type}
            size="large"
            onClick={onClick}
            icon={icon}
            disabled={disabled}
            ghost={ghost}
        />
    </Tooltip>
);

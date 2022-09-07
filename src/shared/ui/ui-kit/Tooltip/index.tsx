import { Tooltip as TooltipAnt, TooltipProps as TooltipAntProps } from 'antd';
import { FC } from 'react';
import { primary6 as primary } from 'shared/ui/variables';

type TooltipProps = {
    type?: 'primary';
} & TooltipAntProps;

const colors = {
    primary,
};

export const Tooltip: FC<TooltipProps> = ({ type, ...props }) => (
    <TooltipAnt color={type ? colors[type] : undefined} {...props} />
);

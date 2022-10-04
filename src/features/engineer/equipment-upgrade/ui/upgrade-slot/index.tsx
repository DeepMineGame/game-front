import { FC } from 'react';
import { Tooltip, TooltipProps } from 'antd';
import cn from 'classnames';
import { PlusOutlined } from '@ant-design/icons';
import { Text } from 'shared/ui/ui-kit';
import { primary5 } from 'shared/ui/variables';
import styles from './styles.module.scss';

type CardProps = {
    disabled?: boolean;
    notAllowed?: boolean;
    tooltipText?: string;
    onClick?: () => void;
} & Partial<TooltipProps>;

const UpgradeSlot: FC<CardProps> = ({
    disabled,
    notAllowed,
    tooltipText,
    onClick,
    children,
    ...props
}) => {
    return (
        <Tooltip
            {...props}
            overlay={tooltipText && <Text type="neutral">{tooltipText}</Text>}
            color={primary5}
        >
            <div
                className={cn(styles.card, {
                    [styles.disabled]: disabled,
                    [styles.notAllowed]: notAllowed,
                })}
                onClick={onClick}
            >
                {children || (
                    <PlusOutlined
                        className={cn(styles.icon, {
                            [styles.notAllowed]: notAllowed,
                        })}
                    />
                )}
            </div>
        </Tooltip>
    );
};

export { UpgradeSlot };

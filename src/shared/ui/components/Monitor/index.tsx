import React from 'react';
import cn from 'classnames';
import { Text } from 'shared/ui/ui-kit';

import { StatusIcon } from './StatusIcon';
import styles from './index.module.scss';

type Props = {
    size?: 'm' | 'l';
    className?: string;
    status?: {
        name: string;
        text: React.ReactNode;
    };
    style?: React.CSSProperties;
};

export const Monitor: React.FC<Props> = ({
    className,
    children,
    status,
    style,
    size = 'm',
}) => {
    return (
        <div
            className={cn(styles.monitor, className)}
            style={style}
            data-size={size}
        >
            {status && (
                <div className={styles.monitorStatus}>
                    <Text
                        className={styles.monitorStatusText}
                        fontFamily="orbitron"
                    >
                        {status.text}
                    </Text>
                    <StatusIcon />
                </div>
            )}
            {children}
        </div>
    );
};

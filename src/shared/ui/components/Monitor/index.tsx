import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

type Props = {
    classNameContainer?: string;
    className?: string;
};

export const Monitor: React.FC<Props> = ({
    className,
    classNameContainer,
    children,
}) => {
    return (
        <div className={cn(styles.monitorBg, classNameContainer)}>
            <div className={cn(styles.monitor, className)}>{children}</div>
        </div>
    );
};

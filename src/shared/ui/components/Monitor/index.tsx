import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

type Props = {
    className?: string;
};

export const Monitor: React.FC<Props> = ({ className, children }) => {
    return <div className={cn(styles.monitor, className)}>{children}</div>;
};

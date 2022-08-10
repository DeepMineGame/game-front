import { memo, FC } from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

type Props = {
    classNameContainer?: string;
    className?: string;
    display?: {
        color?: string;
        points?: string;
        className?: string;
    };
};

export const Monitor: FC<Props> = memo(
    ({ className, classNameContainer, children, display }) => (
        <div className={cn(styles.monitorBg, classNameContainer)}>
            <svg className={cn(display?.className, styles.display)}>
                <polygon
                    fill={display?.color || '#093d6c5c'}
                    points={display?.points}
                />
            </svg>
            <div className={cn(styles.monitor, className)}>{children}</div>
        </div>
    )
);

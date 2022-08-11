import { memo, FC } from 'react';
import cn from 'classnames';
import styles from './index.module.scss';

type Props = {
    display?: {
        color?: string;
        points?: string;
        className?: string;
    };
};

export const ResponsiveMonitor: FC<Props> = memo(({ children, display }) => (
    <div className={styles.monitor}>
        <svg className={cn(styles.display, display?.className)}>
            <polygon
                fill={display?.color || '#093d6c5c'}
                points={display?.points}
            />
        </svg>
        <div>{children}</div>
    </div>
));

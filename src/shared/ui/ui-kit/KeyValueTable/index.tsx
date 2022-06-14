import React, { FC, ReactNode } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

type Props = {
    items: { [key: string]: ReactNode };
    className?: string;
    coloredItems?: string[];
};

// TODO: use antd table instead
export const KeyValueTable: FC<Props> = ({
    items,
    className,
    coloredItems,
}) => {
    return (
        <div className={cn(styles.wrapper, className)}>
            {Object.entries(items).map(([key, value]) => (
                <div
                    className={cn(styles.unit, {
                        [styles.unitColored]: coloredItems?.includes(key),
                    })}
                    key={key}
                >
                    <div className={styles.key}>{key}</div>
                    <div className={styles.value}>{value}</div>
                </div>
            ))}
        </div>
    );
};

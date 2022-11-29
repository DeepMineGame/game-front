import React, { FC, ReactNode } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

export enum Theme {
    default = 'default',
    transparent = 'transparent',
}

export type KeyValueTableProps = {
    items: Record<string, ReactNode> | ReactNode[][];
    className?: string;
    coloredItems?: string[];
    theme?: Theme;
};

export const KeyValueTable: FC<KeyValueTableProps> = ({
    items,
    className,
    coloredItems,
    theme = 'default',
}) => {
    return (
        <div
            className={cn(styles.wrapper, className, {
                [styles.transparent]: theme === Theme.transparent,
            })}
        >
            {(Array.isArray(items) ? items : Object.entries(items)).map(
                ([key, value], i) => (
                    <div
                        className={cn(styles.unit, {
                            ...(!Array.isArray(items) && {
                                [styles.unitColored]: coloredItems?.includes(
                                    key as string
                                ),
                            }),
                        })}
                        // eslint-disable-next-line react/no-array-index-key
                        key={i}
                    >
                        <div className={styles.key}>{key}</div>
                        <div className={styles.value}>{value}</div>
                    </div>
                )
            )}
        </div>
    );
};

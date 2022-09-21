import React, { FC, ReactNode } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

export enum Theme {
    default = 'default',
    transparent = 'transparent',
}

type Props = {
    items: { [key: string]: ReactNode };
    className?: string;
    coloredItems?: string[];
    theme?: Theme;
};

export const KeyValueTable: FC<Props> = ({
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

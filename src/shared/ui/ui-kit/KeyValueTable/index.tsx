import React, { FC, ReactNode } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

type Props = {
    items: { [key: string]: ReactNode }[];
    wrapperClassName?: string;
};

// TODO: use antd table instead
export const KeyValueTable: FC<Props> = ({ items, wrapperClassName }) => {
    return (
        <div className={cn(styles.wrapper, wrapperClassName)}>
            {items?.map((item) => {
                return Object.entries(item).map(([key, value]) => (
                    <div className={styles.unit}>
                        <span>{key}</span> <span>{value}</span>
                    </div>
                ));
            })}
        </div>
    );
};

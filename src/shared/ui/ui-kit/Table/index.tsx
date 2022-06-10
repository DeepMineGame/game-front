import React, { FC } from 'react';
import cn from 'classnames';
import { Table as AntTable } from 'antd';
import type { TableProps } from 'antd/lib/table';

import styles from './index.module.scss';

export * from './components/AddItem';
export const Table: FC<TableProps<any>> = ({ className, ...props }) => (
    <AntTable
        className={cn(styles.table, className)}
        pagination={false}
        bordered
        showHeader
        {...props}
    />
);

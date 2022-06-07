import React, { FC } from 'react';
import cn from 'classnames';
import { Table as AntTable } from 'antd';
import type { TableProps } from 'antd/lib/table';

import styles from './index.module.scss';

export const Table: FC<TableProps<any>> = (props) => (
    <AntTable
        className={cn(styles.table)}
        pagination={false}
        bordered
        showHeader
        {...props}
    />
);

import { Table as TableAnt, TableProps } from 'antd';
import { FC } from 'react';

export const Table: FC<TableProps<any>> = (props) => (
    <TableAnt
        {...props}
        pagination={{ position: ['bottomCenter'], pageSize: 5 }}
    />
);

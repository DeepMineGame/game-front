import React, { FC } from 'react';
import { KeyValueTable, Title } from 'shared/ui';
import styles from './styles.module.scss';

interface Props {
    title: string;
    data: Record<string, string | React.ReactNode>;
}

const TableWithTitle: FC<Props> = ({ title, data }) => {
    return (
        <>
            <Title level={5}>{title.toUpperCase()}</Title>
            <KeyValueTable items={data} className={styles.table} />
        </>
    );
};

export { TableWithTitle };

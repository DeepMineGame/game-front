import React from 'react';
import { Table, secondsToTime } from 'shared';
import type { ColumnsType } from 'antd/lib/table';
import styles from './styles.module.scss';

interface DataType {
    key: React.Key;
    date: number;
    dme: number;
    events: number;
    time: number;
    fossil: number;
    breakdowns: number;
    children?: DataType[];
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: (date: number) =>
            new Date(date).toLocaleString('en-gb', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
        sorter: {
            compare: (a: DataType, b: DataType) => a.date - b.date,
        },
    },
    {
        title: 'DME',
        dataIndex: 'dme',
        key: 'dme',
        sorter: {
            compare: (a: DataType, b: DataType) => a.dme - b.dme,
        },
    },
    {
        title: 'Mining events',
        dataIndex: 'events',
        key: 'events',
        sorter: {
            compare: (a: DataType, b: DataType) => a.events - b.events,
        },
    },
    {
        title: 'Mining time',
        dataIndex: 'time',
        key: 'time',
        render: (time: number) => secondsToTime(time),
        sorter: {
            compare: (a: DataType, b: DataType) => a.time - b.time,
        },
    },
    {
        title: 'Fossil mined',
        dataIndex: 'fossil',
        key: 'fossil',
        sorter: {
            compare: (a: DataType, b: DataType) => a.fossil - b.fossil,
        },
    },
    {
        title: 'Breakdowns',
        dataIndex: 'breakdowns',
        key: 'breakdowns',
        sorter: {
            compare: (a: DataType, b: DataType) => a.breakdowns - b.breakdowns,
        },
    },
];

const data: DataType[] = [
    {
        key: 1,
        date: 1652302800000,
        dme: 346,
        events: 1,
        time: 5003,
        fossil: 0,
        breakdowns: 1,
    },
    {
        key: 2,
        date: 1652216400000,
        dme: 3467,
        events: 3,
        time: 37403,
        fossil: 2,
        breakdowns: 4,
    },
    {
        key: 3,
        date: 1652130000000,
        dme: 2672,
        events: 5,
        time: 23303,
        fossil: 3,
        breakdowns: 3,
    },
];

export const MiningStats = () => {
    return (
        <div className={styles.miningStats}>
            <div className={styles.miningStatsTable}>
                <Table
                    dataSource={data}
                    columns={columns}
                    tableLayout="fixed"
                />
            </div>
        </div>
    );
};

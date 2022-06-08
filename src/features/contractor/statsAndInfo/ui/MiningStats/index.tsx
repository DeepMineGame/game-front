import React from 'react';
import { MiningStatsTable } from 'shared';
import type { MiningStatsDataType, MiningStatsDataTypeExpanded } from 'shared';
import styles from './styles.module.scss';

const data: MiningStatsDataType[] = [
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

const expandedData: MiningStatsDataTypeExpanded[] = [
    {
        key: 1,
        date: '3:45 pm',
        dme: 346,
        events: 1,
        time: 6003,
        fossil: 1,
        breakdowns: 2,
    },
    {
        key: 2,
        date: '5:15 pm',
        dme: 457,
        events: 3,
        time: 37403,
        fossil: 0,
        breakdowns: 0,
    },
    {
        key: 3,
        date: '10:23 pm',
        dme: 346,
        events: 5,
        time: 23303,
        fossil: 1,
        breakdowns: 2,
    },
];

export const MiningStats = () => {
    return (
        <div className={styles.miningStats}>
            <div className={styles.miningStatsTable}>
                <MiningStatsTable data={data} expandedData={expandedData} />
            </div>
        </div>
    );
};

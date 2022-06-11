import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MiningStatsTable, AreaChart, Title } from 'shared';
import type { MiningStatsDataType, MiningStatsDataTypeExpanded } from 'shared';
import { Tabs } from 'antd';
import { UnorderedListOutlined, BarChartOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';

const { TabPane } = Tabs;

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

const dataChart = [
    { date: '14 May', events: 4.2 },
    { date: '15 May', events: 2.1 },
    { date: '16 May', events: 6.9 },
    { date: '17 May', events: 5.7 },
    { date: '18 May', events: 0.9 },
    { date: '19 May', events: 3 },
    { date: '20 May', events: 4.8 },
    { date: '21 May', events: 4 },
];

export const MiningStats = () => {
    const { t } = useTranslation();

    const chartOptions = useMemo(
        () => ({
            data: dataChart,
            xField: 'date',
            yField: 'events',
            tooltip: {
                customItems: (originalItems: any[]) => {
                    return originalItems.map((item) => {
                        if (item.name === 'events')
                            item.name = t(
                                'pages.contractorMiningStats.miningEvents'
                            );
                        return item;
                    });
                },
            },
        }),
        [dataChart]
    );

    return (
        <div className={styles.miningStats}>
            <Tabs
                className={styles.tabs}
                defaultActiveKey="1"
                type="card"
                size="small"
            >
                <TabPane
                    tab={
                        <>
                            <UnorderedListOutlined
                                style={{ fontSize: '16px' }}
                            />
                            {t('components.common.table.table')}
                        </>
                    }
                    key="1"
                >
                    <div className={styles.miningStatsTableWrapper}>
                        <div className={styles.miningStatsTable}>
                            <MiningStatsTable
                                data={data}
                                expandedData={expandedData}
                            />
                        </div>
                    </div>
                </TabPane>
                <TabPane
                    tab={
                        <>
                            <BarChartOutlined style={{ fontSize: '16px' }} />
                            {t('components.common.graph')}
                        </>
                    }
                    key="2"
                >
                    <Title
                        className={styles.title}
                        fontFamily="bai"
                        level={5}
                        thin
                    >
                        {t('pages.contractorMiningStats.miningEvents')}
                    </Title>
                    <AreaChart options={chartOptions} />
                </TabPane>
            </Tabs>
        </div>
    );
};

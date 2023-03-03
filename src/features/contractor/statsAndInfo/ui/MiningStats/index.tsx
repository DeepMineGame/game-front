import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
    MiningStatsTable,
    Title,
    TabsCard,
    TabsCardPane,
    AreaChart,
    toLocaleDate,
} from 'shared';
import { UnorderedListOutlined, BarChartOutlined } from '@ant-design/icons';
import { MineStatUnit } from 'entities/game-stat';
import styles from './styles.module.scss';

export const MiningStats: FC<{ stats: MineStatUnit[] }> = ({ stats }) => {
    const { t } = useTranslation();

    const chartOptions = useMemo(
        () => ({
            data: stats.map((statItem) => ({
                date: toLocaleDate(statItem.date * 1000),
                events: statItem.events.length,
            })),
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
        [stats, t]
    );

    return (
        <div className={styles.miningStats}>
            <TabsCard defaultActiveKey="1">
                <TabsCardPane
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
                            <MiningStatsTable data={stats} />
                        </div>
                    </div>
                </TabsCardPane>
                <TabsCardPane
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
                    {stats?.length && <AreaChart options={chartOptions} />}
                </TabsCardPane>
            </TabsCard>
        </div>
    );
};

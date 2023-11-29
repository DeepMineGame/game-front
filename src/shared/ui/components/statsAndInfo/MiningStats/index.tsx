import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MiningStatsTable, Title, TabsCard, TabsCardPane } from 'shared';
import { UnorderedListOutlined, BarChartOutlined } from '@ant-design/icons';

import { ContractorStats } from 'entities/game-stat';
import styles from './styles.module.scss';

export const MiningStats: FC<{ stats?: ContractorStats[] | null }> = ({
    stats,
}) => {
    const { t } = useTranslation();

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
                {/* <TabsCardPane */}
                {/*    tab={ */}
                {/*        <> */}
                {/*            <BarChartOutlined style={{ fontSize: '16px' }} /> */}
                {/*            {t('components.common.graph')} */}
                {/*        </> */}
                {/*    } */}
                {/*    key="2" */}
                {/* > */}
                {/*    <Title */}
                {/*        className={styles.title} */}
                {/*        fontFamily="bai" */}
                {/*        level={5} */}
                {/*        thin */}
                {/*    > */}
                {/*        {t('pages.contractorMiningStats.miningEvents')} */}
                {/*    </Title> */}
                {/* </TabsCardPane> */}
            </TabsCard>
        </div>
    );
};

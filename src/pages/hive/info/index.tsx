import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Page, useAccountName, TabsCard, TabsCardPane } from 'shared';
import { Col, Row, Skeleton } from 'antd';
import { BarChartOutlined, InteractionOutlined } from '@ant-design/icons';
import { UserActions, UserRoleTabs } from 'features';
import { useParams } from 'react-router';

const iconTabStyle = { fontSize: '16px' };

enum TabsType {
    Info = 'info',
    Actions = 'actions',
}

export const InfoPage: FC = () => {
    const authAccountName = useAccountName();
    const { accountName } = useParams();
    const { t } = useTranslation();
    const [currentTab, setCurrentTab] = useState<TabsType>(TabsType.Info);

    const handleTabChange = (activeKey: string) => {
        setCurrentTab(activeKey as TabsType);
    };

    return (
        <Page headerTitle={currentTab.toUpperCase()}>
            <Row>
                <Col span={24}>
                    {accountName ? (
                        <TabsCard
                            activeKey={currentTab}
                            onChange={handleTabChange}
                            centered
                        >
                            <TabsCardPane
                                className="mtClass"
                                tab={
                                    <>
                                        <BarChartOutlined
                                            style={iconTabStyle}
                                        />
                                        {t('pages.info.information')}
                                    </>
                                }
                                key={TabsType.Info}
                            >
                                <UserRoleTabs
                                    accountName={accountName || authAccountName}
                                />
                            </TabsCardPane>
                            <TabsCardPane
                                tab={
                                    <>
                                        <InteractionOutlined
                                            style={iconTabStyle}
                                        />
                                        {t('pages.info.actions')}
                                    </>
                                }
                                key={TabsType.Actions}
                            >
                                <UserActions />
                            </TabsCardPane>
                        </TabsCard>
                    ) : (
                        <Skeleton />
                    )}
                </Col>
            </Row>
        </Page>
    );
};

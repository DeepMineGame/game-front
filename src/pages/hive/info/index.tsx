import React, { FC } from 'react';
import { Page, useAccountName } from 'shared';
import { Col, Row, Skeleton } from 'antd';

import { UserRoleTabs } from 'features';
import { useParams } from 'react-router';

export const InfoPage: FC = () => {
    const authAccountName = useAccountName();
    const { accountName } = useParams();
    return (
        <Page headerTitle="INFO">
            <Row>
                <Col span={24}>
                    {accountName ? (
                        <UserRoleTabs
                            accountName={accountName || authAccountName}
                        />
                    ) : (
                        <Skeleton />
                    )}
                </Col>
            </Row>
        </Page>
    );
};

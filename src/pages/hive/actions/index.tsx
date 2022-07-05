import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';
import { useStore } from 'effector-react';
import { desktopS, Tabs, useMediaQuery } from 'shared';
import {
    contractorsStore,
    rolesStore,
    UserRoles,
} from 'entities/smartcontract';
import {
    ActionsTable,
    ActionsDataType,
    Action,
    Status,
} from './ui/ActionsTable';

const data: ActionsDataType[] = [
    {
        key: 1,
        number: 1,
        action: Action.mining,
        started: 1652435100000,
        finished: 1652450700000,
        result: Status.success,
    },
    {
        key: 2,
        number: 2,
        action: Action.mining,
        started: 1652521500000,
        finished: 1652537100000,
        result: Status.success,
    },
    {
        key: 3,
        number: 3,
        action: Action.mining,
        started: 1652348700000,
        finished: 1652364300000,
        result: Status.error,
    },
];

for (let i = 4; i < 33; i++) {
    data.push({
        key: i,
        number: i,
        action: Action.mining,
        started: 1652435100000,
        finished: 1652450700000,
        result: Status.success,
    });
}

const UserActions = () => {
    const { t } = useTranslation();
    const isDesktop = useMediaQuery(desktopS);

    const roles = useStore(rolesStore) || [];
    const contractors = useStore(contractorsStore);
    const hasLandlordRole = roles.some(
        ({ role }) => role === UserRoles.landlord
    );
    const hasMineOwnerRole = roles.some(
        ({ role }) => role === UserRoles.mine_owner
    );

    return (
        <Row>
            <Col span={24}>
                <Tabs
                    tabPosition={isDesktop ? 'right' : 'top'}
                    config={[
                        {
                            tabName: t('roles.citizen'),
                            tabContent: <ActionsTable data={data} />,
                        },
                        {
                            tabName: t('roles.landlord'),
                            disabled: !hasLandlordRole,
                            tabContent: <ActionsTable data={data} />,
                        },
                        {
                            tabName: t('roles.mineOwner'),
                            disabled: !hasMineOwnerRole,
                            tabContent: <ActionsTable data={data} />,
                        },
                        {
                            tabName: t('roles.contractor'),
                            disabled: Boolean(!contractors?.length),
                            tabContent: contractors && (
                                <ActionsTable data={data} />
                            ),
                        },
                    ]}
                />
            </Col>
        </Row>
    );
};

export { UserActions };

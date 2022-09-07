import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';
import { useStore } from 'effector-react';
import { desktopS, Tabs, useMediaQuery } from 'shared';
import { FC } from 'react';
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

const UserActions: FC = () => {
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
                    items={[
                        {
                            tab: t('roles.citizen'),
                            key: UserRoles.citizen,
                            children: <ActionsTable data={data} />,
                        },
                        {
                            tab: t('roles.landlord'),
                            key: UserRoles.landlord,
                            disabled: !hasLandlordRole,
                            children: <ActionsTable data={data} />,
                        },
                        {
                            tab: t('roles.mineOwner'),
                            key: UserRoles.mine_owner,
                            disabled: !hasMineOwnerRole,
                            children: <ActionsTable data={data} />,
                        },
                        {
                            tab: t('roles.contractor'),
                            key: UserRoles.contractor,
                            disabled: Boolean(!contractors?.length),
                            children: contractors && (
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

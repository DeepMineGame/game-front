import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Skeleton } from 'antd';
import { useGate, useStore } from 'effector-react';
import {
    ActionsTable,
    desktopS,
    Tabs,
    useAccountName,
    useMediaQuery,
    useUserRoles,
} from 'shared';
import { rolesStore, UserRoles } from 'entities/smartcontract';
import { actionsStore, getUserAction, UserActionTableGage } from './model';

const UserActions: FC = () => {
    const accountName = useAccountName();
    useGate(UserActionTableGage, {
        searchParam: accountName,
    });

    const actions = useStore(actionsStore);
    const { t } = useTranslation();
    const isDesktop = useMediaQuery(desktopS);
    const roles = useStore(rolesStore) || [];

    const userRoles = useUserRoles(roles);

    const getActionsByRole = useCallback(
        (tabName) => {
            const mapTabNameToRole = new Map([
                [t('roles.citizen'), UserRoles.citizen],
                [t('roles.landlord'), UserRoles.landlord],
                [t('roles.mineOwner'), UserRoles.mine_owner],
                [t('roles.contractor'), UserRoles.contractor],
            ]);
            return getUserAction({
                searchParam: accountName,
                role: mapTabNameToRole.get(tabName) || UserRoles.citizen,
            });
        },

        [accountName, t]
    );
    const isLoading = useStore(getUserAction.pending);
    const tableOrLoader = isLoading ? (
        <Skeleton />
    ) : (
        <ActionsTable data={actions} />
    );
    const tabs = [
        {
            tabName: 'roles.citizen',
        },
        {
            tabName: 'roles.landlord',
            disabled: !userRoles.isLandlord,
        },
        {
            tabName: 'roles.mineOwner',
            disabled: !userRoles.isMineOwner,
        },
        {
            tabName: 'roles.contractor',
            disabled: !userRoles.isContractor,
        },
    ];

    return (
        <Row>
            <Col span={24}>
                <Tabs
                    tabPosition={isDesktop ? 'right' : 'top'}
                    onChange={getActionsByRole}
                    config={tabs.map((tab) => ({
                        tabName: t(tab.tabName),
                        tabContent: tableOrLoader,
                        disabled: tab.disabled,
                    }))}
                />
            </Col>
        </Row>
    );
};

export { UserActions };

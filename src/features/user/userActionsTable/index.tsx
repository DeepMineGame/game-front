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
            tab: t('roles.citizen'),
            key: UserRoles.citizen,
        },
        {
            tab: t('roles.landlord'),
            key: UserRoles.landlord,
            disabled: !userRoles.isLandlord,
        },
        {
            tab: t('roles.mineOwner'),
            key: UserRoles.mine_owner,
            disabled: !userRoles.isMineOwner,
        },
        {
            tab: t('roles.contractor'),
            key: UserRoles.contractor,
            disabled: !userRoles.isContractor,
        },
    ];

    return (
        <Row>
            <Col span={24}>
                <Tabs
                    tabPosition={isDesktop ? 'right' : 'top'}
                    onChange={getActionsByRole}
                    items={tabs.map((tab) => ({
                        ...tab,
                        children: tableOrLoader,
                    }))}
                />
            </Col>
        </Row>
    );
};

export { UserActions };

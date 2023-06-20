import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Skeleton, Tabs } from 'antd';
import { useGate, useStore } from 'effector-react';
import {
    ActionsTable,
    desktopS,
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
                [t('roles.mineowner'), UserRoles.mine_owner],
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
            label: t('roles.citizen'),
            key: String(UserRoles.citizen),
        },
        {
            label: t('roles.landlord'),
            disabled: !userRoles.isLandlord,
            key: String(UserRoles.landlord),
        },
        {
            label: t('roles.mineowner'),
            disabled: !userRoles.isMineOwner,
            key: String(UserRoles.mine_owner),
        },
        {
            label: t('roles.contractor'),
            disabled: !userRoles.isContractor,
            key: String(UserRoles.contractor),
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

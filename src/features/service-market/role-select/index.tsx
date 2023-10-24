import { Radio, Select, Space } from 'antd';
import { useCallback, useEffect } from 'react';
import { useStore } from 'effector-react';
import { useAccountName, useQuery } from 'shared';
import { useTranslation } from 'react-i18next';
import { Roles } from 'entities/game-stat';
import { changeFilterEvent, filterStore } from '../contractor-table/model';
import { e_upg_asset_type } from '../constants';
import {
    availableSelectItemByRole,
    contractorItem,
    engineerItem,
    landLordItem,
    mineOwnerItem,
} from './lib';
import {
    activeRadioButton$,
    changeContractTypeRadioButtonEvent,
    RadioButtonContractTypeNames,
} from './model';

const mineEquipment = [
    e_upg_asset_type.cutter,
    e_upg_asset_type.dme_wire,
    e_upg_asset_type.delaminator,
    e_upg_asset_type.plunging_blocks,
    e_upg_asset_type.wandering_reactor,
];
export const RoleSelect = () => {
    const activeRadioButton = useStore(activeRadioButton$);
    const filter = useStore(filterStore);
    const accountName = useAccountName();
    const { t } = useTranslation();
    const query = useQuery();
    const searchRoleFromQuery = query.get('search_role') as Roles;
    const userRoleFromQuery = query.get('user_role') as Roles;
    useEffect(() => {
        if (searchRoleFromQuery || userRoleFromQuery) {
            changeContractTypeRadioButtonEvent(
                RadioButtonContractTypeNames['All contracts']
            );
        }
    }, [searchRoleFromQuery, userRoleFromQuery]);
    const onChangeSelfRole = useCallback(
        (userRole: Roles) => {
            const searchRole = availableSelectItemByRole[userRole][0].value;

            const isMineOwnerEngineerSelected =
                (userRole === Roles.mineowner || userRole === Roles.engineer) &&
                (searchRole === Roles.mineowner ||
                    searchRole === Roles.engineer);

            const isContractorEngineerSelected =
                (userRole === Roles.contractor ||
                    userRole === Roles.engineer) &&
                (searchRole === Roles.contractor ||
                    searchRole === Roles.engineer);

            if (isContractorEngineerSelected) {
                return changeFilterEvent({
                    user_role: userRole,
                    asset_types: mineEquipment.join(','),
                    search_role: searchRole,
                    user: accountName,
                });
            }

            if (isMineOwnerEngineerSelected) {
                return changeFilterEvent({
                    user_role: userRole,
                    asset_types: e_upg_asset_type.mine,
                    search_role: searchRole,
                    user: accountName,
                });
            }

            changeFilterEvent({
                user_role: userRole,
                search_role: searchRole,
                user: accountName,
            });
        },
        [accountName]
    );
    const onChangeSearchRole = useCallback(
        (role) => {
            const isMineOwnerEngineerSelected =
                role === Roles.mineowner && filter.user_role === Roles.engineer;
            const isContractorMineOwnerSelected =
                role === Roles.contractor &&
                filter.user_role === Roles.engineer;

            if (isContractorMineOwnerSelected) {
                return changeFilterEvent({
                    ...filter,
                    search_role: role,
                    asset_types: mineEquipment.join(','),
                });
            }

            if (isMineOwnerEngineerSelected) {
                return changeFilterEvent({
                    ...filter,
                    search_role: role,
                    asset_types: e_upg_asset_type.mine,
                });
            }
            changeFilterEvent({
                ...filter,
                search_role: role,
            });
        },
        [filter]
    );

    const rolesToSelectOptions = [
        contractorItem,
        mineOwnerItem,
        landLordItem,
        engineerItem,
    ];

    return (
        <Space direction="vertical" size="large">
            {activeRadioButton ===
                RadioButtonContractTypeNames['All contracts'] && (
                <Space>
                    {t('I am')}{' '}
                    <Select
                        options={rolesToSelectOptions}
                        placeholder={t('Select your role')}
                        value={filter.user_role}
                        onChange={onChangeSelfRole}
                    >
                        {t('Select your role')}
                    </Select>{' '}
                    looking for{' '}
                    <Select
                        options={
                            filter.user_role !== undefined
                                ? availableSelectItemByRole[filter.user_role]
                                : []
                        }
                        placeholder={t('Select role')}
                        value={filter.search_role}
                        onChange={onChangeSearchRole}
                    >
                        {t('Select role')}
                    </Select>
                </Space>
            )}
            <Space>
                <Radio.Group value={activeRadioButton}>
                    <Radio
                        onChange={() => {
                            changeFilterEvent({
                                user_role: Roles.contractor,
                                search_role: Roles.mineowner,
                                user: accountName,
                            });
                            changeContractTypeRadioButtonEvent(
                                RadioButtonContractTypeNames['All contracts']
                            );
                        }}
                        value={RadioButtonContractTypeNames['All contracts']}
                    >
                        {t('All contracts')}
                    </Radio>
                    <Radio
                        onChange={() => {
                            changeFilterEvent({
                                user: accountName,
                            });
                            changeContractTypeRadioButtonEvent(
                                RadioButtonContractTypeNames['My contracts']
                            );
                        }}
                        value={RadioButtonContractTypeNames['My contracts']}
                    >
                        {t('My contracts')}
                    </Radio>
                    <Radio
                        value={RadioButtonContractTypeNames['Contract offers']}
                        onChange={() => {
                            changeFilterEvent({
                                user: accountName,
                                offers: true,
                            });
                            changeContractTypeRadioButtonEvent(
                                RadioButtonContractTypeNames['Contract offers']
                            );
                        }}
                    >
                        {t('Contract offers')}
                    </Radio>
                </Radio.Group>
            </Space>
        </Space>
    );
};

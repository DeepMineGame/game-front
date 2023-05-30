import { Radio, Select, Space } from 'antd';
import { useCallback } from 'react';
import { useStore } from 'effector-react';
import { useAccountName } from 'shared';
import { e_upg_asset_type, OrderStatus, Roles } from 'entities/game-stat';
import { changeFilterEvent, filterStore } from '../contractor-table/model';

const mineEquipment = [
    e_upg_asset_type.cutter,
    e_upg_asset_type.dme_wire,
    e_upg_asset_type.delaminator,
    e_upg_asset_type.plunging_blocks,
    e_upg_asset_type.wandering_reactor,
];
export const RoleSelect = () => {
    const filter = useStore(filterStore);
    const accountName = useAccountName();

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
                    assetTypes: mineEquipment.join(','),
                });
            }

            if (isMineOwnerEngineerSelected) {
                return changeFilterEvent({
                    ...filter,
                    search_role: role,
                    assetTypes: e_upg_asset_type.mine,
                });
            }
            changeFilterEvent({
                ...filter,
                search_role: role,
            });
        },
        [filter]
    );
    const onChangeSelfRole = useCallback(
        (role) => {
            const isMineOwnerEngineerSelected =
                role === Roles.mineowner &&
                filter.search_role === Roles.engineer;
            const isContractorMineOwnerSelected =
                role === Roles.contractor &&
                filter.search_role === Roles.engineer;

            if (isContractorMineOwnerSelected) {
                return changeFilterEvent({
                    ...filter,
                    user_role: role,
                    assetTypes: mineEquipment.join(','),
                });
            }

            if (isMineOwnerEngineerSelected) {
                return changeFilterEvent({
                    ...filter,
                    user_role: role,
                    assetTypes: e_upg_asset_type.mine,
                });
            }

            changeFilterEvent({
                ...filter,
                user_role: role,
            });
        },
        [filter]
    );

    const rolesToSelectOptions = Object.values(Roles).map((role) => ({
        label: role,
        value: role,
    }));

    return (
        <Space direction="vertical" size="large">
            <Space>
                I am{' '}
                <Select
                    options={rolesToSelectOptions}
                    placeholder="Select your role"
                    value={filter.user_role}
                    onChange={onChangeSelfRole}
                >
                    Select your role
                </Select>{' '}
                looking for{' '}
                <Select
                    options={rolesToSelectOptions}
                    placeholder="Select role"
                    value={filter.search_role}
                    onChange={onChangeSearchRole}
                >
                    Select role
                </Select>
            </Space>
            <Space>
                <Radio.Group>
                    <Radio
                        onChange={() => {
                            changeFilterEvent({
                                statuses: OrderStatus.new,
                                user_role: Roles.contractor,
                                search_role: Roles.mineowner,
                            });
                        }}
                        value="all"
                    >
                        All contracts
                    </Radio>
                    <Radio
                        onChange={() => {
                            changeFilterEvent({
                                user: accountName,
                            });
                        }}
                        value="my"
                    >
                        My contracts
                    </Radio>
                    <Radio
                        value="offers"
                        onChange={() => {
                            changeFilterEvent({
                                user: accountName,
                                offers: true,
                            });
                        }}
                    >
                        Contract offerings
                    </Radio>
                </Radio.Group>
            </Space>
        </Space>
    );
};

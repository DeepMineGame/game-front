import { Radio, Select, Space } from 'antd';
import { useCallback } from 'react';
import { useStore } from 'effector-react';
import { useAccountName } from 'shared';
import { OrderStatus, Roles } from 'entities/game-stat';
import { changeFilterEvent, filterStore } from '../contractor-table/model';

export const RoleSelect = () => {
    const filter = useStore(filterStore);
    const accountName = useAccountName();

    const onChangeSearchRole = useCallback(
        (role) =>
            changeFilterEvent({
                ...filter,
                search_role: role,
            }),
        [filter]
    );
    const onChangeSelfRole = useCallback(
        (role) =>
            changeFilterEvent({
                ...filter,
                user_role: role,
            }),
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

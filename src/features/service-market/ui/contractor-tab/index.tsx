import { useStore } from 'effector-react';
import { FC, useCallback } from 'react';
import { Segmented } from 'shared';
import { Space } from 'antd';
import { Roles } from 'entities/game-stat';
import { changeFilterEvent, filterStore } from '../../contractor-table/model';
import { ContractorTable } from '../../contractor-table';
import { TabGrid } from '../tab-grid';

export const ContractorTab: FC = () => {
    const filter = useStore(filterStore);

    const onChangeSearchRole = useCallback(
        (role) =>
            changeFilterEvent({
                ...filter,
                search_role: role,
            }),
        [filter]
    );

    return (
        <TabGrid
            filters={
                <Space>
                    <div>Looking for:</div>
                    <Segmented
                        options={[
                            {
                                value: Roles.mineowner,
                                label: 'Mine owner',
                            },
                            {
                                value: Roles.engineer,
                                label: 'Engineer',
                            },
                        ]}
                        onChange={onChangeSearchRole}
                        value={filter?.search_role}
                    />
                </Space>
            }
            table={<ContractorTable />}
        />
    );
};

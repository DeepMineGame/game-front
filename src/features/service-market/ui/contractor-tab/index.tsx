import { FC } from 'react';

import { ContractsRenderByRole } from '../../contractor-table';
import { TabGrid } from '../tab-grid';
import { RoleSelect } from '../../role-select';

export const Contracts: FC = () => {
    return (
        <TabGrid filters={<RoleSelect />} table={<ContractsRenderByRole />} />
    );
};

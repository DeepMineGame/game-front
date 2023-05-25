import { FC } from 'react';

import { ContractorTable } from '../../contractor-table';
import { TabGrid } from '../tab-grid';
import { RoleSelect } from '../../role-select';

export const ContractorTab: FC = () => {
    return <TabGrid filters={<RoleSelect />} table={<ContractorTable />} />;
};

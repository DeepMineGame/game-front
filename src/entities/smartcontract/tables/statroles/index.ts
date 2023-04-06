import { getTableData } from 'shared';
import { deepminestat } from '../../constants';
import { UserRoles } from '../roles';

export type StatRoles = {
    id: string;
    owner: string;
    role: UserRoles;
    experience: number | undefined;
    exp_to_level_up: string;
};

export const getStatRolesTableData = ({
    searchParam,
}: {
    searchParam: string;
}) =>
    getTableData<StatRoles>({
        code: deepminestat,
        scope: deepminestat,
        table: 'statroles',
        index_position: 2,
        key_type: '',
        lower_bound: searchParam,
        upper_bound: searchParam,
        limit: 10,
    });

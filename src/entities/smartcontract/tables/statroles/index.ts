import { getTableData } from 'shared';
import { deepminestat } from '../../constants';
import { UserRoles } from '../roles';

export type StatRoles = {
    id: string;
    owner: string;
    role: UserRoles;
    experience: number | undefined;
    exp_to_level_up: number;
};

enum SearchType {
    accountName = 2,
}
export const getStatRolesTableData = ({
    searchParam,
}: {
    searchParam: string;
}) =>
    getTableData<StatRoles>({
        code: deepminestat,
        scope: deepminestat,
        table: 'statroles',
        index_position: SearchType.accountName,
        key_type: 'name',
        lower_bound: searchParam,
        upper_bound: searchParam,
        limit: 10,
    });

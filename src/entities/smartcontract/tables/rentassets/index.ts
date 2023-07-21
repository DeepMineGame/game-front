import { getTableData } from 'shared';
import { deepminesmrt } from '../../constants';

export const getRentAssetsTableData = async ({
    searchParam,
}: {
    searchParam: string;
}) =>
    await getTableData<{ asset_id: string }>({
        code: deepminesmrt,
        scope: deepminesmrt,
        table: 'rentassets',
        index_position: 2,
        key_type: 'name',
        upper_bound: searchParam,
        lower_bound: searchParam,
        limit: 1000,
    });

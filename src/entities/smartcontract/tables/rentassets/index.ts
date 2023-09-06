import { getTableData } from 'shared';
import { deepminesmrt } from '../../constants';

export enum RentAssetTableSearchType {
    assetId,
    accountName,
}
export const getRentAssetsTableData = async ({
    searchParam,
    searchType = RentAssetTableSearchType.accountName,
}: {
    searchParam: string;
    searchType?: RentAssetTableSearchType;
}) =>
    await getTableData<{ asset_id: string }>({
        code: deepminesmrt,
        scope: deepminesmrt,
        table: 'rentassets',
        index_position:
            searchType === RentAssetTableSearchType.accountName ? 2 : 1,
        key_type:
            searchType === RentAssetTableSearchType.accountName ? 'name' : 'id',
        upper_bound: searchParam,
        lower_bound: searchParam,
        limit: 1000,
    });

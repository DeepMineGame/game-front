import { commonAssetsSetImg, getImagePath } from 'shared';
import { ContractDto } from 'entities/smartcontract';

export const buildImagePath = (contract: ContractDto) => {
    const assetIds = contract.attrs.find(
        ({ key }) => key === 'asset_ids'
    )?.value;
    const isMultiAsset = assetIds?.includes(',');
    if (isMultiAsset) {
        return commonAssetsSetImg;
    }
    return getImagePath(Number(assetIds));
};

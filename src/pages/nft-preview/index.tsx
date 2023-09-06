import { InventoryCardModal, Loader, Page } from 'shared';
import { useParams } from 'react-router';
import { FC, useEffect, useMemo, useState } from 'react';
import { Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGate, useStore } from 'effector-react';
import { $mergedRentWithAtomicAssets, RentInventoryGate } from 'features';
import {
    $mergedInventoryWithAtomicAssets,
    AssetDataType,
    getAtomicAssetsEffect,
} from 'entities/atomicassets';
import { RentAssetTableSearchType } from 'entities/smartcontract';

export const NftPreviewPage: FC = () => {
    const { assetId } = useParams();
    const navigate = useNavigate();
    const goBackButton = () => navigate(-1);
    const inventoriedAssets = useStore($mergedInventoryWithAtomicAssets);
    const [cardFromAtomic, setAtomicCard] = useState<AssetDataType[] | null>(
        null
    );
    useGate(RentInventoryGate, {
        searchParam: assetId || '',
        searchType: RentAssetTableSearchType.assetId,
    });
    const rentInventoryAtomicAssets = useStore($mergedRentWithAtomicAssets);
    const cardFromInventory = useMemo(() => {
        return inventoriedAssets.find(
            (inventoriedAsset) => inventoriedAsset.asset_id === assetId
        );
    }, [assetId, inventoriedAssets]);

    useEffect(() => {
        if (!cardFromInventory && assetId) {
            getAtomicAssetsEffect([assetId]).then(setAtomicCard);
        }
    }, [assetId, cardFromInventory]);

    if (cardFromInventory === undefined) {
        return (
            <Page>
                <Loader size="large" centered />
            </Page>
        );
    }
    const isRentCard = rentInventoryAtomicAssets.asset_id === assetId;
    return (
        <Page>
            {cardFromInventory || rentInventoryAtomicAssets ? (
                <InventoryCardModal
                    open
                    card={
                        isRentCard
                            ? (rentInventoryAtomicAssets as any)
                            : cardFromInventory || cardFromAtomic
                    }
                    onCancel={goBackButton}
                    footer={null}
                />
            ) : (
                <Skeleton />
            )}
        </Page>
    );
};

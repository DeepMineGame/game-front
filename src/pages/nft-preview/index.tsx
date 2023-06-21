import { InventoryCardModal, Loader, Page } from 'shared';
import { useParams } from 'react-router';
import { FC, useEffect, useMemo, useState } from 'react';
import { Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'effector-react';
import {
    $mergedInventoryWithAtomicAssets,
    AssetDataType,
    getAtomicAssetsEffect,
} from 'entities/atomicassets';

export const NftPreviewPage: FC = () => {
    const { assetId } = useParams();
    const navigate = useNavigate();
    const goBackButton = () => navigate(-1);
    const inventoriedAssets = useStore($mergedInventoryWithAtomicAssets);
    const [cardFromAtomic, setAtomicCard] = useState<AssetDataType[] | null>(
        null
    );

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

    return (
        <Page>
            {cardFromInventory ? (
                <InventoryCardModal
                    open
                    card={cardFromInventory || cardFromAtomic}
                    onCancel={goBackButton}
                    footer={null}
                />
            ) : (
                <Skeleton />
            )}
        </Page>
    );
};

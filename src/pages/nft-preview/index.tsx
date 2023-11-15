import { InventoryCardModal, Loader, Page } from 'shared';
import { useParams } from 'react-router';
import { FC, useState } from 'react';
import { Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGate, useStore } from 'effector-react';
import { asset$, AssetGate } from 'features';
import { AssetDataType } from 'entities/atomicassets';

export const NftPreviewPage: FC = () => {
    const { assetId } = useParams();
    const navigate = useNavigate();
    const goBackButton = () => navigate(-1);

    useGate(AssetGate, {
        searchParam: assetId || '',
    });
    // const rentInventoryAtomicAssets = useStore($mergedRentWithAtomicAssets);
    const cardFromInventory = useStore(asset$);

    if (cardFromInventory === undefined) {
        return (
            <Page>
                <Loader size="large" centered />
            </Page>
        );
    }
    // const isRentCard = rentInventoryAtomicAssets.asset_id === assetId;
    return (
        <Page>
            {cardFromInventory ? (
                // || rentInventoryAtomicAssets
                <InventoryCardModal
                    open
                    card={cardFromInventory}
                    onCancel={goBackButton}
                    footer={null}
                />
            ) : (
                <Skeleton />
            )}
        </Page>
    );
};

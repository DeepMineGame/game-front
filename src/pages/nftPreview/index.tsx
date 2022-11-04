import { InventoryCardModal, Page } from 'shared';
import { useParams } from 'react-router';
import { FC, useMemo } from 'react';
import { Empty, Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'effector-react';
import { $mergedInventoryWithAtomicAssets } from 'entities/atomicassets';

export const NftPreviewPage: FC = () => {
    const { assetId } = useParams();
    const navigate = useNavigate();
    const goBackButton = () => navigate(-1);
    const inventoriedAssets = useStore($mergedInventoryWithAtomicAssets);
    const card = useMemo(
        () =>
            inventoriedAssets.find(
                (inventoriedAsset) => inventoriedAsset.asset_id === assetId
            ),
        [assetId, inventoriedAssets]
    );

    if (card === undefined) {
        return (
            <Page>
                <Empty description="There is no data in inventories table" />
            </Page>
        );
    }

    return (
        <Page>
            {card ? (
                <InventoryCardModal
                    visible
                    card={card}
                    onCancel={goBackButton}
                />
            ) : (
                <Skeleton />
            )}
        </Page>
    );
};

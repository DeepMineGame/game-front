import { InventoryCardModal, Loader, Page } from 'shared';
import { useParams } from 'react-router';
import { FC } from 'react';
import { Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGate, useStore } from 'effector-react';
import { asset$, AssetGate } from 'features';

export const NftPreviewPage: FC = () => {
    const { assetId } = useParams();
    const navigate = useNavigate();
    const goBackButton = () => navigate(-1);

    useGate(AssetGate, {
        searchParam: assetId || '',
    });

    const cardFromInventory = useStore(asset$);

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

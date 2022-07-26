import { InventoryCardModal, Page } from 'shared';
import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    inventoryTableDataConfig,
    SEARCH_BY,
    UserInventoryType,
} from 'entities/smartcontract';

export const NftPreviewPage = () => {
    const { assetId } = useParams();
    const navigate = useNavigate();
    const [fetchedCard, setFetchedCard] = useState<UserInventoryType | null>(
        null
    );
    const goBackButton = () => navigate(-1);

    useEffect(() => {
        if (assetId) {
            inventoryTableDataConfig({
                searchParam: assetId,
                searchIdentificationType: SEARCH_BY.inventoryId,
            }).then(({ rows }) => setFetchedCard(rows?.[0]));
        }
    }, [assetId]);

    return (
        <Page>
            {fetchedCard ? (
                <InventoryCardModal
                    visible
                    card={fetchedCard}
                    onCancel={goBackButton}
                />
            ) : (
                <Skeleton />
            )}
        </Page>
    );
};

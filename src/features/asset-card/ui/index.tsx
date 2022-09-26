import { useGate, useStore } from 'effector-react';
import { FC } from 'react';
import { Card, CardProps, Status } from 'shared';
import { UserInventoryType } from 'entities/smartcontract';
import { AssetCardGate, assetCardStore } from '../model';

export const getCardStatus = (inventory?: UserInventoryType): Status => {
    if (inventory?.broken) return Status.broken;
    if (inventory?.in_use) return Status.installed;

    return Status.notInstalled;
};

export const AssetCard: FC<CardProps> = (props) => {
    useGate(AssetCardGate, props.inventory?.asset_id);
    const assetCard = useStore(assetCardStore);
    const status = getCardStatus(props.inventory);

    return <Card {...props} status={status} cardData={assetCard} />;
};

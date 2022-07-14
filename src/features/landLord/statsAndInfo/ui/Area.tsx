import { Area } from 'shared';
import React, { FC } from 'react';
import { useGate, useStore } from 'effector-react';
import { Skeleton } from 'antd';
import { rarityMap } from 'entities/smartcontract';
import {
    AreaStateGate,
    getAreasEffect,
    getInventoriesEffect,
    landlordAreaNftStore,
    landlordAreaTableStore,
    reservedSlotsCountStore,
} from '../model';

export const AreaStats: FC<{ accountName: string }> = ({ accountName }) => {
    useGate(AreaStateGate, { searchParam: accountName });
    const areaNft = useStore(landlordAreaNftStore);
    const area = useStore(landlordAreaTableStore);
    const reservedSlotsCount = useStore(reservedSlotsCountStore);
    const isAreaNftLoading = useStore(getInventoriesEffect.pending);
    const isAreaLoading = useStore(getAreasEffect.pending);
    const isLoading = isAreaLoading || isAreaNftLoading;

    if (isLoading) {
        return <Skeleton />;
    }

    return (
        <Area
            area={areaNft?.asset_id || '-'}
            rarity={areaNft ? rarityMap[areaNft.rarity] : '-'}
            landlord={accountName}
            slots={`${reservedSlotsCount || 0}/${area?.mine_slots.length || 0}`}
        />
    );
};

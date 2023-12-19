import { Area } from 'shared';
import React, { FC } from 'react';
import { useGate, useStore } from 'effector-react';
import { Skeleton } from 'antd';

import {
    $areaInfo,
    AreaInfoGate,
    getAreaInfoStatEffect,
} from '../models/areaInfo';

export const AreaInfo: FC<{ accountName: string }> = ({ accountName }) => {
    useGate(AreaInfoGate, { user: accountName });

    const isLoading = useStore(getAreaInfoStatEffect.pending);

    const areaInfo = useStore($areaInfo);

    if (isLoading) {
        return <Skeleton />;
    }

    return (
        <Area
            area={areaInfo?.area_asset_id || '-'}
            rarity={areaInfo?.area_rarity || '-'}
            landlord={areaInfo?.landlord || '-'}
            slots={areaInfo?.area_slots || '-'}
        />
    );
};

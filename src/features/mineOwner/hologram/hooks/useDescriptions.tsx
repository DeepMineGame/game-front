import { useTranslation } from 'react-i18next';
import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { MineStat } from '../ui/components/mineStat';
import { mineOwnerCabinState } from '../../models';

export function useDescriptions() {
    const { t } = useTranslation();
    const needNftCardTextAndInformer = (
        <div>
            {t('features.mineOwner.placeNft')}{' '}
            <Tooltip overlay={t('features.mineOwner.needMineCard')}>
                <InfoCircleOutlined />
            </Tooltip>
        </div>
    );
    return {
        [mineOwnerCabinState.initial]: needNftCardTextAndInformer,
        [mineOwnerCabinState.needPhysicalShift]: t(
            'features.mineOwner.needShift'
        ),
        [mineOwnerCabinState.needContractWithLandlord]: t(
            'features.mineOwner.needLandLord'
        ),
        [mineOwnerCabinState.needSetupMine]: t(
            'features.mineOwner.needSetupMine'
        ),
        [mineOwnerCabinState.needMineNft]: needNftCardTextAndInformer,
        [mineOwnerCabinState.needActivateMine]: t(
            'features.mineOwner.mineManagementDescription'
        ),
        [mineOwnerCabinState.needCrew]: t(
            'features.mineOwner.needTeamDescription'
        ),
        [mineOwnerCabinState.everythingIsDone]: <MineStat />,
        [mineOwnerCabinState.contractWithLandlordWasTerminated]: t(
            'features.mineOwner.mineNotInArea'
        ),
    };
}

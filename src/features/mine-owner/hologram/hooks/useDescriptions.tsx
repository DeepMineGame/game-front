import { useTranslation } from 'react-i18next';
import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { useStore } from 'effector-react';
import { MineStat } from '../ui/components/mineStat';
import { mineOwnerCabinState } from '../../models';
import { $indicateActionDetails } from '../../../action-indicator';

export function useDescriptions() {
    const { t } = useTranslation();
    const lastAction = useStore($indicateActionDetails);
    const isLastActionFinished = Date.now() >= lastAction.finishAt;
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
            'Sign a contract with a landlord to set a Mine'
        ),
        [mineOwnerCabinState.needSetupMine]: isLastActionFinished
            ? t('Set up the Mine to continue')
            : t('Action in progress'),
        [mineOwnerCabinState.mineIsDepthChanging]: t(
            'features.mineOwner.depthChangingText'
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

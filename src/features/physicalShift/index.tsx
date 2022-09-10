import React, { FC, useState } from 'react';
import { PhysicalShiftBadge, useAccountName } from 'shared';
import {
    LOCATION_TO_ID,
    physicalShift,
    PhysicalShiftArgs,
} from 'entities/smartcontract';
import { useSmartContractAction } from '../hooks';
import { TravelModal } from './ui/TravelModal';

type Props = {
    toLocationId: LOCATION_TO_ID;
    onBadgeCrossClick?: () => void;
    onSuccess: () => void;
    trigger?: React.ReactElement<{ onClose: () => void; onClick: () => void }>;
};

export const Travel: FC<Props> = ({
    toLocationId,
    onBadgeCrossClick,
    onSuccess,
    trigger,
}) => {
    const [isTravelModalVisible, setIsTravelModalVisible] = useState(false);

    const accountName = useAccountName();
    const openTravelModal = () => {
        setIsTravelModalVisible(true);
    };
    const closeTravelModal = () => {
        setIsTravelModalVisible(false);
    };

    const physicalShiftCallback = useSmartContractAction<PhysicalShiftArgs>(
        physicalShift(accountName, toLocationId)
    );
    const handleCallShift = async () => {
        await physicalShiftCallback();
        await onSuccess();
        closeTravelModal();
    };

    return (
        <>
            {trigger ? (
                React.cloneElement(trigger, {
                    onClose: onBadgeCrossClick,
                    onClick: openTravelModal,
                })
            ) : (
                <PhysicalShiftBadge
                    onClose={onBadgeCrossClick}
                    onClick={openTravelModal}
                />
            )}
            <TravelModal
                locationId={toLocationId}
                visible={isTravelModalVisible}
                onClick={handleCallShift}
                onClose={closeTravelModal}
            />
        </>
    );
};

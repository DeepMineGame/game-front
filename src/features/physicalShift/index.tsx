import React, { FC, useState } from 'react';
import { PhysicalShiftBadge, useAccountName } from 'shared';
import { useStore } from 'effector-react';
import {
    LOCATION_TO_ID,
    physicalShift,
    PhysicalShiftParams,
} from 'entities/smartcontract';
import { useSmartContractAction } from '../hooks';
import { $indicateActionDetails } from '../action-indicator/model';
import { TravelModal } from './ui';

type Props = {
    toLocationId: LOCATION_TO_ID;
    onBadgeCrossClick?: () => void;
    onSuccess: () => void;
    trigger?: React.ReactElement<{ onClose: () => void; onClick: () => void }>;
};
export * from './ui';

export const CallToTravelNotification: FC<Props> = ({
    toLocationId,
    onBadgeCrossClick,
    onSuccess,
    trigger,
}) => {
    const lastAction = useStore($indicateActionDetails);

    const [isTravelModalVisible, setIsTravelModalVisible] = useState(false);

    const accountName = useAccountName();
    const openTravelModal = () => {
        setIsTravelModalVisible(true);
    };
    const closeTravelModal = () => {
        setIsTravelModalVisible(false);
    };

    const physicalShiftCallback = useSmartContractAction<PhysicalShiftParams>({
        action: physicalShift(accountName, toLocationId),
    });
    const handleCallShift = async () => {
        await physicalShiftCallback();
        await onSuccess();
        closeTravelModal();
    };

    if (lastAction.initialAmountOfSeconds > 0) return null;

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

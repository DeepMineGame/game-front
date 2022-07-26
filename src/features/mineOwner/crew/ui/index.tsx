import React, { FC } from 'react';
import { MineCrewTable, useAccountName, AddItem } from 'shared';
import { useGate, useStore } from 'effector-react';
import { MineConsumerGate, userMineStore } from '../../models';

export const MineOwnerCrew: FC = () => {
    const accountName = useAccountName();
    useGate(MineConsumerGate, { searchParam: accountName });
    const mines = useStore(userMineStore);
    const activeSlots = mines?.[0]?.contractor_slots.filter(
        (slot) => slot?.contractor
    );
    const mapSlotToTableDate = activeSlots?.map((slot, i) => ({
        key: i,
        discord: '-',
        contractor: slot.contractor,
        status: 2,
        ejection: 0,
        reputation: 0,
        activity: 0,
    }));
    const mapEmptySlotsToAddButton = mines?.[0]?.contractor_slots
        .filter((slot) => !slot?.contractor)
        // eslint-disable-next-line react/no-array-index-key
        .map((_, i) => <AddItem key={i} />);

    return (
        <>
            {Boolean(activeSlots?.length) && (
                <MineCrewTable data={mapSlotToTableDate} />
            )}
            {mapEmptySlotsToAddButton}
        </>
    );
};

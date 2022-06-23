import React, { FC } from 'react';
import { MineCrewTable, useAccountName, AddItem } from 'shared';
import { useGate, useStore } from 'effector-react';
import { minesStore } from 'entities/smartcontract';
import { MineConsumerGate } from '../../models/currentMine';

export const MineOwnerCrew: FC = () => {
    const accountName = useAccountName();
    useGate(MineConsumerGate, { searchParam: accountName });
    const mines = useStore(minesStore);
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
        .map(() => <AddItem key={Math.random()} />);

    return (
        <>
            <MineCrewTable data={mapSlotToTableDate} />
            {mapEmptySlotsToAddButton}
        </>
    );
};

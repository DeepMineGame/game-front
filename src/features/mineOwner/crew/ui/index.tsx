import React, { FC } from 'react';
import { MineCrewTable, useAccountName, AddItem } from 'shared';
import { useGate, useStore } from 'effector-react';
import { minesStore } from 'entities/smartcontract';
import { MineConsumerGate } from '../../models/currentMine';

export const MineOwnerCrew: FC = () => {
    const accountName = useAccountName();
    useGate(MineConsumerGate, { searchParam: accountName });
    const mines = useStore(minesStore);

    return (
        <>
            <MineCrewTable
                data={mines?.[0]?.contractor_slots
                    .filter((slot) => slot)
                    .map((slot) => ({
                        key: slot,
                        discord: '-',
                        contractor: slot,
                        status: 2,
                        ejection: 0,
                        reputation: 0,
                        activity: 0,
                    }))}
            />
            {mines?.[0]?.contractor_slots
                .filter((slot) => !slot)
                .map(() => (
                    <AddItem />
                ))}
        </>
    );
};

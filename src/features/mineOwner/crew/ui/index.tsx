import React, { FC } from 'react';
import { Crew, useAccountName } from 'shared';
import { useGate, useStore } from 'effector-react';
import { minesStore } from 'entities/smartcontract';
import { MineConsumerGate } from '../../models/currentMine';

export const MineOwnerCrew: FC = () => {
    const accountName = useAccountName();
    useGate(MineConsumerGate, { searchParam: accountName });
    const mines = useStore(minesStore);
    console.log(mines);
    return <Crew />;
};

import { KeyValueTable, useAccountName } from 'shared';
import { useGate, useStore } from 'effector-react';
import { $engineerRole, EngineerInfoGate } from './model';

export const EngineerInfo = () => {
    const engineerRole = useStore($engineerRole);
    const accountName = useAccountName();
    useGate(EngineerInfoGate, { searchParam: accountName });
    return (
        <KeyValueTable
            items={{
                Level: engineerRole?.level,
                Experience: engineerRole?.experience,
                'Experience to level up': engineerRole?.exp_to_level_up,
            }}
        />
    );
};

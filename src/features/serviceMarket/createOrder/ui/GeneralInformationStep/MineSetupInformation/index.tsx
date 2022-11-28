import { FC } from 'react';

import { ContractRole } from 'entities/smartcontract';
import { orderFields } from 'entities/order';
import { GeneralInformationStepProps } from '../interface';
import { MineOwnerInformation } from '../MineOwnerInformation';
import { LandlordInformation } from './LandlordInformation';

export const MineSetupInformation: FC<GeneralInformationStepProps> = (
    props
) => {
    const isMineOwner =
        props.form.getFieldValue(orderFields.isClient) ===
        ContractRole.executor;

    if (isMineOwner) return <MineOwnerInformation {...props} />;

    return <LandlordInformation {...props} />;
};

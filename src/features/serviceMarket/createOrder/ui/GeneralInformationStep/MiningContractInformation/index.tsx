import { FC } from 'react';

import { orderFields } from 'entities/order';
import { ContractRole } from 'entities/smartcontract';
import { GeneralInformationStepProps } from '../interface';
import { MineOwnerInformation } from '../MineOwnerInformation';
import { ContractorInformation } from './ContractorInformation';

export const MiningContractInformation: FC<GeneralInformationStepProps> = (
    props
) => {
    const isMineOwner =
        props.form.getFieldValue(orderFields.isClient) === ContractRole.client;

    if (isMineOwner) return <MineOwnerInformation {...props} />;

    return <ContractorInformation {...props} />;
};

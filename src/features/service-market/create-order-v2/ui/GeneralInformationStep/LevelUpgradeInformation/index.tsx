import { FC } from 'react';
import { orderFields } from 'entities/order';
import { Role } from '../../../models';
import { GeneralInformationStepProps } from '../interface';
import { CitizenInformation } from './CitizenInformation';
import { EngineerInformation } from './EngineerInformation';

export const LevelUpgradeInformation: FC<GeneralInformationStepProps> = (
    props
) => {
    const role = props.form.getFieldValue(orderFields.isClient);

    if (role === Role.engineer) return <EngineerInformation {...props} />;

    return <CitizenInformation {...props} />;
};

import { FC } from 'react';
import { GeneralInformationStepProps } from './interface';
import { LeaseItemType } from './LeaseInformation';

export const GeneralInformationStep: FC<GeneralInformationStepProps> = ({
    goToPreviousStep,
    goToNextStep,
    form,
}) => {
    return (
        <LeaseItemType
            form={form}
            goToPreviousStep={goToPreviousStep}
            goToNextStep={goToNextStep}
        />
    );
};

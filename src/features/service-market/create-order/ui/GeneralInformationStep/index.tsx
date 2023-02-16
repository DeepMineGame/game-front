import { FC } from 'react';
import { ContractType } from 'entities/smartcontract';
import { orderFields } from 'entities/order';
import { LevelUpgradeInformation } from './LevelUpgradeInformation';
import { GeneralInformationStepProps } from './interface';
import { MiningContractInformation } from './MiningContractInformation';
import { MineSetupInformation } from './MineSetupInformation';

const ContentMap: Record<ContractType, FC<GeneralInformationStepProps>> = {
    [ContractType.undefined]: () => null,
    [ContractType.landlord_mineowner]: MineSetupInformation,
    [ContractType.mineowner_contractor]: MiningContractInformation,
    [ContractType.level_upgrade]: LevelUpgradeInformation,
};

export const GeneralInformationStep: FC<GeneralInformationStepProps> = ({
    goToPreviousStep,
    goToNextStep,
    form,
}) => {
    const contractType: ContractType =
        form.getFieldValue(orderFields.contractType) ?? ContractType.undefined;

    const Content = ContentMap[contractType];

    return (
        <Content
            form={form}
            goToPreviousStep={goToPreviousStep}
            goToNextStep={goToNextStep}
        />
    );
};

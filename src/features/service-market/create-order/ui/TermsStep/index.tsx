import { FC } from 'react';
import { ContractType } from 'entities/smartcontract';
import { orderFields } from 'entities/order';
import { MineTerms } from './MineTerms';
import { LevelUpgradeTerms } from './LevelUpgradeTerms';
import { TermsStepProps } from './interface';

const ContentMap: Record<ContractType, FC<TermsStepProps>> = {
    [ContractType.undefined]: () => null,
    [ContractType.landlord_mineowner]: MineTerms,
    [ContractType.mineowner_contractor]: MineTerms,
    [ContractType.level_upgrade]: LevelUpgradeTerms,
};

export const TermsStep: FC<TermsStepProps> = ({ goToPreviousStep, form }) => {
    const contractType: ContractType =
        form.getFieldValue(orderFields.contractType) ?? ContractType.undefined;

    const Content = ContentMap[contractType];

    return <Content form={form} goToPreviousStep={goToPreviousStep} />;
};

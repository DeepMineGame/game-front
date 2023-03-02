import { FC } from 'react';
import { ContractType } from 'entities/smartcontract';
import { orderFields } from 'entities/order';
import { Terms } from './Terms';
import { TermsStepProps } from './interface';
import { LevelUpgradeTerms } from './LevelUpgradeTerms';

const ContentMap: Record<ContractType, FC<TermsStepProps>> = {
    [ContractType.undefined]: () => null,
    [ContractType.landlord_mineowner]: Terms,
    [ContractType.mineowner_contractor]: Terms,
    [ContractType.level_upgrade]: LevelUpgradeTerms,
};

export const TermsStep: FC<TermsStepProps> = ({ goToPreviousStep, form }) => {
    const contractType: ContractType =
        form.getFieldValue(orderFields.contractType) ?? ContractType.undefined;

    const Content = ContentMap[contractType];

    return <Content form={form} goToPreviousStep={goToPreviousStep} />;
};

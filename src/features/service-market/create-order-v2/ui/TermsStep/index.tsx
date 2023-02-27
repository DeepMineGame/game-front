import { FC } from 'react';
import { Terms } from './Terms';
import { TermsStepProps } from './interface';

export const TermsStep: FC<TermsStepProps> = ({ goToPreviousStep, form }) => {
    return <Terms form={form} goToPreviousStep={goToPreviousStep} />;
};

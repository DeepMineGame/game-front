import { FormInstance } from 'antd';

export interface TermsStepProps {
    form: FormInstance;
    goToPreviousStep: () => void;
    goToNextStep: () => void;
}

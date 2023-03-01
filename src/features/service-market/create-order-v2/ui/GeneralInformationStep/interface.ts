import { FormInstance } from 'antd';

export interface GeneralInformationStepProps {
    form: FormInstance;
    goToPreviousStep: () => void;
    goToNextStep: () => void;
}

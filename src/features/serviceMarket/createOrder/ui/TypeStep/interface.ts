import { FormInstance } from 'antd';

export interface TypeStepProps {
    form: FormInstance;
    accountName: string;
    goToNextStep: () => void;
}

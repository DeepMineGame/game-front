import React, { useState } from 'react';
import { Steps, useAccountName } from 'shared';
import { Form } from 'antd';
import { createContr, CreateContrDto } from 'entities/smartcontract';
import { useSmartContractActionDynamic } from '../../hooks';
import styles from './styles.module.scss';
import { FirsStep } from './components/FirsеStep';
import { SecondStep } from './components/SecondStep/indes';
import { ThirdStep } from './components/ThirdStep';

export const CreateOrderForm = () => {
    const [currentStep, setStep] = useState(0);
    const [form] = Form.useForm();
    const [values, setValues] = useState<CreateContrDto>();
    const callAction = useSmartContractActionDynamic();
    const accountName = useAccountName();
    return (
        <Form
            className={styles.form}
            layout="vertical"
            form={form}
            onValuesChange={(oldValues, currentValues) =>
                setValues({ ...values, ...currentValues })
            }
            onFinish={() =>
                values &&
                callAction(createContr({ ...values, wax_user: accountName }))
            }
        >
            <Steps
                className={styles.steps}
                direction="vertical"
                current={currentStep}
                steps={[
                    {
                        title: 'Contract type',
                        description: currentStep === 0 ? 'In progress' : '',
                    },
                    {
                        title: 'General conditions',
                        description: currentStep === 1 ? 'In progress' : '',
                    },
                    {
                        title: 'Terms',
                        description: currentStep === 2 ? 'In progress' : '',
                    },
                ]}
            />
            {currentStep === 0 && <FirsStep form={form} setStep={setStep} />}
            {currentStep === 1 && <SecondStep setStep={setStep} />}
            {currentStep === 2 && <ThirdStep setStep={setStep} />}
        </Form>
    );
};

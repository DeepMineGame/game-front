import React, { useState } from 'react';
import { Steps } from 'shared';
import { Form } from 'antd';
import styles from './styles.module.scss';
import { ContractTypeField } from './components/ContractTypeField';

export const CreateOrderForm = () => {
    const [currentStep] = useState(0);
    return (
        <Form
            className={styles.form}
            layout="vertical"
            onValuesChange={() => {}}
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
            {currentStep === 0 && <ContractTypeField />}
        </Form>
    );
};

import React, { useState } from 'react';
import { Steps } from 'shared';
import { Form } from 'antd';
import styles from './styles.module.scss';
import { ContractTypeField } from './components/ContractTypeField';
import { RoleField } from './components/RoleField';

export const CreateOrderForm = () => {
    const [currentStep] = useState(0);
    const [form] = Form.useForm();

    return (
        <Form className={styles.form} layout="vertical" form={form}>
            <Steps
                onChange={() => {}}
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
            {currentStep === 0 && (
                <div className={styles.rightSection}>
                    <ContractTypeField />
                    <RoleField form={form} />
                </div>
            )}
        </Form>
    );
};

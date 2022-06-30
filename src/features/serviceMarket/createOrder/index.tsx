import React, { useState } from 'react';
import { Button, Steps, useAccountName } from 'shared';
import { Form } from 'antd';
import styles from './styles.module.scss';
import { ContractTypeField } from './components/ContractTypeField';
import { RoleField } from './components/RoleField';
import { MineSelectField } from './components/MineSelectField';

export const CreateOrderForm = () => {
    const [currentStep, setStep] = useState(0);
    const [form] = Form.useForm();
    const accountName = useAccountName();

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
                    <ContractTypeField form={form} />
                    <RoleField form={form} />
                    {accountName && (
                        <MineSelectField
                            form={form}
                            accountName={accountName}
                        />
                    )}
                    <Button block type="primary" onClick={() => setStep(1)}>
                        Next
                    </Button>
                </div>
            )}
        </Form>
    );
};

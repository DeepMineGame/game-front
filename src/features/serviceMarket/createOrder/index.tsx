import React, { useState } from 'react';
import { Steps, useAccountName } from 'shared';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { createContr, CreateContrDto } from 'entities/smartcontract';
import { useSmartContractActionDynamic } from '../../hooks';
import styles from './styles.module.scss';
import { FirsStep } from './components/FirsеStep';
import { SecondStep } from './components/SecondStep/indes';
import { ThirdStep } from './components/ThirdStep';

export const CreateOrderForm = () => {
    const { t } = useTranslation();
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
                        title: t(
                            'pages.serviceMarket.createOrder.contractType'
                        ),
                        description:
                            currentStep === 0
                                ? t('components.common.inProgress')
                                : '',
                    },
                    {
                        title: t(
                            'pages.serviceMarket.createOrder.generalCondition'
                        ),
                        description:
                            currentStep === 1
                                ? t('components.common.inProgress')
                                : '',
                    },
                    {
                        title: t('pages.serviceMarket.createOrder.terms'),
                        description:
                            currentStep === 2
                                ? t('components.common.inProgress')
                                : '',
                    },
                ]}
            />
            {currentStep === 0 && <FirsStep form={form} setStep={setStep} />}
            {currentStep === 1 && <SecondStep setStep={setStep} />}
            {currentStep === 2 && <ThirdStep setStep={setStep} />}
        </Form>
    );
};

import { useState } from 'react';
import { Steps, useAccountName } from 'shared';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { serviceMarket } from 'app/router/paths';
import { createContr, CreateContrDto } from 'entities/smartcontract';
import { useSmartContractActionDynamic } from '../../hooks';
import styles from './styles.module.scss';
import { ContractTypeAndRoleStep } from './ui/ContractTypeAndRoleStep';
import { GeneralConditionStep } from './ui/GeneralConditionStep';
import { TermsStep } from './ui/TermsStep';
import { CreateResult } from './ui/CreateResult';
import { useInitialValues } from './hooks/useInitialValues';

export const CreateOrderForm = () => {
    const { t } = useTranslation();
    const initialValues = useInitialValues();
    const [currentStep, setStep] = useState(0);
    const [form] = Form.useForm();
    const [values, setValues] =
        useState<Partial<CreateContrDto>>(initialValues);
    const callAction = useSmartContractActionDynamic();
    const accountName = useAccountName();
    const navigate = useNavigate();
    const [formStatus, setFormStatus] = useState<'init' | 'success'>('init');

    if (formStatus === 'success') {
        return (
            <CreateResult
                button={{ callback: () => navigate(serviceMarket) }}
            />
        );
    }

    return (
        <Form
            className={styles.form}
            layout="vertical"
            form={form}
            initialValues={initialValues}
            onValuesChange={(_, currentValues) =>
                setValues({ ...values, ...currentValues })
            }
            onFinish={async () => {
                await callAction(
                    createContr({
                        ...values,
                        wax_user: accountName,
                    } as CreateContrDto)
                );
                setFormStatus('success');
                setTimeout(() => navigate(serviceMarket), 3000);
            }}
        >
            <Steps
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
                                : t('components.common.completed'),
                    },
                    {
                        title: t(
                            'pages.serviceMarket.createOrder.generalCondition'
                        ),
                        description: (() => {
                            if (currentStep === 1)
                                return t('components.common.inProgress');
                            if (currentStep > 1)
                                return t('components.common.completed');
                            return '';
                        })(),
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
            {currentStep === 0 && (
                <ContractTypeAndRoleStep
                    accountName={accountName}
                    form={form}
                    setStep={setStep}
                />
            )}
            {currentStep === 1 && (
                <GeneralConditionStep setStep={setStep} form={form} />
            )}
            {currentStep === 2 && <TermsStep form={form} setStep={setStep} />}
        </Form>
    );
};

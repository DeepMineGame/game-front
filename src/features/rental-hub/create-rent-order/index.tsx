import { useState, FC } from 'react';
import { Steps, useAccountName } from 'shared';
import { Form } from 'antd';
import { FrownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { rentalHub } from 'app/router/paths';
import { createRentOrder, rentOrderField } from 'entities/smartcontract';
import { useSmartContractActionDynamic } from '../../hooks';
import styles from './styles.module.scss';
import { GeneralInformationStep } from './ui/GeneralInformationStep';
import { TermsStep } from './ui/TermsStep';
import { CreateResult } from './ui/CreateResult';
import { DepositAndBuyout } from './ui/DepositAndBuyot';

enum Step {
    first,
    second,
    third,
}

enum Status {
    idle,
    success,
    error,
}

const StepContent: FC<{ step: Step; currentStep: Step }> = ({
    step,
    currentStep,
    children,
}) => (
    <div
        className={styles.rightSection}
        style={{
            display: step === currentStep ? 'block' : 'none',
        }}
    >
        {children}
    </div>
);

export const CreateRentOrder = () => {
    const { t } = useTranslation();

    const [currentStep, setStep] = useState(Step.first);
    const [form] = Form.useForm();
    const callAction = useSmartContractActionDynamic();
    const accountName = useAccountName();
    const navigate = useNavigate();
    const [formStatus, setFormStatus] = useState<Status>(Status.idle);

    if (formStatus === Status.success) {
        return (
            <CreateResult button={{ callback: () => navigate(rentalHub) }} />
        );
    }

    if (formStatus === Status.error) {
        return (
            <CreateResult
                status="warning"
                icon={<FrownOutlined style={{ color: '#F5C913' }} />}
                title={t('pages.serviceMarket.createOrder.orderFailed')}
                subTitle={t('pages.serviceMarket.createOrder.pleaseReCreate')}
                button={{
                    text: t('pages.serviceMarket.createOrder.reCreateOrder'),
                    callback: () => {
                        setStep(Step.first);
                        setFormStatus(Status.idle);
                    },
                }}
            />
        );
    }

    const handleCreate = async () => {
        const orderData = form.getFieldsValue();
        try {
            await callAction(
                createRentOrder({ ...orderData, wax_user: accountName })
            );
            setFormStatus(Status.success);
        } catch (error) {
            setFormStatus(Status.error);
        }
    };

    return (
        <Form
            className={styles.form}
            layout="vertical"
            form={form}
            onFinish={handleCreate}
            initialValues={{
                [rentOrderField.asset_ids]: [],
                [rentOrderField.autorenew_enabled]: true,
            }}
        >
            <Steps
                className={styles.steps}
                direction="vertical"
                current={currentStep}
                steps={[
                    {
                        title: t('General information'),
                        description:
                            currentStep === Step.first &&
                            t('components.common.inProgress'),
                    },
                    {
                        title: t('pages.serviceMarket.createOrder.terms'),
                        description:
                            currentStep === Step.second &&
                            t('components.common.inProgress'),
                    },
                    {
                        title: t('Deposit and buyout'),
                        description:
                            currentStep === Step.third &&
                            t('components.common.inProgress'),
                    },
                ]}
            />
            <StepContent step={Step.first} currentStep={currentStep}>
                <GeneralInformationStep
                    form={form}
                    goToPreviousStep={() => setStep(Step.first)}
                    goToNextStep={() => setStep(Step.second)}
                />
            </StepContent>
            <StepContent step={Step.second} currentStep={currentStep}>
                <TermsStep
                    form={form}
                    goToPreviousStep={() => setStep(Step.first)}
                    goToNextStep={() => setStep(Step.third)}
                />
            </StepContent>
            <StepContent step={Step.third} currentStep={currentStep}>
                <DepositAndBuyout
                    goToPreviousStep={() => setStep(Step.second)}
                />
            </StepContent>
        </Form>
    );
};

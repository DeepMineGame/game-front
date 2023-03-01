import { useState, FC } from 'react';
import { Steps, useAccountName } from 'shared';
import { Form } from 'antd';
import { FrownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { serviceMarket } from 'app/router/paths';
import {
    ContractType,
    createLevelUpgradeOrder,
    createMineOrder,
} from 'entities/smartcontract';
import { useSmartContractActionDynamic } from '../../hooks';
import styles from './styles.module.scss';
import { TypeStep } from './ui/TypeStep';
import { GeneralInformationStep } from './ui/GeneralInformationStep';
import { TermsStep } from './ui/TermsStep';
import { CreateResult } from './ui/CreateResult';
import { useInitialValues } from './hooks/useInitialValues';

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

const createOrderActionsMap: Record<
    ContractType,
    ((orderData: any) => any) | undefined
> = {
    [ContractType.undefined]: undefined,
    [ContractType.landlord_mineowner]: createMineOrder,
    [ContractType.mineowner_contractor]: createMineOrder,
    [ContractType.level_upgrade]: createLevelUpgradeOrder,
};

export const CreateOrderFormV2 = () => {
    const { t } = useTranslation();
    const initialValues = useInitialValues();
    const [currentStep, setStep] = useState(Step.first);
    const [form] = Form.useForm();
    const callAction = useSmartContractActionDynamic();
    const accountName = useAccountName();
    const navigate = useNavigate();
    const [formStatus, setFormStatus] = useState<Status>(Status.idle);

    if (formStatus === Status.success) {
        return (
            <CreateResult
                button={{ callback: () => navigate(serviceMarket) }}
            />
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
        const createOrder =
            createOrderActionsMap[orderData.contract_type as ContractType];

        if (createOrder) {
            try {
                await callAction(
                    createOrder({ ...orderData, wax_user: accountName })
                );
                setFormStatus(Status.success);
            } catch (error) {
                setFormStatus(Status.error);
            }
        }
    };

    return (
        <Form
            className={styles.form}
            layout="vertical"
            form={form}
            initialValues={initialValues}
            onFinish={handleCreate}
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
                            currentStep === Step.first &&
                            t('components.common.inProgress'),
                    },
                    {
                        title: t(
                            'pages.serviceMarket.createOrder.generalInformation'
                        ),
                        description:
                            currentStep === Step.second &&
                            t('components.common.inProgress'),
                    },
                    {
                        title: t('pages.serviceMarket.createOrder.terms'),
                        description:
                            currentStep === Step.third &&
                            t('components.common.inProgress'),
                    },
                ]}
            />
            <StepContent step={Step.first} currentStep={currentStep}>
                <TypeStep
                    accountName={accountName}
                    form={form}
                    goToNextStep={() => setStep(Step.second)}
                />
            </StepContent>
            <StepContent step={Step.second} currentStep={currentStep}>
                <GeneralInformationStep
                    form={form}
                    goToPreviousStep={() => setStep(Step.first)}
                    goToNextStep={() => setStep(Step.third)}
                />
            </StepContent>
            <StepContent step={Step.third} currentStep={currentStep}>
                <TermsStep
                    form={form}
                    goToPreviousStep={() => setStep(Step.second)}
                />
            </StepContent>
        </Form>
    );
};

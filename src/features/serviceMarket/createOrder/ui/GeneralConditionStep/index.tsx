import { FC } from 'react';
import { Card, Form, FormInstance, Input as InputA, Space } from 'antd';
import { Button, Input, Select, getLabelSelectItem } from 'shared';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { createContrFormFields } from 'entities/smartcontract';
import styles from '../../styles.module.scss';
import localStyles from './styles.module.scss';

const { useWatch } = Form;

export const GeneralConditionStep: FC<{
    setStep: React.Dispatch<React.SetStateAction<number>>;
    form: FormInstance;
}> = ({ setStep, form }) => {
    const { t } = useTranslation();
    const feeFieldValue = useWatch(createContrFormFields.fee, form);
    const finishesAtFieldValue = useWatch(
        createContrFormFields.contractDuration,
        form
    );
    const deadlineTimeInDaysFieldValue = useWatch(
        createContrFormFields.deadlineDurationInDays,
        form
    );
    const deadlineTimeInHoursFieldValue = useWatch(
        createContrFormFields.deadlineDurationInHours,
        form
    );
    const hasAllValues =
        feeFieldValue &&
        deadlineTimeInDaysFieldValue &&
        finishesAtFieldValue &&
        (deadlineTimeInHoursFieldValue || deadlineTimeInHoursFieldValue === 0);

    return (
        <Form.Item>
            <InputA.Group compact>
                <Form.Item
                    name={createContrFormFields.fee}
                    label={t('pages.serviceMarket.createOrder.fee')}
                    className={cn(styles.formField, localStyles.feeInput)}
                    tooltip={
                        <Card
                            title={t('pages.serviceMarket.createOrder.fee')}
                            className={styles.tooltipCard}
                        >
                            {t('pages.serviceMarket.createOrder.feeTooltip')}
                        </Card>
                    }
                >
                    <Input placeholder="%" />
                </Form.Item>
                <Form.Item
                    name={createContrFormFields.contractDuration}
                    label={t('components.common.duration')}
                    className={cn(localStyles.finisAtSelect, styles.formField)}
                >
                    <Select
                        placeholder={t('components.common.days')}
                        options={getLabelSelectItem({
                            amount: 21,
                            label: t('components.common.days'),
                        })}
                    />
                </Form.Item>
            </InputA.Group>
            <InputA.Group>
                <div className={localStyles.deadlineInputsContainer}>
                    <Form.Item
                        name={createContrFormFields.deadlineDurationInDays}
                        label={t(
                            'pages.serviceMarket.createOrder.startOfOperation'
                        )}
                        className={cn(styles.formField)}
                        tooltip={
                            <Card
                                title={t(
                                    'pages.serviceMarket.createOrder.startOfOperation'
                                )}
                                className={styles.tooltipCard}
                            >
                                {t(
                                    'pages.serviceMarket.createOrder.startOfOperationTooltip'
                                )}
                            </Card>
                        }
                    >
                        <Select
                            placeholder={t('components.common.days')}
                            options={getLabelSelectItem({
                                amount: 3,
                                label: t('components.common.days'),
                            })}
                            disabled
                            defaultValue={{ value: 1, label: '1 Days' }}
                        />
                    </Form.Item>
                    <Form.Item
                        name={createContrFormFields.deadlineDurationInHours}
                        className={cn(styles.formField)}
                    >
                        <Select
                            placeholder={t('components.common.hours')}
                            options={getLabelSelectItem({
                                amount: 23,
                                label: t('components.common.hours'),
                                sinceZero: true,
                            })}
                            disabled
                            defaultValue={{ value: 0, label: '0 Hours' }}
                        />
                    </Form.Item>
                </div>
            </InputA.Group>
            <Space direction="horizontal">
                <Button onClick={() => setStep(0)} ghost>
                    {t('kit.back')}
                </Button>
                <Button
                    disabled={!hasAllValues}
                    onClick={() => setStep(2)}
                    type="primary"
                >
                    {t('components.common.button.next')}
                </Button>
            </Space>
        </Form.Item>
    );
};

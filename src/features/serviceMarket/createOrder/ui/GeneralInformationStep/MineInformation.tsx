import { FC } from 'react';
import { Card, Form, Input as InputA, Space } from 'antd';
import { Button, Input, Select, getLabelSelectItem } from 'shared';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { orderFields } from 'entities/order';

import styles from '../../styles.module.scss';
import localStyles from './styles.module.scss';
import { GeneralInformationStepProps } from './interface';

const { useWatch } = Form;

export const MineInformation: FC<GeneralInformationStepProps> = ({
    goToNextStep,
    goToPreviousStep,
    form,
}) => {
    const { t } = useTranslation();
    const feeFieldValue = useWatch(orderFields.feePercent, form);
    const finishesAtFieldValue = useWatch(orderFields.contractDuration, form);
    const deadlineTimeInDaysFieldValue = useWatch(
        orderFields.deadlineDurationInDays,
        form
    );
    const deadlineTimeInHoursFieldValue = useWatch(
        orderFields.deadlineDurationInHours,
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
                    name={orderFields.feePercent}
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
                    name={orderFields.contractDuration}
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
                        name={orderFields.deadlineDurationInDays}
                        label={t(
                            'pages.serviceMarket.createOrder.startOfOperation'
                        )}
                        className={cn(styles.formField)}
                        tooltip={
                            <Card
                                title={t(
                                    'pages.serviceMarket.createOrder.effectiveDate'
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
                        />
                    </Form.Item>
                    <Form.Item
                        name={orderFields.deadlineDurationInHours}
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
                        />
                    </Form.Item>
                </div>
            </InputA.Group>
            <Space direction="horizontal">
                <Button onClick={goToPreviousStep} ghost>
                    {t('kit.back')}
                </Button>
                <Button
                    disabled={!hasAllValues}
                    onClick={goToNextStep}
                    type="primary"
                >
                    {t('components.common.button.next')}
                </Button>
            </Space>
        </Form.Item>
    );
};

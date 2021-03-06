import React, { FC } from 'react';
import { Card, Form, FormInstance, Input as InputA, Space } from 'antd';
import { Button, Input, Select, getDaysSelectItem } from 'shared';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useWatch } from 'antd/es/form/Form';
import { createContrFormFields } from 'entities/smartcontract';
import styles from '../../styles.module.scss';
import localStyles from './styles.module.scss';

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
    const deadlineTimeFieldValue = useWatch(
        createContrFormFields.deadlineDuration,
        form
    );
    const hasAllValues =
        feeFieldValue && deadlineTimeFieldValue && finishesAtFieldValue;

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
                        options={getDaysSelectItem({ amountOfDays: 21 })}
                    />
                </Form.Item>
            </InputA.Group>
            <Form.Item
                name={createContrFormFields.deadlineDuration}
                label={t('pages.serviceMarket.createOrder.startOfOperation')}
                className={cn(localStyles.deadLineField, styles.formField)}
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
                    options={getDaysSelectItem({ amountOfDays: 3 })}
                />
            </Form.Item>
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

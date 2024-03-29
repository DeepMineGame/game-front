import React, { FC } from 'react';
import { Card, Form, InputNumber, Space, Input } from 'antd';
import { Button, Checkbox, getLabelSelectItem, Select } from 'shared';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { rentOrderField } from 'entities/smartcontract';
import styles from '../../styles.module.scss';
import { PersonalizedOrderCheckbox } from '../PersonalizedOrderCheckbox';
import localStyles from './styles.module.scss';
import { TermsStepProps } from './interface';

const { useWatch } = Form;

export const Terms: FC<TermsStepProps> = ({
    goToPreviousStep,
    goToNextStep,
    form,
}) => {
    const { t } = useTranslation();
    const hasFeePercent =
        useWatch(rentOrderField.fee_percent, form) !== undefined;
    const hasFeeMinAmount =
        useWatch(rentOrderField.fee_min_amount, form) !== undefined;
    const hasContractDuration = useWatch(rentOrderField.contract_duration);
    const hasAllValues =
        hasFeePercent && hasFeeMinAmount && hasContractDuration;

    return (
        <div>
            <Input.Group>
                <Form.Item
                    label={t('Rental fee')}
                    className={cn(styles.formField, localStyles.feeInput)}
                    name={rentOrderField.fee_percent}
                    initialValue={10}
                    tooltip={
                        <Card
                            title={t('Rental fee')}
                            className={styles.tooltipCard}
                        >
                            {t(
                                'Rental fee % of production in DME that the equipment lessee gives to the owner from each DME produced'
                            )}
                        </Card>
                    }
                >
                    <InputNumber
                        placeholder="%"
                        min={0}
                        max={100}
                        type="number"
                        controls={false}
                        className={styles.inputNumber}
                    />
                </Form.Item>
            </Input.Group>

            <Form.Item
                label={t('Minimum Fee')}
                className={cn(styles.formField, localStyles.feeInput)}
                name={rentOrderField.fee_min_amount}
            >
                <InputNumber
                    type="number"
                    controls={false}
                    className={styles.inputNumber}
                />
            </Form.Item>

            <Form.Item
                name={rentOrderField.contract_duration}
                label={t('Duration')}
                className={cn(localStyles.finisAtSelect, styles.formField)}
            >
                <Select
                    placeholder={t('components.common.days')}
                    options={getLabelSelectItem({
                        amount: 30,
                        label: t('components.common.day'),
                    })}
                />
            </Form.Item>

            <Form.Item
                name={rentOrderField.autorenew_enabled}
                valuePropName="checked"
            >
                <Checkbox>{t('Auto-renewal')}</Checkbox>
            </Form.Item>
            <Space direction="vertical" size="large">
                <PersonalizedOrderCheckbox form={form} />
                <Space direction="horizontal">
                    <Button onClick={goToPreviousStep}>{t('kit.back')}</Button>
                    <Button
                        onClick={goToNextStep}
                        type="primary"
                        disabled={!hasAllValues}
                    >
                        {t('Next')}
                    </Button>
                </Space>
            </Space>
        </div>
    );
};

import React, { FC } from 'react';
import { Card, Form, InputNumber, Space, Input } from 'antd';
import { Button, getLabelSelectItem, Select } from 'shared';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { orderFields } from 'entities/order';
import styles from '../../styles.module.scss';
import localStyles from './styles.module.scss';
import { TermsStepProps } from './interface';

export const MineTerms: FC<TermsStepProps> = ({ goToPreviousStep }) => {
    const { t } = useTranslation();

    return (
        <div>
            <Space size="large">
                <Form.Item
                    label={t('pages.serviceMarket.createOrder.fee')}
                    className={cn(styles.formField, localStyles.feeInput)}
                    name={orderFields.feePercent}
                    initialValue={10}
                    tooltip={
                        <Card
                            title={t('pages.serviceMarket.createOrder.fee')}
                            className={styles.tooltipCard}
                        >
                            {t('pages.serviceMarket.createOrder.feeTooltip')}
                        </Card>
                    }
                >
                    <InputNumber
                        placeholder="%"
                        type="number"
                        min={10}
                        controls={false}
                        className={styles.inputNumber}
                    />
                </Form.Item>
                <Form.Item
                    name={orderFields.deposit}
                    label={t('Minimum Fee')}
                    className={cn(styles.formField, localStyles.feeInput)}
                    initialValue={1}
                    tooltip={
                        <Card
                            title={t('pages.serviceMarket.createOrder.fee')}
                            className={styles.tooltipCard}
                        >
                            {t('pages.serviceMarket.createOrder.feeTooltip')}
                        </Card>
                    }
                >
                    <InputNumber
                        placeholder="%"
                        type="number"
                        controls={false}
                        className={styles.inputNumber}
                    />
                </Form.Item>
            </Space>
            <Input.Group>
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
                                label: t('components.common.day'),
                            })}
                            disabled
                        />
                    </Form.Item>
                    <Form.Item
                        name={orderFields.deadlineDurationInHours}
                        className={cn(styles.formField)}
                    >
                        <Select
                            placeholder={t('components.common.hour')}
                            options={getLabelSelectItem({
                                amount: 23,
                                label: t('components.common.hour'),
                                sinceZero: true,
                            })}
                            disabled
                        />
                    </Form.Item>
                </div>
            </Input.Group>

            <Space direction="horizontal">
                <Button onClick={goToPreviousStep} ghost>
                    {t('kit.back')}
                </Button>
                <Button htmlType="submit" type="primary">
                    {t('components.common.button.create')}
                </Button>
            </Space>
        </div>
    );
};

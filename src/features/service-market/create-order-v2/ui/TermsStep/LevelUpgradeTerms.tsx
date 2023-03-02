import React, { FC } from 'react';
import { Card, Form, InputNumber, Space, Input } from 'antd';
import { Button, getLabelSelectItem, Select } from 'shared';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { orderFields } from 'entities/order';
import styles from '../../styles.module.scss';
import localStyles from './styles.module.scss';
import { TermsStepProps } from './interface';

export const LevelUpgradeTerms: FC<TermsStepProps> = ({ goToPreviousStep }) => {
    const { t } = useTranslation();

    return (
        <div>
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

            <Space size="large">
                <Form.Item
                    label={t('Cost of execution')}
                    className={cn(styles.formField, localStyles.feeInput)}
                    name={orderFields.feePercent}
                    initialValue={10}
                    tooltip={
                        <Card
                            title={t('Cost of execution')}
                            className={styles.tooltipCard}
                        >
                            {t(
                                'The amount of DME the performing party receives for contract performance'
                            )}
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
                    label={t('Penalty')}
                    className={cn(styles.formField, localStyles.feeInput)}
                    initialValue={1}
                    tooltip={
                        <Card
                            title={t('Penalty')}
                            className={styles.tooltipCard}
                        >
                            {t(
                                'If the an engineer violates the terms of the contract or terminates the contract prematurely, the counterparty may charge a fine'
                            )}
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

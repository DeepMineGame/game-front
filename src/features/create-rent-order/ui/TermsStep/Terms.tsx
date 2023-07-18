import React, { FC } from 'react';
import { Card, Form, InputNumber, Space, Input } from 'antd';
import { Button, Checkbox, getLabelSelectItem, Select } from 'shared';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { rentOrderField } from 'entities/smartcontract';
import styles from '../../styles.module.scss';
import localStyles from './styles.module.scss';
import { TermsStepProps } from './interface';

export const Terms: FC<TermsStepProps> = ({ goToPreviousStep }) => {
    const { t } = useTranslation();

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
                        min={10}
                        max={100}
                        type="number"
                        controls={false}
                        className={styles.inputNumber}
                    />
                </Form.Item>
            </Input.Group>

            <Form.Item
                name={rentOrderField.contract_duration}
                label={t('Duration')}
                className={cn(localStyles.finisAtSelect, styles.formField)}
            >
                <Select
                    placeholder={t('components.common.days')}
                    options={getLabelSelectItem({
                        amount: 21,
                        label: t('components.common.day'),
                        // temporary solution because contract for 1 day isn't possible yet
                    }).filter((_, idx) => idx !== 0)}
                />
            </Form.Item>
            <Form.Item
                name={rentOrderField.deposit_amount}
                label={t('Deposit amount')}
                className={cn(styles.formField, localStyles.feeInput)}
                initialValue={1}
            >
                <InputNumber
                    placeholder="DME"
                    type="number"
                    controls={false}
                    className={styles.inputNumber}
                />
            </Form.Item>
            <Form.Item
                name={rentOrderField.autorenew_enabled}
                valuePropName="checked"
            >
                <Checkbox>{t('Auto-renewal')}</Checkbox>
            </Form.Item>
            <Space direction="horizontal">
                <Button onClick={goToPreviousStep}>{t('kit.back')}</Button>
                <Button htmlType="submit" type="primary">
                    {t('components.common.button.create')}
                </Button>
            </Space>
        </div>
    );
};

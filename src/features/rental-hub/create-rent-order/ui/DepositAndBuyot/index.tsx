import {
    Form,
    FormInstance,
    Input,
    InputNumber,
    Space,
    Typography,
} from 'antd';
import cn from 'classnames';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared';
import { rentOrderField } from 'entities/smartcontract';
import styles from '../../styles.module.scss';
import localStyles from '../TermsStep/styles.module.scss';

const { useWatch } = Form;

export interface DepositAndBuyoutProps {
    goToPreviousStep: () => void;
    form: FormInstance;
}

export const DepositAndBuyout: FC<DepositAndBuyoutProps> = ({
    goToPreviousStep,
    form,
}) => {
    const { t } = useTranslation();
    const hasWax = useWatch(rentOrderField.insurance_wax_amount, form);
    const hasDme =
        useWatch(rentOrderField.insurance_dme_amount, form) !== undefined;
    const hasDmp = useWatch(rentOrderField.insurance_dmp_amount, form);
    const hasAllValues = hasDme && hasWax && hasDmp;
    return (
        <div>
            <Typography.Title>{t('Deposit')}</Typography.Title>
            <Typography.Paragraph>
                {t('The deposit can be made in one or more currencies')}
            </Typography.Paragraph>
            <Input.Group>
                <Form.Item
                    label="WAX"
                    className={cn(styles.formField, localStyles.feeInput)}
                    name={rentOrderField.insurance_wax_amount}
                >
                    <InputNumber
                        placeholder="WAX"
                        type="number"
                        controls={false}
                        className={styles.inputNumber}
                    />
                </Form.Item>
            </Input.Group>
            <Input.Group>
                <Form.Item
                    label="DME"
                    className={cn(styles.formField, localStyles.feeInput)}
                    name={rentOrderField.insurance_dme_amount}
                >
                    <InputNumber
                        placeholder="DME"
                        type="number"
                        controls={false}
                        className={styles.inputNumber}
                    />
                </Form.Item>
            </Input.Group>
            <Input.Group>
                <Form.Item
                    label="DMP"
                    className={cn(styles.formField, localStyles.feeInput)}
                    name={rentOrderField.insurance_dmp_amount}
                >
                    <InputNumber
                        placeholder="DMP"
                        type="number"
                        controls={false}
                        className={styles.inputNumber}
                    />
                </Form.Item>
            </Input.Group>
            <Typography.Title>{t('Buyout')}</Typography.Title>
            <Typography.Paragraph>
                {t('The buyout can be made in one or more currencies')}
            </Typography.Paragraph>
            <Form.Item
                label={t('Buyout price')}
                className={cn(styles.formField, localStyles.feeInput)}
                name={rentOrderField.buyout_price}
            >
                <InputNumber
                    disabled
                    type="number"
                    controls={false}
                    className={styles.inputNumber}
                />
            </Form.Item>
            <Space direction="horizontal">
                <Button onClick={goToPreviousStep}>{t('kit.back')}</Button>
                <Button
                    htmlType="submit"
                    type="primary"
                    disabled={!hasAllValues}
                >
                    {t('Create')}
                </Button>
            </Space>
        </div>
    );
};

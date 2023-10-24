import {
    Alert,
    App,
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
import { orderFields } from 'entities/order';
import styles from '../../styles.module.scss';
import localStyles from '../TermsStep/styles.module.scss';
import { EquipmentType } from '../LeaseTypeFormItem';

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
    const hasDme = useWatch(rentOrderField.insurance_dme_amount, form);
    const hasDmp = useWatch(rentOrderField.insurance_dmp_amount, form);
    const ifOneInsuranceValueBiggerThanZero =
        Number(hasDme) > 0 || Number(hasWax) > 0 || Number(hasDmp) > 0;
    const { modal } = App.useApp();
    const selectedLeaseType = useWatch(orderFields.optSchema, form);

    const ifNonRequiredInsurance =
        selectedLeaseType === EquipmentType.mine ||
        selectedLeaseType === EquipmentType.areas;
    const onCreateHandler = () => {
        if (ifNonRequiredInsurance) {
            return form.submit();
        }
        if (!ifOneInsuranceValueBiggerThanZero) {
            return modal.confirm({
                title: t(
                    'Are you sure you want to proceed with 0 Insurance Deposit?'
                ),
                content: t(
                    'This means renters can return your equipment depreciated and you will not be compensated for that'
                ),
                onOk: form.submit,
            });
        }
        return form.submit();
    };

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
                    initialValue={0}
                >
                    <InputNumber
                        placeholder="WAX"
                        type="number"
                        controls={false}
                        className={styles.inputNumber}
                        disabled={ifNonRequiredInsurance}
                    />
                </Form.Item>
            </Input.Group>
            <Input.Group>
                <Form.Item
                    label="DME"
                    className={cn(styles.formField, localStyles.feeInput)}
                    name={rentOrderField.insurance_dme_amount}
                    initialValue={0}
                >
                    <InputNumber
                        placeholder="DME"
                        type="number"
                        controls={false}
                        className={styles.inputNumber}
                        disabled={ifNonRequiredInsurance}
                    />
                </Form.Item>
            </Input.Group>
            <Input.Group>
                <Form.Item
                    initialValue={0}
                    label="DMP"
                    className={cn(styles.formField, localStyles.feeInput)}
                    name={rentOrderField.insurance_dmp_amount}
                >
                    <InputNumber
                        placeholder="DMP"
                        type="number"
                        controls={false}
                        className={styles.inputNumber}
                        disabled={ifNonRequiredInsurance}
                    />
                </Form.Item>
            </Input.Group>
            {ifNonRequiredInsurance && (
                <Alert
                    type="warning"
                    message={t(
                        'Mines and lands cannot be damaged, so they do not require insurance. The asset will be returned to the owner in any case'
                    )}
                />
            )}

            <Typography.Title>{t('Buyout')}</Typography.Title>
            <Typography.Paragraph>
                {t('The buyout can be made in one or more currencies')}
            </Typography.Paragraph>
            <Form.Item
                label={t('Buyout price')}
                className={cn(styles.formField, localStyles.feeInput)}
                name={rentOrderField.buyout_wax_amount}
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
                <Button onClick={onCreateHandler} type="primary">
                    {t('Create')}
                </Button>
            </Space>
        </div>
    );
};

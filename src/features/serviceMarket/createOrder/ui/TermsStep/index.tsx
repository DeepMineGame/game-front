import React, { FC } from 'react';
import { Card, Form, FormInstance, Space } from 'antd';
import {
    Button,
    getLabelSelectItem,
    Input,
    Select,
    Title,
    Tooltip,
} from 'shared';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { createContrFormFields } from 'entities/smartcontract';
import styles from '../../styles.module.scss';
import localStyles from './styles.module.scss';

const { useWatch } = Form;

export const TermsStep: FC<{
    setStep: React.Dispatch<React.SetStateAction<number>>;
    form: FormInstance;
}> = ({ setStep, form }) => {
    const { t } = useTranslation();
    const daysForPenaltyFieldValue = useWatch(
        createContrFormFields.daysForPenalty,
        form
    );
    const feeDailyMinAmountValue = useWatch(
        createContrFormFields.feeDailyMinAmount,
        form
    );
    const penaltyAmountFieldValue = useWatch(
        createContrFormFields.penaltyAmount,
        form
    );
    const hasAllValues =
        daysForPenaltyFieldValue &&
        feeDailyMinAmountValue &&
        penaltyAmountFieldValue;

    return (
        <div>
            <div className={localStyles.terms}>
                <div>
                    <Title level={5}>
                        {t('pages.serviceMarket.createOrder.miningTerms')}{' '}
                        <Tooltip
                            overlay={
                                <Card
                                    title={t(
                                        'pages.serviceMarket.createOrder.miningTerms'
                                    )}
                                    className={styles.tooltipCard}
                                >
                                    {t(
                                        'pages.serviceMarket.createOrder.miningTermsHint'
                                    )}
                                </Card>
                            }
                        >
                            <QuestionCircleOutlined />
                        </Tooltip>
                    </Title>
                    <Space direction="vertical">
                        <div className={localStyles.inlineInput}>
                            <div>
                                {t('pages.serviceMarket.createOrder.ifDuring')}
                            </div>
                            <div>
                                <Form.Item
                                    name={createContrFormFields.daysForPenalty}
                                    className={cn(
                                        styles.formField,
                                        localStyles.field
                                    )}
                                >
                                    <Select
                                        options={getLabelSelectItem({
                                            amount: 21,
                                            label: t('components.common.days'),
                                        })}
                                        placeholder={t(
                                            'components.common.days'
                                        )}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div className={localStyles.inlineInput}>
                            <div>
                                {t(
                                    'pages.serviceMarket.createOrder.willExtractLessThan'
                                )}
                            </div>
                            <Form.Item
                                name={createContrFormFields.feeDailyMinAmount}
                                className={cn(
                                    styles.formField,
                                    localStyles.field
                                )}
                            >
                                <Input
                                    placeholder={t(
                                        'components.common.button.dme'
                                    )}
                                />
                            </Form.Item>
                        </div>
                    </Space>
                </div>
                <div>
                    {t('pages.serviceMarket.createOrder.contractorFined')}
                </div>
                <Form.Item
                    name={createContrFormFields.penaltyAmount}
                    className={cn(styles.formField, localStyles.field)}
                    label={t('pages.serviceMarket.createOrder.penalty')}
                    tooltip={
                        <Card
                            title={t('pages.serviceMarket.createOrder.penalty')}
                            className={styles.tooltipCard}
                        >
                            {t('pages.serviceMarket.createOrder.penaltyHint')}
                        </Card>
                    }
                >
                    <Input placeholder="DME" />
                </Form.Item>
            </div>

            <Space direction="horizontal">
                <Button onClick={() => setStep(1)} ghost>
                    {t('kit.back')}
                </Button>
                <Button
                    disabled={!hasAllValues}
                    htmlType="submit"
                    type="primary"
                >
                    {t('components.common.button.create')}
                </Button>
            </Space>
        </div>
    );
};

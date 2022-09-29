import { FC } from 'react';
import { Input as InputA, Form, Card } from 'antd';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { Button, getLabelSelectItem, Input, Select } from 'shared';
import { orderFields } from 'entities/order';
import { Role } from '../../models';

import styles from '../../styles.module.scss';
import localStyles from './styles.module.scss';
import { TermsStepProps } from './interface';

const rolesMap: Record<Role, string> = {
    [Role.engineer]: 'engineer',
    [Role.citizen]: 'citizen',
};

export const LevelUpgradeTerms: FC<TermsStepProps> = ({
    form,
    goToPreviousStep,
}) => {
    const { t } = useTranslation();
    const costOfExecution = Form.useWatch(orderFields.costOfExecution, form);
    const penaltyAmount = Form.useWatch(orderFields.penaltyAmount, form);
    const role: Role = Form.useWatch(orderFields.isClient, form);

    const hasAllValues = costOfExecution && penaltyAmount;

    return (
        <div className={styles.rightSection}>
            <InputA.Group compact>
                <Form.Item
                    name={orderFields.deadlineDurationInDays}
                    label={t(
                        'pages.serviceMarket.createOrder.startOfOperation'
                    )}
                    className={cn(styles.formField, localStyles.formField)}
                    tooltip={
                        <Card
                            title={t(
                                'pages.serviceMarket.createOrder.startOfOperation'
                            )}
                            className={styles.tooltipCard}
                        >
                            {t(
                                `pages.serviceMarket.createOrder.levelUpgradeTerms.${rolesMap[role]}.startOfOperation`
                            )}
                        </Card>
                    }
                >
                    <Select
                        placeholder={t('components.common.day')}
                        options={getLabelSelectItem({
                            amount: 3,
                            label: t('components.common.day'),
                        })}
                        disabled
                    />
                </Form.Item>
                <Form.Item
                    name={orderFields.deadlineDurationInHours}
                    className={cn(styles.formField, localStyles.formField)}
                    label=" "
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
            </InputA.Group>
            <div className={localStyles.space}>
                <Form.Item
                    name={orderFields.costOfExecution}
                    label={t('pages.serviceMarket.createOrder.costOfExecution')}
                    className={cn(styles.formField)}
                    tooltip={
                        <Card
                            title={t(
                                'pages.serviceMarket.createOrder.costOfExecution'
                            )}
                            className={styles.tooltipCard}
                        >
                            {t(
                                `pages.serviceMarket.createOrder.levelUpgradeTerms.${rolesMap[role]}.costOfExecution`
                            )}
                        </Card>
                    }
                >
                    <Input
                        placeholder={t('components.common.button.dme')}
                        type="number"
                    />
                </Form.Item>
                <Form.Item
                    name={orderFields.penaltyAmount}
                    label={t('pages.serviceMarket.createOrder.penalty')}
                    className={cn(styles.formField)}
                    tooltip={
                        <Card
                            title={t('pages.serviceMarket.createOrder.penalty')}
                            className={styles.tooltipCard}
                        >
                            {t(
                                `pages.serviceMarket.createOrder.levelUpgradeTerms.penalty`
                            )}
                        </Card>
                    }
                >
                    <Input
                        placeholder={t('components.common.button.dme')}
                        type="number"
                    />
                </Form.Item>
            </div>
            <div className={localStyles.space}>
                <Button onClick={goToPreviousStep} ghost>
                    {t('kit.back')}
                </Button>
                <Button
                    disabled={!hasAllValues}
                    htmlType="submit"
                    type="primary"
                >
                    {t('components.common.button.create')}
                </Button>
            </div>
        </div>
    );
};

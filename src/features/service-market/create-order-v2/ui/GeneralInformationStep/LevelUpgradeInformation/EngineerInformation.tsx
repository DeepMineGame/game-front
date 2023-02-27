import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Form, Input } from 'antd';

import { Button, getLabelSelectItem, Select } from 'shared';
import cn from 'classnames';
import { orderFields } from 'entities/order';
import { EngineerSchema, raritiesTranslationMap } from 'entities/smartcontract';
import { GeneralInformationStepProps } from '../interface';

import styles from '../../../styles.module.scss';
import localStyles from '../styles.module.scss';
import {
    UpgradeTypeFormItem,
    useWatchUpgradeType,
} from '../../UpgradeTypeFormItem';
import { rarityList } from '../constants';
import { Role } from '../../../models';

const rolesMap: Record<Role, string> = {
    [Role.engineer]: 'engineer',
    [Role.citizen]: 'citizen',
};

export const EngineerInformation: FC<GeneralInformationStepProps> = ({
    goToPreviousStep,
    goToNextStep,
    form,
}) => {
    const { t } = useTranslation();
    const { type: upgradeType, hasValue: hasUpgradeType } =
        useWatchUpgradeType(form);
    const hasRarityItem = upgradeType === EngineerSchema.equipment;
    const hasAllValues = hasUpgradeType;
    const role: Role = Form.useWatch(orderFields.isClient, form);

    return (
        <>
            <UpgradeTypeFormItem />
            <div className={localStyles.flexSection}>
                <Form.Item
                    className={styles.formField}
                    label={t('pages.serviceMarket.createOrder.upgradeToLevel')}
                    name={orderFields.optLevel}
                >
                    <Select
                        placeholder={t(
                            'pages.serviceMarket.createOrder.upgradeToLevel'
                        )}
                        options={getLabelSelectItem({ amount: 8, label: '' })}
                    />
                </Form.Item>
                {hasRarityItem && (
                    <Form.Item
                        className={styles.formField}
                        label={t('components.common.rarity')}
                        name={orderFields.optRarity}
                    >
                        <Select
                            placeholder={t('components.common.rarity')}
                            options={rarityList.map((rarity) => ({
                                value: rarity,
                                label: t(raritiesTranslationMap[rarity]),
                            }))}
                        />
                    </Form.Item>
                )}
            </div>
            <Form.Item
                name={orderFields.costOfExecution}
                label={t(
                    'pages.serviceMarket.createOrder.levelUpgradeTerms.upgradeCost'
                )}
                className={cn(styles.formField)}
                tooltip={
                    <Card
                        title={t(
                            'pages.serviceMarket.createOrder.levelUpgradeTerms.upgradeCost'
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
            <div className={localStyles.flexSection}>
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
            </div>
        </>
    );
};

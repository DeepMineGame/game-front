import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';

import { Button, getLabelSelectItem, Select } from 'shared';
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

export const EngineerInformation: FC<GeneralInformationStepProps> = ({
    goToPreviousStep,
    goToNextStep,
    form,
}) => {
    const { t } = useTranslation();
    const { type: upgradeType, hasValue: hasUpgradeType } =
        useWatchUpgradeType(form);
    const hasRarityItem = upgradeType !== EngineerSchema.mine;
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
            <div className={localStyles.flexSection}>
                <Button onClick={goToPreviousStep}>{t('kit.back')}</Button>
                <Button
                    disabled={!hasUpgradeType}
                    onClick={goToNextStep}
                    type="primary"
                >
                    {t('components.common.button.next')}
                </Button>
            </div>
        </>
    );
};

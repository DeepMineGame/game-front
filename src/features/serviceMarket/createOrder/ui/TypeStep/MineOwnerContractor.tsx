import { Form, Tooltip } from 'antd';
import { FC } from 'react';
import { Button, Select } from 'shared';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { ContractRole, mineAssetTemplateId } from 'entities/smartcontract';
import { orderFields } from 'entities/order';
import {
    hasActiveMineOwnerContractorContractAsExecutor,
    hasInstalledEquipmentStore,
    hasMineEmptySlotsStore,
} from '../../models';
import { AssetSelectField } from '../AssetSelectField';
import { PersonalizedOrderCheckbox } from '../PersonalizedOrderCheckbox';

import styles from '../../styles.module.scss';
import { TypeStepProps } from './interface';

const { useWatch } = Form;

export const MineOwnerContractor: FC<TypeStepProps> = ({
    form,
    accountName,
    goToNextStep,
}) => {
    const { t } = useTranslation();
    const contractType = useWatch(orderFields.contractType, form);
    const isClient = useWatch(orderFields.isClient, form);
    const isDisabled = contractType === undefined;
    const hasActiveContract = useStore(
        hasActiveMineOwnerContractorContractAsExecutor
    );
    const hasMineEmptySlots = useStore(hasMineEmptySlotsStore);
    const hasInstalledEquipment = useStore(hasInstalledEquipmentStore);

    const hasActiveContractTooltipText =
        hasActiveContract &&
        t('pages.serviceMarket.createOrder.youHaveSignedContract');
    const hasMineEmptySlotsTooltipText =
        !hasMineEmptySlots &&
        t('pages.serviceMarket.createOrder.yourMineIsFull');

    const hasInstalledEquipmentTooltipText =
        hasInstalledEquipment &&
        t('pages.serviceMarket.createOrder.removeEquipFirst');

    const selectedAssetId = useWatch(orderFields.assetId, form);

    const canGoNext = contractType && selectedAssetId && isClient !== undefined;

    return (
        <>
            <Form.Item
                className={styles.formField}
                label={t('pages.serviceMarket.yourRole')}
                name={orderFields.isClient}
                dependencies={[orderFields.contractType]}
            >
                <Select
                    disabled={isDisabled}
                    placeholder={
                        isDisabled
                            ? t(
                                  'pages.serviceMarket.createOrder.selectToDisable'
                              )
                            : t('pages.serviceMarket.createOrder.selectRole')
                    }
                    options={[
                        {
                            value: ContractRole.client,
                            label: (
                                <Tooltip overlay={hasMineEmptySlotsTooltipText}>
                                    {t('roles.mineowner')}
                                </Tooltip>
                            ),
                            disabled: !hasMineEmptySlots,
                        },
                        {
                            value: ContractRole.executor,
                            label: (
                                <Tooltip
                                    overlay={
                                        hasActiveContract
                                            ? hasActiveContractTooltipText
                                            : hasInstalledEquipmentTooltipText
                                    }
                                >
                                    {t('roles.contractor')}
                                </Tooltip>
                            ),
                            disabled:
                                hasActiveContract || hasInstalledEquipment,
                        },
                    ]}
                />
            </Form.Item>
            <PersonalizedOrderCheckbox isSelfClient={!isClient} form={form} />
            <AssetSelectField
                templatesId={[mineAssetTemplateId]}
                form={form}
                accountName={accountName}
            />
            <Button
                disabled={!canGoNext}
                type="primary"
                onClick={goToNextStep}
                block
            >
                {t('components.common.button.next')}
            </Button>
        </>
    );
};

import { Form, Tooltip } from 'antd';
import { FC } from 'react';
import { Button, Select } from 'shared';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import {
    ContractRole,
    areasAssetTemplateId,
    mineAssetTemplateId,
} from 'entities/smartcontract';
import { orderFields } from 'entities/order';
import {
    hasEngagedAreaStore,
    hasAreaEmptySlotsStore,
    hasActiveLandLordMineOwnerContractAsExecutor,
} from '../../models';
import { AssetSelectField } from '../AssetSelectField';
import { PersonalizedOrderCheckbox } from '../PersonalizedOrderCheckbox';

import styles from '../../styles.module.scss';
import { TypeStepProps } from './interface';

const { useWatch } = Form;

export const LandLordMineOwner: FC<TypeStepProps> = ({
    form,
    accountName,
    goToNextStep,
}) => {
    const { t } = useTranslation();
    const isClient = useWatch(orderFields.isClient, form);
    const selectedAssetId = useWatch(orderFields.assetId, form);
    const hasEngagedArea = useStore(hasEngagedAreaStore);
    const hasAreaEmptySlots = useStore(hasAreaEmptySlotsStore);
    const hasSignedContract = useStore(
        hasActiveLandLordMineOwnerContractAsExecutor
    );
    const hasNoAreaTooltipText =
        (!hasEngagedArea || !hasAreaEmptySlots) &&
        t('pages.serviceMarket.createOrder.youHaveNoAreaOrFreeSlots');
    const hasSignedContractTooltipText =
        hasSignedContract &&
        t('pages.serviceMarket.createOrder.youHaveSignedContract');

    const isLandlordRoleSelected = isClient === ContractRole.client;
    const isMineOwnerRoleSelected = isClient === ContractRole.executor;

    const canGoNext =
        (isLandlordRoleSelected || isMineOwnerRoleSelected) &&
        !!selectedAssetId;

    return (
        <>
            <Form.Item
                className={styles.formField}
                label={t('pages.serviceMarket.yourRole')}
                name={orderFields.isClient}
                dependencies={[orderFields.contractType]}
            >
                <Select
                    placeholder={t(
                        'pages.serviceMarket.createOrder.selectRole'
                    )}
                    options={[
                        {
                            value: ContractRole.client,
                            label: (
                                <Tooltip overlay={hasNoAreaTooltipText}>
                                    {t('roles.landlord')}
                                </Tooltip>
                            ),
                            disabled: !hasEngagedArea || !hasAreaEmptySlots,
                        },
                        {
                            value: ContractRole.executor,
                            label: (
                                <Tooltip overlay={hasSignedContractTooltipText}>
                                    {t('roles.mineowner')}
                                </Tooltip>
                            ),
                            disabled: hasSignedContract,
                        },
                    ]}
                />
            </Form.Item>
            <PersonalizedOrderCheckbox isSelfClient={!isClient} form={form} />
            <AssetSelectField
                templatesId={
                    isLandlordRoleSelected
                        ? areasAssetTemplateId
                        : [mineAssetTemplateId]
                }
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

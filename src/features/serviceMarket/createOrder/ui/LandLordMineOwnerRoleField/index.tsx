import { Form, FormInstance } from 'antd';
import React, { FC } from 'react';
import { Select, Tooltip } from 'shared';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { createContrFormFields, ContractRole } from 'entities/smartcontract';
import styles from '../../styles.module.scss';
import {
    hasEngagedAreaStore,
    hasAreaEmptySlotsStore,
    hasActiveLandLordMineOwnerContractAsExecutor,
} from '../../models';
import { PersonalizedOrderCheckbox } from '../PersonalizedOrderCheckbox';

const { useWatch } = Form;

export const LandLordMineOwnerRoleField: FC<{ form: FormInstance }> = ({
    form,
}) => {
    const { t } = useTranslation();
    const contractType = useWatch(createContrFormFields.contractType, form);
    const isClient = useWatch(createContrFormFields.isClient, form);
    const isDisabled = contractType === undefined;
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

    return (
        <>
            <Form.Item
                className={styles.formField}
                label={t('pages.serviceMarket.yourRole')}
                name={createContrFormFields.isClient}
                dependencies={[createContrFormFields.contractType]}
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
                                    {t('roles.mineOwner')}
                                </Tooltip>
                            ),
                            disabled: hasSignedContract,
                        },
                    ]}
                />
            </Form.Item>
            <PersonalizedOrderCheckbox isSelfClient={!isClient} form={form} />
        </>
    );
};

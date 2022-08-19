import { Form, FormInstance, Tooltip } from 'antd';
import { Select } from 'shared';
import { useTranslation } from 'react-i18next';
import { useGate, useStore } from 'effector-react';
import { FC } from 'react';
import { ContractType, createContrFormFields } from 'entities/smartcontract';
import styles from '../../styles.module.scss';
import { HasAreaOrMineGate, hasAreaOrMineStore } from '../../models';

export const ContractTypeField: FC<{
    form: FormInstance;
    accountName: string;
}> = ({ form, accountName }) => {
    const { t } = useTranslation();
    useGate(HasAreaOrMineGate, { searchParam: accountName });
    const hasAreaOrMine = useStore(hasAreaOrMineStore);
    const infoForMineSetupContractTypeDisable = !hasAreaOrMine
        ? t('pages.serviceMarket.createOrder.setMineOrArea')
        : '';

    return (
        <Form.Item
            className={styles.formField}
            label={t('pages.serviceMarket.createOrder.contractType')}
            name={createContrFormFields.contractType}
        >
            <Select
                placeholder={t(
                    'pages.serviceMarket.createOrder.selectContractType'
                )}
                onSelect={(value: ContractType) =>
                    // reset form and set only current field
                    form.setFieldsValue({
                        [createContrFormFields.contractType]: value,
                    })
                }
                options={[
                    {
                        value: ContractType.landlord_mineowner,
                        label: (
                            <Tooltip
                                overlay={infoForMineSetupContractTypeDisable}
                            >
                                {t('features.actions.mineSetup')}
                            </Tooltip>
                        ),
                        disabled: !hasAreaOrMine,
                    },
                    {
                        value: ContractType.mineowner_contractor,
                        label: t('pages.serviceMarket.miningContract'),
                    },
                ]}
            />
        </Form.Item>
    );
};

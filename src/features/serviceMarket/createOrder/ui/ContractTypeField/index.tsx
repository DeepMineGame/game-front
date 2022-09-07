import { Form, FormInstance } from 'antd';
import { Select, Tooltip } from 'shared';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { FC } from 'react';
import { ContractType, createContrFormFields } from 'entities/smartcontract';
import styles from '../../styles.module.scss';
import { hasAreaOrMineStore } from '../../models';

export const ContractTypeField: FC<{
    form: FormInstance;
}> = ({ form }) => {
    const { t } = useTranslation();
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

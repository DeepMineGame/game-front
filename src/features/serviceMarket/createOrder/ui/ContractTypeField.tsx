import { Form, FormInstance, Tooltip } from 'antd';
import { Select } from 'shared';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { FC } from 'react';
import { ContractType } from 'entities/smartcontract';
import { orderFields } from 'entities/order';
import { hasAreaOrMineStore } from '../models';

import styles from '../styles.module.scss';

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
            name={orderFields.contractType}
        >
            <Select
                placeholder={t(
                    'pages.serviceMarket.createOrder.selectContractType'
                )}
                onSelect={(value: ContractType) => {
                    form.resetFields();
                    form.setFieldsValue({
                        [orderFields.contractType]: value,
                    });
                }}
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
                    {
                        value: ContractType.level_upgrade,
                        label: t(
                            'pages.serviceMarket.createOrder.levelUpgrade'
                        ),
                    },
                ]}
            />
        </Form.Item>
    );
};

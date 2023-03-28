import { Form, FormInstance, Tooltip } from 'antd';
import { Select } from 'shared';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { orderFields } from 'entities/order';
import { EngineerSchema, equipmentSet } from 'entities/smartcontract';

import styles from '../styles.module.scss';

export const UpgradeTypeFormItem: FC = () => {
    const { t } = useTranslation();

    return (
        <Form.Item
            className={styles.formField}
            label={t('pages.serviceMarket.createOrder.upgradeType')}
            name={orderFields.optSchema}
        >
            <Select
                placeholder={t('pages.serviceMarket.createOrder.selectType')}
                options={[
                    {
                        value: EngineerSchema.equipment,
                        label: t(
                            `pages.serviceMarket.createOrder.upgradeTypeList.${EngineerSchema.equipment}`
                        ),
                    },
                    {
                        value: EngineerSchema.module,
                        label: (
                            <Tooltip
                                overlay={t('components.common.comingSoon')}
                                placement="right"
                            >
                                {t(
                                    `pages.serviceMarket.createOrder.upgradeTypeList.${EngineerSchema.module}`
                                )}
                            </Tooltip>
                        ),
                        disabled: true,
                    },
                    {
                        value: EngineerSchema.mine,
                        label: t(
                            `pages.serviceMarket.createOrder.upgradeTypeList.${EngineerSchema.mine}`
                        ),
                    },
                    {
                        value: equipmentSet,
                        label: t('Equipment set'),
                    },
                ]}
            />
        </Form.Item>
    );
};

export const useWatchUpgradeType = (form: FormInstance) => {
    const type = Form.useWatch(orderFields.optSchema, form);

    return {
        type: type as EngineerSchema,
        hasValue: type !== undefined,
    };
};

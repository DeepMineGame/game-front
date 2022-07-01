import React, { FC } from 'react';
import { Form, Input as InputA, Space } from 'antd';
import { Button, Input, Select, getDaysSelectItem } from 'shared';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { createContrFormFields } from 'entities/smartcontract';
import styles from '../../styles.module.scss';
import localStyles from './styles.module.scss';

export const SecondStep: FC<{
    setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setStep }) => {
    const { t } = useTranslation();

    return (
        <Form.Item>
            <InputA.Group compact>
                <Form.Item
                    name={createContrFormFields.fee}
                    label={t('pages.serviceMarket.createOrder.fee')}
                    className={cn(styles.formField, localStyles.feeInput)}
                >
                    <Input placeholder="%" />
                </Form.Item>
                <Form.Item
                    name={createContrFormFields.finishesAt}
                    label={t('components.common.duration')}
                    className={cn(localStyles.finisAtSelect, styles.formField)}
                >
                    <Select
                        placeholder={t('components.common.days')}
                        options={getDaysSelectItem({ amountOfDays: 21 })}
                    />
                </Form.Item>
            </InputA.Group>
            <Form.Item
                name={createContrFormFields.deadlineTime}
                label={t('pages.serviceMarket.createOrder.startOfOperation')}
                className={cn(localStyles.deadLineField, styles.formField)}
            >
                <Select
                    placeholder={t('components.common.days')}
                    options={getDaysSelectItem({ amountOfDays: 3 })}
                />
            </Form.Item>
            <Space direction="horizontal">
                <Button onClick={() => setStep(0)} ghost>
                    {t('kit.back')}
                </Button>
                <Button onClick={() => setStep(2)} type="primary">
                    {t('components.common.button.next')}
                </Button>
            </Space>
        </Form.Item>
    );
};

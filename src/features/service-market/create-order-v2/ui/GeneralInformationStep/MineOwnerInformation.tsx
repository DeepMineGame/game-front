import React, { FC } from 'react';
import { Form, Input as InputA, Space } from 'antd';
import { Button, Checkbox, getLabelSelectItem, Select } from 'shared';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { orderFields } from 'entities/order';

import styles from '../../styles.module.scss';
import localStyles from './styles.module.scss';
import { GeneralInformationStepProps } from './interface';

const { useWatch } = Form;

export const MineOwnerInformation: FC<GeneralInformationStepProps> = ({
    goToNextStep,
    goToPreviousStep,
    form,
}) => {
    const { t } = useTranslation();
    const finishesAtFieldValue = useWatch(orderFields.contractDuration, form);

    return (
        <Form.Item>
            <InputA.Group compact>
                <div className={localStyles.flexSection}>
                    <Form.Item
                        name={orderFields.contractDuration}
                        label={t('components.common.duration')}
                        className={cn(
                            localStyles.finisAtSelect,
                            styles.formField
                        )}
                    >
                        <Select
                            placeholder={t('components.common.days')}
                            options={getLabelSelectItem({
                                amount: 21,
                                label: t('components.common.day'),
                                // temporary solution because contract for 1 day isn't possible yet
                            }).filter((_, idx) => idx !== 0)}
                        />
                    </Form.Item>
                    <Form.Item
                        name={orderFields.autorenew_enabled}
                        valuePropName="checked"
                    >
                        <Checkbox>{t('Auto-renewal')}</Checkbox>
                    </Form.Item>
                </div>
            </InputA.Group>
            <Space direction="horizontal">
                <Button onClick={goToPreviousStep} ghost>
                    {t('kit.back')}
                </Button>
                <Button
                    disabled={!finishesAtFieldValue}
                    onClick={goToNextStep}
                    type="primary"
                >
                    {t('components.common.button.next')}
                </Button>
            </Space>
        </Form.Item>
    );
};

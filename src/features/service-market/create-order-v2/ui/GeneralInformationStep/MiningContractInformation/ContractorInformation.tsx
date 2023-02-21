import { FC } from 'react';
import { Form, Space, Typography } from 'antd';
import { Button, Select, getLabelSelectItem, Checkbox } from 'shared';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { orderFields } from 'entities/order';

import styles from '../../../styles.module.scss';
import localStyles from '../styles.module.scss';
import { GeneralInformationStepProps } from '../interface';
import { RaritySelector } from '../RaritySelector';
import { LevelSelector } from '../LevelSelector';

export const ContractorInformation: FC<GeneralInformationStepProps> = ({
    goToNextStep,
    goToPreviousStep,
}) => {
    const { t } = useTranslation();

    return (
        <Form.Item>
            <Typography.Paragraph>
                {t(
                    'Specify the preferred level and rarity of the mine you want to work on'
                )}
            </Typography.Paragraph>
            <div className={localStyles.flexSection}>
                <RaritySelector />
                <LevelSelector />
            </div>
            <div className={localStyles.flexSection}>
                <Form.Item
                    name={orderFields.contractDuration}
                    label={t('components.common.duration')}
                    className={cn(localStyles.finisAtSelect, styles.formField)}
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
                <Form.Item>
                    <Checkbox>{t('Auto-renewal')}</Checkbox>
                </Form.Item>
            </div>
            <Space direction="horizontal">
                <Button onClick={goToPreviousStep} ghost>
                    {t('kit.back')}
                </Button>
                <Button onClick={goToNextStep} type="primary">
                    {t('components.common.button.next')}
                </Button>
            </Space>
        </Form.Item>
    );
};

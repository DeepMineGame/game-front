import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Space } from 'antd';
import { LoadingSpin } from 'shared/ui/ui-kit';
import { State } from '../state';

const WaitCitizen: FC = () => {
    const { t } = useTranslation();

    return (
        <State
            title={t('pages.engineer.orderCreated')}
            content={
                <Space direction="vertical" size={10}>
                    {t('pages.engineer.waitCitizenAcceptContract')}
                    <LoadingSpin size="xl" />
                </Space>
            }
        />
    );
};

export { WaitCitizen };

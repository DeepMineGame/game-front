import { FC } from 'react';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSmartContractAction } from 'features/hooks';
import { openSkill } from 'entities/smartcontract';
import { useAccountName, useReloadPage } from 'shared/lib/hooks';
import { Button } from 'shared/ui';
import { State } from '../state';

const GetTraining: FC = () => {
    const { t } = useTranslation();
    const reloadPage = useReloadPage();
    const accountName = useAccountName();

    const handleOpenSkill = useSmartContractAction({
        action: openSkill(accountName, '522137'),
    });

    const onOpenSkill = async () => {
        await handleOpenSkill();
        reloadPage();
    };

    return (
        <State
            title={t('pages.engineer.getTraining')}
            content={t('pages.engineer.nowYouNeedTraining')}
            bottom={
                <Space direction="vertical">
                    <Button type="primary" ghost onClick={onOpenSkill}>
                        !! Получить бесплатный скилл !!
                    </Button>
                </Space>
            }
        />
    );
};

export { GetTraining };

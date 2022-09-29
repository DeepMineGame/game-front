import { FC } from 'react';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { useSmartContractAction } from 'features/hooks';
import { clearEngineer, openSkill } from 'entities/smartcontract';
import { engineerCabinStore } from 'entities/engineer';
import { useAccountName, useReloadPage } from 'shared/lib/hooks';
import { Button } from 'shared/ui';
import { State } from '../state';

const GetTraining: FC = () => {
    const { t } = useTranslation();
    const reloadPage = useReloadPage();
    const accountName = useAccountName();
    const { certificate } = useStore(engineerCabinStore);

    const handleDelete = useSmartContractAction({
        action: clearEngineer(accountName, certificate?.asset_id!),
    });

    const handleOpenSkill = useSmartContractAction({
        action: openSkill(accountName, '505658'),
    });

    const onDelete = async () => {
        await handleDelete();
        reloadPage();
    };

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
                    <h3 style={{ color: 'red' }}>!! FOR TEST ONLY !!</h3>
                    <Button type="primary" ghost onClick={onOpenSkill}>
                        !! Получить бесплатный скилл !!
                    </Button>
                    <Button type="primary" ghost onClick={onDelete}>
                        !! Сбросить свою роль инженера !!
                    </Button>
                </Space>
            }
        />
    );
};

export { GetTraining };

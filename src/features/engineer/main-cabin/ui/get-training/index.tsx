import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSmartContractAction } from 'features/hooks';
import {
    ENGINEER_EQUIPMENT_SCHEMA_ID,
    openSkill,
} from 'entities/smartcontract';
import { useAccountName, useReloadPage } from 'shared/lib/hooks';
import { Button } from 'shared/ui';
import { State } from '../state';

const GetTraining: FC = () => {
    const { t } = useTranslation();
    const reloadPage = useReloadPage();
    const accountName = useAccountName();

    const handleOpenSkill = useSmartContractAction({
        action: openSkill(accountName, ENGINEER_EQUIPMENT_SCHEMA_ID),
        onSignSuccess: reloadPage,
    });

    const onOpenSkill = async () => {
        await handleOpenSkill();
    };

    return (
        <div>
            <State
                title={t('pages.engineer.getTraining')}
                content={t('pages.engineer.nowYouNeedTraining')}
            />{' '}
            <Button type="primary" ghost onClick={onOpenSkill}>
                GET FREE EQUIPMENT SKILL [{ENGINEER_EQUIPMENT_SCHEMA_ID}]
            </Button>
        </div>
    );
};

export { GetTraining };

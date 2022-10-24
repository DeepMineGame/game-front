import { FC } from 'react';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { engineerEquipmentHall } from 'app/router/paths';
import { getEquipmentByIdEffect } from 'features/engineer';
import { Button, Loader } from 'shared/ui';
import { UpgradeInfo } from '../upgrade-info';
import { State } from '../state';

const UpgradeCompleted: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const equipmentLoading = useStore(getEquipmentByIdEffect.pending);

    return (
        <State
            title={t('pages.engineer.upgradeCompleted')}
            content={equipmentLoading ? <Loader /> : <UpgradeInfo />}
            bottom={
                <Button
                    type="primary"
                    ghost
                    onClick={() => navigate(engineerEquipmentHall)}
                >
                    {t('pages.engineer.getReport')}
                </Button>
            }
        />
    );
};

export { UpgradeCompleted };

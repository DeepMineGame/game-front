import { FC } from 'react';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { useSmartContractAction } from 'features/hooks';
import { createEngineer } from 'entities/smartcontract';
import { engineerCabinStore } from 'entities/engineer';
import {
    tablet,
    useAccountName,
    useMediaQuery,
    useReloadPage,
} from 'shared/lib/hooks';
import { Button } from 'shared/ui';
import { State } from '../state';

const AttendInauguration: FC = () => {
    const reloadPage = useReloadPage();
    const { t } = useTranslation();
    const isTablet = useMediaQuery(tablet);
    const accountName = useAccountName();
    const { certificate } = useStore(engineerCabinStore);

    const handleInaugurate = useSmartContractAction({
        action: createEngineer(accountName, certificate?.asset_id!),
    });

    const onInaugurate = async () => {
        await handleInaugurate();
        reloadPage();
    };

    return (
        <State
            title={t('pages.engineer.engineersInauguration')}
            content={t('pages.engineer.youNeedToAttendInauguration')}
            bottom={
                <Button
                    type="primary"
                    ghost
                    size={isTablet ? 'middle' : 'small'}
                    onClick={onInaugurate}
                >
                    {t('pages.engineer.attendInauguration')}
                </Button>
            }
        />
    );
};

export { AttendInauguration };

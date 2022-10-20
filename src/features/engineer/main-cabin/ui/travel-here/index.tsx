import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { CallToTravelNotification } from 'features';
import { LOCATION_TO_ID } from 'entities/smartcontract';
import { useReloadPage } from 'shared/lib/hooks';
import { Button } from 'shared/ui/ui-kit';
import { State } from '../state';

const TravelHere: FC = () => {
    const { t } = useTranslation();
    const reloadPage = useReloadPage();

    return (
        <State
            title={t('travel.travelHere')}
            content={t('pages.engineer.youShouldTravelToContinue')}
            bottom={
                <CallToTravelNotification
                    onSuccess={reloadPage}
                    toLocationId={LOCATION_TO_ID.engineers_workshop}
                    trigger={
                        <Button type="primary" ghost>
                            {t('components.common.travel')}
                        </Button>
                    }
                />
            }
        />
    );
};

export { TravelHere };

import { FC } from 'react';
import { CallToTravelNotification } from 'features';
import { LOCATION_TO_ID } from 'entities/smartcontract';
import { useReloadPage } from 'shared/lib/hooks';

const TravelToWorkshop: FC = () => {
    const reloadPage = useReloadPage();

    return (
        <CallToTravelNotification
            toLocationId={LOCATION_TO_ID.engineers_workshop}
            onSuccess={reloadPage}
        />
    );
};

export { TravelToWorkshop };

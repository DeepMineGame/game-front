import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useSmartContractAction } from 'features/hooks';
import { LOCATION_TO_ID, physicalShift } from 'entities/smartcontract';
import { useAccountName } from 'shared/lib/hooks';
import { confirm } from 'shared/ui/ui-kit';
import { neutral9 } from 'shared/ui/variables';

const useTravelConfirm = (locationId: LOCATION_TO_ID) => {
    const { t } = useTranslation();
    const accountName = useAccountName();

    const travelAction = useSmartContractAction({
        action: physicalShift(accountName, locationId),
    });

    const handleTravel = async (onSuccess?: () => void) => {
        await travelAction();
        onSuccess?.();
    };

    const travelConfirm = (onSuccess?: () => void) => {
        confirm({
            title: t('travel.confirm.title'),
            content: t('travel.confirm.content'),
            icon: <ExclamationCircleOutlined style={{ color: neutral9 }} />,
            okText: t('travel.travelHere'),
            onOk: () => {
                handleTravel(onSuccess);
            },
        });
    };

    return { travelConfirm };
};

export { useTravelConfirm };

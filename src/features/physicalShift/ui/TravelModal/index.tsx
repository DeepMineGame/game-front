import { useTranslation } from 'react-i18next';
import { ActionModal } from 'shared';
import { LOCATION_TO_ID } from 'entities/smartcontract';

interface SignContractProps {
    locationId: LOCATION_TO_ID;
    onClose: () => void;
    onClick: () => void;
    visible: boolean;
}

const titlesMap: Record<number, string> = {
    [LOCATION_TO_ID.mine]: 'contractor',
    [LOCATION_TO_ID.hive]: 'hive',
    [LOCATION_TO_ID.landlords_reception]: 'landlord',
    [LOCATION_TO_ID.mine_deck]: 'mineOwner',
};

export const TravelModal = ({
    onClick,
    onClose,
    visible,
    locationId,
}: SignContractProps) => {
    const { t } = useTranslation();
    const titleLocalesKey = titlesMap[locationId];

    return (
        <ActionModal
            visible={visible}
            onCancel={onClose}
            onSubmit={onClick}
            texts={{
                title: t(
                    titleLocalesKey
                        ? `pages.contractor.travel.to.${titleLocalesKey}`
                        : 'pages.contractor.travel.title'
                ),
                onOk: t('pages.contractor.travel.travel'),
            }}
            costs={{
                timeSeconds: 1,
                energy: 0,
            }}
        />
    );
};

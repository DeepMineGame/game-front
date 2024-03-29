import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import {
    ActionModal,
    Button,
    desktopS,
    useAccountName,
    useMediaQuery,
    useReloadPage,
    useTravelConfirm,
    useUserLocation,
} from 'shared';
import { useStore } from 'effector-react';
import { useSmartContractAction } from 'features';
import {
    engageArea,
    $inventory,
    InventoryType,
    LOCATION_TO_ID,
} from 'entities/smartcontract';
import commonStyles from '../../styles/styles.module.scss';
import styles from './styles.module.scss';

interface Props {
    className?: string;
    disabled: boolean;
}

export const EngageArea: FC<Props> = ({ className, disabled = true }) => {
    const accountName = useAccountName();
    const { t } = useTranslation();
    const isDesktop = useMediaQuery(desktopS);
    const inventories = useStore($inventory);
    const areaItem = inventories?.find(
        ({ inv_type }) => inv_type === InventoryType.areas
    );
    const areaId = areaItem ? +areaItem.asset_id : undefined;
    const engageAreaAction = useSmartContractAction({
        action: engageArea({ waxUser: accountName, areaId }),
    });
    const reloadPage = useReloadPage();
    const { travelConfirm } = useTravelConfirm(
        LOCATION_TO_ID.landlords_reception
    );
    const inLocation = useUserLocation();
    const [isModalActionVisible, setIsModalActionVisible] = useState(false);

    const onEngageClick = async () => {
        if (!inLocation.landlordReception) {
            return travelConfirm(reloadPage);
        }
        await engageAreaAction();

        return reloadPage();
    };

    return (
        <div className={cn(styles.engageArea, className)}>
            <div className={cn(commonStyles.title, styles.title)}>
                {t('pages.landLord.cabin.engageTitle')}
            </div>
            {isDesktop && !inLocation.landlordReception && (
                <div
                    className={cn(commonStyles.description, styles.description)}
                >
                    {t('pages.landLord.cabin.engageDescription')}
                </div>
            )}
            <Button
                type="primary"
                disabled={disabled}
                onClick={() => setIsModalActionVisible(true)}
            >
                {t('pages.landLord.cabin.engageButton')}
            </Button>
            <ActionModal
                texts={{
                    onOk: t('pages.landLord.cabin.engageButton'),
                    title: t('pages.landLord.cabin.engageTitle'),
                }}
                costs={{ timeSeconds: 20, energy: 1 }}
                visible={isModalActionVisible}
                onCancel={() => setIsModalActionVisible(false)}
                onSubmit={onEngageClick}
            />
        </div>
    );
};

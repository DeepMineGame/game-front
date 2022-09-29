import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import {
    Button,
    desktopS,
    useAccountName,
    useMediaQuery,
    useReloadPage,
} from 'shared';
import { useStore } from 'effector-react';
import { useSmartContractAction } from 'features';
import {
    engageArea,
    inventoriesStore,
    InventoryType,
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
    const inventories = useStore(inventoriesStore);
    const areaItem = inventories?.find(
        ({ inv_type }) => inv_type === InventoryType.areas
    );
    const areaId = areaItem ? +areaItem.asset_id : undefined;
    const engageAreaAction = useSmartContractAction({
        action: engageArea({ waxUser: accountName, areaId }),
    });
    const reloadPage = useReloadPage();

    const onEngageClick = async () => {
        await engageAreaAction();
        return reloadPage();
    };

    return (
        <div className={cn(styles.engageArea, className)}>
            <div className={cn(commonStyles.title, styles.title)}>
                {t('pages.landLord.cabin.engageTitle')}
            </div>
            {isDesktop && (
                <div
                    className={cn(commonStyles.description, styles.description)}
                >
                    {t('pages.landLord.cabin.engageDescription')}
                </div>
            )}
            <Button type="primary" disabled={disabled} onClick={onEngageClick}>
                {t('pages.landLord.cabin.engageButton')}
            </Button>
        </div>
    );
};

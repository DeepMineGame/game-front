import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { serviceMarket } from 'app/router/paths';
import {
    commonAssetsSetImg,
    epicAssetSetImg,
    legendaryAssetSetImg,
    rareAssetSetImg,
    unCommonAssetSetImg,
} from 'shared';
import { rarityMap, RarityType } from 'entities/smartcontract';
import { AssetDataType } from 'entities/atomicassets';
import { CabinStatus } from 'entities/engineer';
import { Roles } from 'entities/game-stat';
import { getImagePath } from 'shared/lib/utils';
import { Loader, LoadingSpin, Text } from 'shared/ui/ui-kit';
import { UpgradeSlot } from '../upgrade-slot';
import { UpgradeKit } from '../upgrade-kit';
import { EQUIPMENT_SET_LENGTH } from '../../constants';

type Props = {
    equipment: AssetDataType[] | null;
    isLoading: boolean;
    isWaitCitizen: boolean;
    status: CabinStatus;
};

const tooltipText = {
    [CabinStatus.NeedContract]:
        'Sign or create Level Upgrade Contract to start operation',
    [CabinStatus.NeedCitizen]: 'pages.engineer.waitForCitizenWhoSignOrder',
};

const disabledStatuses = [
    CabinStatus.NeedCitizen,
    CabinStatus.NeedContract,
    CabinStatus.UpgradeInProgress,
    CabinStatus.UpgradeCompleted,
    CabinStatus.CanSeeStats,
];
const EquipmentContent: FC<{
    equipment: AssetDataType[] | null;
    isLoading: boolean;
    isWaitCitizen: boolean;
}> = ({ equipment, isWaitCitizen, isLoading }) => {
    const isEquipmentSet = equipment?.length === EQUIPMENT_SET_LENGTH;
    if (isWaitCitizen) {
        return <LoadingSpin size="md" />;
    }

    if (isLoading) {
        return <Loader centered />;
    }

    if (isEquipmentSet) {
        const rarity = equipment[0]?.data.rarity;
        const imageRarityMap = {
            [rarityMap[RarityType.undefined]]: commonAssetsSetImg,
            [rarityMap[RarityType.common]]: commonAssetsSetImg,
            [rarityMap[RarityType.uncommon]]: unCommonAssetSetImg,
            [rarityMap[RarityType.rare]]: rareAssetSetImg,
            [rarityMap[RarityType.epic]]: epicAssetSetImg,
            [rarityMap[RarityType.legendary]]: legendaryAssetSetImg,
        };
        return (
            <img
                height="100%"
                width="100%"
                src={imageRarityMap[rarity]}
                alt={`equipment card ${rarity}`}
                style={{ transform: 'scale(1.1)' }}
            />
        );
    }
    if (equipment?.[0]?.template) {
        return (
            <img
                height="100%"
                width="100%"
                src={getImagePath(+equipment[0].template.template_id)}
                alt="equipment card"
                style={{ transform: 'scale(1.1)' }}
            />
        );
    }

    return <PlusOutlined />;
};

const EquipmentSetup: FC<Props> = ({
    equipment,
    isLoading,
    isWaitCitizen,
    status,
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const upgradeKitDisabled = disabledStatuses.includes(status);

    return (
        <div>
            <Space size={26}>
                <Space direction="vertical" align="start" size={16}>
                    <Text>{t('pages.engineer.equipment')}</Text>
                    <UpgradeSlot
                        disabled
                        onClick={
                            status === CabinStatus.NeedContract
                                ? () =>
                                      navigate(
                                          `${serviceMarket}?user_role=${Roles.engineer}&search_role=${Roles.contractor}`
                                      )
                                : undefined
                        }
                        open={
                            status === CabinStatus.NeedContract
                                ? true
                                : undefined
                        }
                        placement="top"
                        tooltipText={t(
                            tooltipText[status as keyof typeof tooltipText]
                        )}
                    >
                        <EquipmentContent
                            equipment={equipment}
                            isLoading={isLoading}
                            isWaitCitizen={isWaitCitizen}
                        />
                    </UpgradeSlot>
                </Space>

                <UpgradeKit
                    disabled={upgradeKitDisabled || !equipment || isWaitCitizen}
                    equipment={equipment}
                    isWaitCitizen={isWaitCitizen}
                />

                <Space direction="vertical" size={16}>
                    <Text>{t('pages.engineer.boosters')}</Text>
                    <UpgradeSlot
                        notAllowed
                        tooltipText={t('components.common.comingSoon')}
                    />
                </Space>
            </Space>
        </div>
    );
};

export { EquipmentSetup };

import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { Modal, ModalProps } from 'antd';
import { useTableData } from 'shared';
import { AssetDataType } from 'entities/atomicassets';
import {
    getEkiatableConfig,
    getEkutableConfig,
    getMkatableConfig,
} from 'entities/smartcontract';
import { getKitImage } from 'shared/lib/utils';
import { Text } from 'shared/ui/ui-kit';
import { UpgradeKitType } from '../../model/upgrade-kit';
import { EQUIPMENT_SET_LENGTH } from '../../constants';
import styles from './styles.module.scss';

type Props = ModalProps & {
    equipment: AssetDataType[] | null;
    onSelect: (value: UpgradeKitType) => void;
    value: string;
};

type KitProps = {
    title: string;
    name: UpgradeKitType;
    selected: string;
    onClick: (name: UpgradeKitType) => void;
    bottom: ReactNode;
};

const KitCard: FC<KitProps> = ({ title, name, selected, bottom, onClick }) => {
    return (
        <div
            className={cn(styles.card, {
                [styles.selected]: selected === name,
            })}
            onClick={() => {
                onClick(name);
            }}
        >
            <img
                className={styles.image}
                src={getKitImage(name)}
                alt={`upgrade kit ${name}`}
            />
            <Text>{title}</Text>
            {bottom}
        </div>
    );
};
enum EquipmentRarityMapToNumber {
    Common,
    Uncommon,
    Rare,
    Epic,
    Legendary,
}
const UpgradeKitModal: FC<Props> = ({
    onSelect,
    value,
    equipment,
    ...props
}) => {
    const { t } = useTranslation();
    const { data: commonUpgradeTableData } = useTableData<{
        equip_level: number;
        rarities: string[];
    }>(getEkutableConfig);
    const { data: uncommonUpgradeTableData } = useTableData<{
        equip_level: number;
        rarities: string[];
    }>(getEkiatableConfig);
    const { data: mineUpgradeCostTableData } = useTableData<{
        improved_kit: string;
        mine_level: number;
        usual_kit: string;
    }>(getMkatableConfig);

    // const { price: commonPrice } = useUpgradeModifiers(
    //     UpgradeKitType.common,
    //     equipment
    // );

    const isMine = equipment?.[0].name === 'Mine';
    const minePrice = mineUpgradeCostTableData.find(
        ({ mine_level }) =>
            equipment?.[0].data.level &&
            Number(equipment[0].data.level) + 1 === mine_level
    );

    const commonPrice =
        Number(
            commonUpgradeTableData.find(
                ({ equip_level }) =>
                    equipment?.[0].data.level &&
                    Number(equipment[0].data.level) + 1 === equip_level
            )?.rarities[EquipmentRarityMapToNumber[equipment![0].data.rarity]]
        ) /
        10 ** 8;

    const uncommonPrice =
        Number(
            uncommonUpgradeTableData.find(
                ({ equip_level }) =>
                    equipment?.[0].data.level &&
                    Number(equipment[0].data.level) + 1 === equip_level
            )?.rarities[EquipmentRarityMapToNumber[equipment![0].data.rarity]]
        ) /
        10 ** 8;

    // const { price: uncommonPrice, timeModifier } = useUpgradeModifiers(
    //     UpgradeKitType.uncommon,
    //     equipment
    // );
    const isEquipmentSet = equipment?.length === EQUIPMENT_SET_LENGTH;
    const commonEquipmentPrice = isEquipmentSet ? commonPrice * 5 : commonPrice;
    const uncommonEquipmentPrice = isEquipmentSet
        ? uncommonPrice * 5
        : uncommonPrice;
    return (
        <Modal
            {...props}
            title={t('Select upgrade kit')}
            className={styles.modal}
        >
            <div className={styles.container}>
                <KitCard
                    selected={value}
                    name={UpgradeKitType.common}
                    title={
                        isEquipmentSet
                            ? `${t('Common kit')} x 5`
                            : t('Common kit')
                    }
                    onClick={onSelect}
                    bottom={
                        <>
                            <Text strong>
                                {isMine
                                    ? Number(minePrice?.usual_kit) / 10 ** 8
                                    : commonEquipmentPrice}{' '}
                                {t('components.common.button.dme')}
                            </Text>
                            {/* <Text>{t('pages.engineer.noTimeReduction')}</Text> */}
                        </>
                    }
                />

                <KitCard
                    selected={value}
                    name={UpgradeKitType.uncommon}
                    title={
                        isEquipmentSet
                            ? `${t('Uncommon kit')} x 5`
                            : t('Uncommon kit')
                    }
                    onClick={onSelect}
                    bottom={
                        <>
                            <Text strong>
                                {isMine
                                    ? Number(minePrice?.improved_kit) / 10 ** 8
                                    : uncommonEquipmentPrice}{' '}
                                {t('components.common.button.dme')}
                            </Text>
                            {/* <Text> */}
                            {/*    {t('pages.engineer.timeReduction', { */}
                            {/*        percent: 100 - timeModifier, */}
                            {/*    })} */}
                            {/* </Text> */}
                        </>
                    }
                />
            </div>
        </Modal>
    );
};

export { UpgradeKitModal };

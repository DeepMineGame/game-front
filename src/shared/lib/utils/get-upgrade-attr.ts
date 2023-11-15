import { MergedInventoryWithAtomicAssets } from 'entities/atomicassets';
import {
    ContractDto,
    EngineerSchema,
    EngineerSkillKey,
    rarityMap,
} from 'entities/smartcontract';
import { AssetStruct } from 'entities/game-stat';

type UpgradeRarity = keyof typeof rarityMap;

export const parseAttrs = (contract: ContractDto) => {
    try {
        if (Array.isArray(contract.attrs))
            return contract.attrs.reduce(
                (prev, it) => ({ ...prev, [it.key]: Number(it.value) }),
                {
                    [EngineerSkillKey.schema_type]: 0,
                    [EngineerSkillKey.rarity]: 0,
                    [EngineerSkillKey.level]: 0,
                }
            );

        throw new Error(
            'Cannot parse attrs field from contract caused attrs are not array.'
        );
    } catch (e) {
        // TODO: add sentry logging instead console.error
        // eslint-disable-next-line no-console
        console.error(e);
        return undefined;
    }
};

type UpgradeType =
    | 'undefined'
    | 'mine'
    | 'mineModule'
    | 'factory'
    | 'equipment';

export const upgradeTypeMap: Record<EngineerSchema, UpgradeType> = {
    [EngineerSchema.undefined]: 'undefined',
    [EngineerSchema.mine]: 'mine',
    [EngineerSchema.module]: 'mineModule',
    [EngineerSchema.factory]: 'factory',
    [EngineerSchema.equipment]: 'equipment',
};

export const getUpgradeType = ({
    contract,
    asset,
}: {
    contract?: ContractDto;
    asset?: MergedInventoryWithAtomicAssets[number] | AssetStruct;
}) => {
    if (contract)
        return upgradeTypeMap[
            parseAttrs(contract)?.schema_type as EngineerSchema
        ];

    return upgradeTypeMap[
        (asset as MergedInventoryWithAtomicAssets[number])
            ?.schema_type as EngineerSchema
    ];
};

export const getUpgradeRarity = ({
    contract,
    asset,
}: {
    contract?: ContractDto;
    asset?: MergedInventoryWithAtomicAssets[number] | AssetStruct;
}) => {
    if (contract)
        return rarityMap[parseAttrs(contract)?.rarity as UpgradeRarity];

    return rarityMap[asset?.rarity as UpgradeRarity];
};

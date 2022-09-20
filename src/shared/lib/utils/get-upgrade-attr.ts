import {
    ContractDto,
    EngineerSchema,
    EngineerSkillKey,
    rarityMap,
    UserInventoryType,
} from 'entities/smartcontract';

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

export const upgradeTypeMap = {
    [EngineerSchema.mine]: 'mine',
    [EngineerSchema.module]: 'mineModule',
    [EngineerSchema.equipment]: 'equipment',
};

export const getUpgradeType = ({
    contract,
    item,
}: {
    contract?: ContractDto;
    item?: UserInventoryType;
}) => {
    if (contract)
        return upgradeTypeMap[
            parseAttrs(contract)?.schema_type as keyof typeof upgradeTypeMap
        ];

    return upgradeTypeMap[item?.schema_type as keyof typeof upgradeTypeMap];
};

export const getUpgradeRarity = ({
    contract,
    item,
}: {
    contract?: ContractDto;
    item?: UserInventoryType;
}) => {
    if (contract)
        return rarityMap[
            parseAttrs(contract)?.rarity as keyof typeof rarityMap
        ];

    return rarityMap[item?.rarity as keyof typeof rarityMap];
};

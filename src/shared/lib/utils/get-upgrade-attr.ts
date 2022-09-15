import {
    ContractDto,
    EngineerSchema,
    EngineerSkillKey,
    rarityMap,
} from 'entities/smartcontract';

export const parseAttrs = (contract: ContractDto) => {
    try {
        if (Array.isArray(contract?.attrs))
            return contract?.attrs.reduce(
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
        // eslint-disable-next-line no-console
        console.error(e);
        return undefined;
    }
};

export const upgradeType = {
    [EngineerSchema.mine]: 'mine',
    [EngineerSchema.module]: 'mineModule',
    [EngineerSchema.equipment]: 'equipment',
};

export const getUpgradeType = (contract: ContractDto) =>
    upgradeType[parseAttrs(contract)?.schema_type as keyof typeof upgradeType];

export const getUpgradeRarity = (contract: ContractDto) =>
    rarityMap[parseAttrs(contract)?.rarity as keyof typeof rarityMap];

import { EngineerSchema, Level, RarityType } from 'entities/smartcontract';

import { equipmentLevels } from './equipment';
import { mineLevels } from './mine';
import { mineModuleLevels } from './mineModule';
import { factoryLevels } from './factory';

export const getNftSrc = (
    schemaType: EngineerSchema,
    level: Level,
    rarity?: RarityType
): string => {
    if (schemaType === EngineerSchema.equipment) {
        const currentLevel = equipmentLevels.find(
            (item) => item.value === level
        );

        return (
            currentLevel?.nfts.find((nft) => nft.rarity === rarity)?.src ?? ''
        );
    }
    if (
        [
            EngineerSchema.mine,
            EngineerSchema.module,
            EngineerSchema.factory,
        ].includes(schemaType)
    ) {
        const currentLevel = equipmentLevels.find(
            (item) => item.value === level
        );

        return currentLevel?.nfts[0].src ?? '';
    }

    return '';
};

export { equipmentLevels, mineLevels, mineModuleLevels, factoryLevels };

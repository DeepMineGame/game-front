import { EngineerSchema, RarityType } from 'entities/smartcontract';
import { Level } from '../types';

import { equipmentLevels } from './equipment';
import { mineLevels } from './mine';
import { mineModuleLevels } from './mineModule';
import { factoryLevels } from './factory';

export const getNftSrc = (
    schemaType: EngineerSchema,
    level: Level,
    rarity?: RarityType
): string | null => {
    if (schemaType === EngineerSchema.equipment) {
        const currentLevel = equipmentLevels.find(
            (item) => item.value === level
        );

        return (
            currentLevel?.nfts.find((nft) => nft.rarity === rarity)?.src ?? null
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

        return currentLevel?.nfts[0].src ?? null;
    }

    return null;
};

export { equipmentLevels, mineLevels, mineModuleLevels, factoryLevels };

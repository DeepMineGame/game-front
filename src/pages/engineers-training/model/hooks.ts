import { useStore } from 'effector-react';
import { useMemo } from 'react';
import { EngineerSchema, RarityType } from 'entities/smartcontract';
import { Level, TrainingNftStatus } from './types';
import { getNftSrc } from './levels';
import { $learningSkill, $level, $skillsMapByLevel } from '.';

export const useNft = () => {
    const currentLevel = useStore($level);
    const skillsMapByLevel = useStore($skillsMapByLevel);
    const learningSkill = useStore($learningSkill);

    const getStatus = (
        level: Level,
        schema: EngineerSchema,
        rarity?: RarityType
    ): TrainingNftStatus => {
        if (learningSkill) {
            if (
                learningSkill.level === level &&
                learningSkill.schema_type === schema &&
                (!rarity || learningSkill.rarity === rarity)
            ) {
                return TrainingNftStatus.learning;
            }
        }

        if (currentLevel < level) return TrainingNftStatus.notAvailable;

        const hasSkill = skillsMapByLevel[level]?.some(
            (skill) =>
                skill.schema_type === schema &&
                (!rarity || skill.rarity === rarity)
        );

        if (hasSkill) return TrainingNftStatus.learned;

        return TrainingNftStatus.available;
    };

    const learningNftSrc = useMemo(() => {
        if (!learningSkill) return '';

        return getNftSrc(
            learningSkill.schema_type,
            learningSkill.level,
            learningSkill.rarity
        );
    }, [learningSkill]);

    return { getStatus, learningNftSrc };
};

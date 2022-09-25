import { ActionDto, EngineerSchema, RarityType } from 'entities/smartcontract';

export enum Level {
    first = 1,
    second = 2,
    third = 3,
    fourth = 4,
    fifth = 5,
    sixth = 6,
    seventh = 7,
    eighth = 8,
    ninth = 9,
}

export enum TrainingNftStatus {
    notAvailable,
    available,
    learning,
    learned,
}

export type TrainingNft = {
    templateId: number;
    src: string;
    rarity?: RarityType;
    schemaType: EngineerSchema;
};

export type TrainingNftMeta = {
    status: TrainingNftStatus;
    level: Level;
};

export type TrainingLevel = { value: Level; nfts: TrainingNft[] };

export type WaxUser = { account: string };

export type OpenSkillAction = ActionDto<{
    schema_type: EngineerSchema;
    level: number;
    rarity: RarityType;
}>;

export type LearningSkillType = {
    schemaType: EngineerSchema;
    level: number;
    rarity: RarityType;
    finishesAt: number;
};

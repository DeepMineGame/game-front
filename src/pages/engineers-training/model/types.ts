import {
    ActionDto,
    EngineerSchema,
    Level,
    RarityType,
} from 'entities/smartcontract';

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

export type TrainingNftFull = TrainingNft & TrainingNftMeta;

export type TrainingLevel = { value: Level; nfts: TrainingNft[] };

export type WaxUser = { account: string };

export type OpenSkillAction = ActionDto<{
    first: 'level' | 'rarity' | 'schema_type';
    second: string;
}>;

export type LearningSkillType = {
    schema_type: EngineerSchema;
    level: Level;
    rarity: RarityType;
    finishesAt: number;
};

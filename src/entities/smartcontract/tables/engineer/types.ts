export enum EngineerSchema {
    undefined,
    mine,
    equipment,
    factory,
    module,
}

export enum EngineerSkillKey {
    schema_type = 'schema_type',
    level = 'level',
    rarity = 'rarity',
}

export type EngineerSkill = {
    [EngineerSkillKey.schema_type]: EngineerSchema;
    [EngineerSkillKey.level]: number;
    [EngineerSkillKey.rarity]: number;
};

export type EngineerType = {
    owner: string;
    asset_id: string;
    level: number;
    experience: number;
    exp_to_level_up: number;
    skills: EngineerSkill[];
};

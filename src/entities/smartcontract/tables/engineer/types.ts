export enum EngineerSchema {
    undefined,
    mine,
    equipment,
    factory,
    module_,
}

export type EngineerSkill = {
    schema_type: EngineerSchema;
    level: number;
    rarity: number;
};

export type EngineerType = {
    owner: string;
    asset_id: string;
    level: number;
    experience: number;
    exp_to_level_up: number;
    skills: EngineerSkill[];
};

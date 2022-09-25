import { EngineerSchema } from 'entities/smartcontract';

export const schemaNameMap: Record<EngineerSchema, string> = {
    [EngineerSchema.undefined]: '',
    [EngineerSchema.equipment]: 'Equipment',
    [EngineerSchema.mine]: 'Mine',
    [EngineerSchema.module]: 'Mine module',
    [EngineerSchema.factory]: 'Factory',
};

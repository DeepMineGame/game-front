import { EngineerSchema, Level } from 'entities/smartcontract';
import {
    mineModule1,
    mineModule2,
    mineModule3,
    mineModule4,
    mineModule5,
    mineModule6,
    mineModule7,
    mineModule8,
    mineModule9,
} from '../../assets';
import { mineModuleTemplates } from '../templates';
import { TrainingLevel } from '../types';

export const mineModuleLevels: TrainingLevel[] = [
    {
        value: Level.first,
        nfts: [
            {
                templateId: mineModuleTemplates.getTemplateId(Level.first),
                src: mineModule1,
                schemaType: EngineerSchema.module,
            },
        ],
    },
    {
        value: Level.second,
        nfts: [
            {
                templateId: mineModuleTemplates.getTemplateId(Level.second),
                src: mineModule2,
                schemaType: EngineerSchema.module,
            },
        ],
    },
    {
        value: Level.third,
        nfts: [
            {
                templateId: mineModuleTemplates.getTemplateId(Level.third),
                src: mineModule3,
                schemaType: EngineerSchema.module,
            },
        ],
    },
    {
        value: Level.fourth,
        nfts: [
            {
                templateId: mineModuleTemplates.getTemplateId(Level.fourth),
                src: mineModule4,
                schemaType: EngineerSchema.module,
            },
        ],
    },
    {
        value: Level.fifth,
        nfts: [
            {
                templateId: mineModuleTemplates.getTemplateId(Level.fifth),
                src: mineModule5,
                schemaType: EngineerSchema.module,
            },
        ],
    },
    {
        value: Level.sixth,
        nfts: [
            {
                templateId: mineModuleTemplates.getTemplateId(Level.sixth),
                src: mineModule6,
                schemaType: EngineerSchema.module,
            },
        ],
    },
    {
        value: Level.seventh,
        nfts: [
            {
                templateId: mineModuleTemplates.getTemplateId(Level.seventh),
                src: mineModule7,
                schemaType: EngineerSchema.module,
            },
        ],
    },
    {
        value: Level.eighth,
        nfts: [
            {
                templateId: mineModuleTemplates.getTemplateId(Level.eighth),
                src: mineModule8,
                schemaType: EngineerSchema.module,
            },
        ],
    },
    {
        value: Level.ninth,
        nfts: [
            {
                templateId: mineModuleTemplates.getTemplateId(Level.ninth),
                src: mineModule9,
                schemaType: EngineerSchema.module,
            },
        ],
    },
];

import { EngineerSchema } from 'entities/smartcontract';
import { factoryTemplates } from '../templates';
import { Level, TrainingLevel } from '../types';

const emptySrc = '';

export const factoryLevels: TrainingLevel[] = [
    {
        value: Level.first,
        nfts: [
            {
                templateId: factoryTemplates.getTemplateId(Level.first),
                src: emptySrc,
                schemaType: EngineerSchema.factory,
            },
        ],
    },
    {
        value: Level.second,
        nfts: [
            {
                templateId: factoryTemplates.getTemplateId(Level.second),
                src: emptySrc,
                schemaType: EngineerSchema.factory,
            },
        ],
    },
    {
        value: Level.third,
        nfts: [
            {
                templateId: factoryTemplates.getTemplateId(Level.third),
                src: emptySrc,
                schemaType: EngineerSchema.factory,
            },
        ],
    },
    {
        value: Level.fourth,
        nfts: [
            {
                templateId: factoryTemplates.getTemplateId(Level.fourth),
                src: emptySrc,
                schemaType: EngineerSchema.factory,
            },
        ],
    },
    {
        value: Level.fifth,
        nfts: [
            {
                templateId: factoryTemplates.getTemplateId(Level.fifth),
                src: emptySrc,
                schemaType: EngineerSchema.factory,
            },
        ],
    },
    {
        value: Level.sixth,
        nfts: [
            {
                templateId: factoryTemplates.getTemplateId(Level.sixth),
                src: emptySrc,
                schemaType: EngineerSchema.factory,
            },
        ],
    },
    {
        value: Level.seventh,
        nfts: [
            {
                templateId: factoryTemplates.getTemplateId(Level.seventh),
                src: emptySrc,
                schemaType: EngineerSchema.factory,
            },
        ],
    },
    {
        value: Level.eighth,
        nfts: [
            {
                templateId: factoryTemplates.getTemplateId(Level.eighth),
                src: emptySrc,
                schemaType: EngineerSchema.factory,
            },
        ],
    },
    {
        value: Level.ninth,
        nfts: [
            {
                templateId: factoryTemplates.getTemplateId(Level.ninth),
                src: emptySrc,
                schemaType: EngineerSchema.factory,
            },
        ],
    },
];

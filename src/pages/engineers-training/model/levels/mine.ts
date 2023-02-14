import { EngineerSchema, Level } from 'entities/smartcontract';
import {
    mine1,
    mine2,
    mine3,
    mine4,
    mine5,
    mine6,
    mine7,
    mine8,
    mine9,
} from '../../assets';
import { mineTemplates } from '../templates';
import { TrainingLevel } from '../types';

export const mineLevels: TrainingLevel[] = [
    {
        value: Level.first,
        nfts: [
            {
                templateId: mineTemplates.getTemplateId(Level.first),
                src: mine1,
                schemaType: EngineerSchema.mine,
            },
        ],
    },
    {
        value: Level.second,
        nfts: [
            {
                templateId: mineTemplates.getTemplateId(Level.second),
                src: mine2,
                schemaType: EngineerSchema.mine,
            },
        ],
    },
    {
        value: Level.third,
        nfts: [
            {
                templateId: mineTemplates.getTemplateId(Level.third),
                src: mine3,
                schemaType: EngineerSchema.mine,
            },
        ],
    },
    {
        value: Level.fourth,
        nfts: [
            {
                templateId: mineTemplates.getTemplateId(Level.fourth),
                src: mine4,
                schemaType: EngineerSchema.mine,
            },
        ],
    },
    {
        value: Level.fifth,
        nfts: [
            {
                templateId: mineTemplates.getTemplateId(Level.fifth),
                src: mine5,
                schemaType: EngineerSchema.mine,
            },
        ],
    },
    {
        value: Level.sixth,
        nfts: [
            {
                templateId: mineTemplates.getTemplateId(Level.sixth),
                src: mine6,
                schemaType: EngineerSchema.mine,
            },
        ],
    },
    {
        value: Level.seventh,
        nfts: [
            {
                templateId: mineTemplates.getTemplateId(Level.seventh),
                src: mine7,
                schemaType: EngineerSchema.mine,
            },
        ],
    },
    {
        value: Level.eighth,
        nfts: [
            {
                templateId: mineTemplates.getTemplateId(Level.eighth),
                src: mine8,
                schemaType: EngineerSchema.mine,
            },
        ],
    },
    {
        value: Level.ninth,
        nfts: [
            {
                templateId: mineTemplates.getTemplateId(Level.ninth),
                src: mine9,
                schemaType: EngineerSchema.mine,
            },
        ],
    },
];

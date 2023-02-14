import { EngineerSchema, Level, RarityType } from 'entities/smartcontract';
import {
    eqGray1,
    eqGray2,
    eqGray3,
    eqGray4,
    eqGray5,
    eqGray6,
    eqGray7,
    eqGray8,
    eqGray9,
    eqGreen1,
    eqGreen2,
    eqGreen3,
    eqGreen4,
    eqGreen5,
    eqGreen6,
    eqGreen7,
    eqGreen8,
    eqGreen9,
    eqBlue1,
    eqBlue2,
    eqBlue3,
    eqBlue4,
    eqBlue5,
    eqBlue6,
    eqBlue7,
    eqBlue8,
    eqBlue9,
    eqPurple1,
    eqPurple2,
    eqPurple3,
    eqPurple4,
    eqPurple5,
    eqPurple6,
    eqPurple7,
    eqPurple8,
    eqPurple9,
    eqGold1,
    eqGold2,
    eqGold3,
    eqGold4,
    eqGold5,
    eqGold6,
    eqGold7,
    eqGold8,
    eqGold9,
} from '../../assets';
import { equipmentTemplates } from '../templates';
import { TrainingLevel } from '../types';

export const equipmentLevels: TrainingLevel[] = [
    {
        value: Level.first,
        nfts: (
            [
                [RarityType.common, eqGray1],
                [RarityType.uncommon, eqGreen1],
                [RarityType.rare, eqBlue1],
                [RarityType.epic, eqPurple1],
                [RarityType.legendary, eqGold1],
            ] as const
        ).map(([rarity, src]) => ({
            templateId: equipmentTemplates.getTemplateId(Level.first, rarity),
            src,
            rarity,
            schemaType: EngineerSchema.equipment,
        })),
    },
    {
        value: Level.second,
        nfts: (
            [
                [RarityType.common, eqGray2],
                [RarityType.uncommon, eqGreen2],
                [RarityType.rare, eqBlue2],
                [RarityType.epic, eqPurple2],
                [RarityType.legendary, eqGold2],
            ] as const
        ).map(([rarity, src]) => ({
            templateId: equipmentTemplates.getTemplateId(Level.second, rarity),
            src,
            rarity,
            schemaType: EngineerSchema.equipment,
        })),
    },
    {
        value: Level.third,
        nfts: (
            [
                [RarityType.common, eqGray3],
                [RarityType.uncommon, eqGreen3],
                [RarityType.rare, eqBlue3],
                [RarityType.epic, eqPurple3],
                [RarityType.legendary, eqGold3],
            ] as const
        ).map(([rarity, src]) => ({
            templateId: equipmentTemplates.getTemplateId(Level.third, rarity),
            src,
            rarity,
            schemaType: EngineerSchema.equipment,
        })),
    },
    {
        value: Level.fourth,
        nfts: (
            [
                [RarityType.common, eqGray4],
                [RarityType.uncommon, eqGreen4],
                [RarityType.rare, eqBlue4],
                [RarityType.epic, eqPurple4],
                [RarityType.legendary, eqGold4],
            ] as const
        ).map(([rarity, src]) => ({
            templateId: equipmentTemplates.getTemplateId(Level.fourth, rarity),
            src,
            rarity,
            schemaType: EngineerSchema.equipment,
        })),
    },
    {
        value: Level.fifth,
        nfts: (
            [
                [RarityType.common, eqGray5],
                [RarityType.uncommon, eqGreen5],
                [RarityType.rare, eqBlue5],
                [RarityType.epic, eqPurple5],
                [RarityType.legendary, eqGold5],
            ] as const
        ).map(([rarity, src]) => ({
            templateId: equipmentTemplates.getTemplateId(Level.fifth, rarity),
            src,
            rarity,
            schemaType: EngineerSchema.equipment,
        })),
    },
    {
        value: Level.sixth,
        nfts: (
            [
                [RarityType.common, eqGray6],
                [RarityType.uncommon, eqGreen6],
                [RarityType.rare, eqBlue6],
                [RarityType.epic, eqPurple6],
                [RarityType.legendary, eqGold6],
            ] as const
        ).map(([rarity, src]) => ({
            templateId: equipmentTemplates.getTemplateId(Level.sixth, rarity),
            src,
            rarity,
            schemaType: EngineerSchema.equipment,
        })),
    },
    {
        value: Level.seventh,
        nfts: (
            [
                [RarityType.common, eqGray7],
                [RarityType.uncommon, eqGreen7],
                [RarityType.rare, eqBlue7],
                [RarityType.epic, eqPurple7],
                [RarityType.legendary, eqGold7],
            ] as const
        ).map(([rarity, src]) => ({
            templateId: equipmentTemplates.getTemplateId(Level.seventh, rarity),
            src,
            rarity,
            schemaType: EngineerSchema.equipment,
        })),
    },
    {
        value: Level.eighth,
        nfts: (
            [
                [RarityType.common, eqGray8],
                [RarityType.uncommon, eqGreen8],
                [RarityType.rare, eqBlue8],
                [RarityType.epic, eqPurple8],
                [RarityType.legendary, eqGold8],
            ] as const
        ).map(([rarity, src]) => ({
            templateId: equipmentTemplates.getTemplateId(Level.eighth, rarity),
            src,
            rarity,
            schemaType: EngineerSchema.equipment,
        })),
    },
    {
        value: Level.ninth,
        nfts: (
            [
                [RarityType.common, eqGray9],
                [RarityType.uncommon, eqGreen9],
                [RarityType.rare, eqBlue9],
                [RarityType.epic, eqPurple9],
                [RarityType.legendary, eqGold9],
            ] as const
        ).map(([rarity, src]) => ({
            templateId: equipmentTemplates.getTemplateId(Level.ninth, rarity),
            src,
            rarity,
            schemaType: EngineerSchema.equipment,
        })),
    },
];

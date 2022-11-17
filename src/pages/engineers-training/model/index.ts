import { combine, createEffect, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { getTableData } from 'shared';
import {
    EngineerSkill,
    getInventoryConfig,
    UserInventoryType,
} from 'entities/smartcontract';
import {
    getEngineerByExecutorEffect,
    getActiveInventoryEffect,
    $engineer,
    $userActiveInventory,
    getActionByUserEffect,
    $openSkillAction,
} from 'entities/engineer';
import { LearningSkillType, Level, OpenSkillAction, WaxUser } from './types';

export const TrainingPageGate = createGate<WaxUser>();
export const InventoryGate = createGate<WaxUser>();

export const $level = $engineer.map<Level>(
    (state) => state?.level ?? Level.first
);

export const $nextLevel = $level.map<Level>((level) => level + 1);

export const $maxLevel = createStore(Level.ninth);

export const $isMaxLevelPassed = combine(
    $level,
    $maxLevel,
    (level, maxLevel) => level === maxLevel
);

export const $skillsMapByLevel = $engineer.map((state) =>
    (state?.skills ?? []).reduce<Record<number, EngineerSkill[]>>(
        (result, skill) => {
            if (result[skill.level]) {
                result[skill.level].push(skill);
            } else {
                result[skill.level] = [skill];
            }

            return result;
        },
        {}
    )
);

export const $xp = $engineer.map((state) => state?.experience ?? 0);

export const $levelProgressPercent = combine($engineer, $xp, (engineer, xp) => {
    const xpToNextLevel = engineer?.exp_to_level_up ?? 0;

    return xpToNextLevel && Math.floor((xp * 100) / xpToNextLevel);
});

export const $xpHasBeenReached = $levelProgressPercent.map(
    (levelProgressPercent) => levelProgressPercent === 100
);

export const $userActiveInventoryMap = $userActiveInventory.map(
    (activeInventory) =>
        activeInventory.reduce<Record<number, UserInventoryType>>(
            (result, inventoryItem) => {
                result[inventoryItem.template_id] = inventoryItem;
                return result;
            },
            {}
        )
);

export const $userAllInventory = createStore<UserInventoryType[]>([]);

export const $userAllInventoryMap = $userAllInventory.map((allInventory) =>
    allInventory.reduce<Record<number, UserInventoryType>>(
        (result, inventoryItem) => {
            result[inventoryItem.template_id] = inventoryItem;
            return result;
        },
        {}
    )
);

export const getUserAllInventoryEffect = createEffect<
    WaxUser,
    { rows: UserInventoryType[] } | undefined
>(({ account }) => getTableData(getInventoryConfig(account, 1000)));

export const $isEngineerFetching = getEngineerByExecutorEffect.pending;

export const $isInventoryFetching = combine(
    getActiveInventoryEffect.pending,
    getUserAllInventoryEffect.pending,
    (isActiveInventoryPending, isAllInventoryPending) =>
        isActiveInventoryPending || isAllInventoryPending
);

export const $learningSkill = $openSkillAction.map<LearningSkillType | null>(
    (openSkillAction) => {
        if (!openSkillAction || !openSkillAction?.attrs.length) return null;
        const action = openSkillAction as OpenSkillAction;

        return {
            ...action.attrs.reduce(
                (result, attr) => ({
                    ...result,
                    [attr.key]: Number(attr.value),
                }),
                {} as Omit<LearningSkillType, 'finishesAt'>
            ),
            finishesAt: action.finishes_at,
        };
    }
);

sample({
    clock: TrainingPageGate.open,
    fn: ({ account }) => ({ searchParam: account }),
    target: [getEngineerByExecutorEffect, getActionByUserEffect],
});

sample({
    clock: InventoryGate.open,
    fn: ({ account }) => ({ searchParam: account }),
    target: [getUserAllInventoryEffect, getActiveInventoryEffect],
});

sample({
    source: getUserAllInventoryEffect.doneData,
    fn: (data) => data?.rows || [],
    target: $userAllInventory,
});

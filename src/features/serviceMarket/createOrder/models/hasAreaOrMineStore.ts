import { createStore } from 'effector';
import { mineAssetTemplateId } from 'entities/smartcontract';
import { getAreaByOwnerEffect, getInventoryEffect } from './effects';

export const hasAreaOrMineStore = createStore<boolean>(false)
    .on(getInventoryEffect.doneData, (hasAreaOrMine, data) =>
        Boolean(
            data?.rows?.find(({ template_id }) =>
                mineAssetTemplateId.includes(template_id)
            )
        )
    )
    .on(
        getAreaByOwnerEffect.doneData,
        (hasAreaOrMine, data) => Boolean(data?.rows?.length) || hasAreaOrMine
    );

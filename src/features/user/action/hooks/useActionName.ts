import { useTranslation } from 'react-i18next';
import { ActionType } from 'entities/smartcontract';

export const useActionName = (actionType: ActionType) => {
    const { t } = useTranslation();

    return {
        [ActionType.mine]: t('Mining'),
        [ActionType.mine_activation]: t('features.actions.mineActivation'),
        [ActionType.mine_deactivation]: t('features.actions.mineDeactivation'),
        [ActionType.mine_setup]: t('features.actions.mineSetup'),
        [ActionType.mine_unsetup]: t('features.actions.mineUnsetup'),
        [ActionType.physical_shift]: t('features.actions.physicalShift'),
        [ActionType.mine_change_layer_depth]: t(
            'features.actions.mineChangeLayerDepth'
        ),
        [ActionType.engineer_open_skill]: t(
            'features.actions.engineerUnlockSkill'
        ),
        [ActionType.engineer_upgrade_item]: t(
            'features.actions.engineerUpgradeItem'
        ),
        [ActionType.engineer_level_up]: t('features.actions.engineerLevelUp'),
        [ActionType.equipment_repair]: t('features.actions.equipmentRepair'),
        [ActionType.undefined]: null,
    }[actionType];
};

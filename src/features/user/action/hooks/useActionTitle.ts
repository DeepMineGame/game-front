import { useTranslation } from 'react-i18next';
import { ActionType } from 'entities/smartcontract';

export function useActionTitle() {
    const { t } = useTranslation();

    return {
        [ActionType.mine]: t('features.actions.mine'),
        [ActionType.mine_activation]: t('features.actions.mineActivation'),
        [ActionType.mine_deactivation]: t('features.actions.mineDeactivation'),
        [ActionType.mine_setup]: t('features.actions.mineSetup'),
        [ActionType.mine_unsetup]: t('features.actions.mineUnsetup'),
        [ActionType.physical_shift]: t('features.actions.physicalShift'),
        [ActionType.mine_change_layer_depth]: null,
        [ActionType.engineer_open_skill]: t(
            'features.actions.engineerUnlockSkill'
        ),
        [ActionType.engineer_upgrade_item]: t(
            'features.actions.engineerUpgradeItem'
        ),
        [ActionType.engineer_level_up]: t('features.actions.engineerLevelUp'),
        [ActionType.equipment_repair]: null,
        [ActionType.undefined]: null,
    };
}

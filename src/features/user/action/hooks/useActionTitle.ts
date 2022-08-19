import { useTranslation } from 'react-i18next';
import { ActionType } from 'entities/smartcontract';

export const useActionTitle = () => {
    const { t } = useTranslation();

    return {
        [ActionType.mine]: t('features.actions.mine'),
        [ActionType.mine_activation]: t('features.actions.mineActivation'),
        [ActionType.mine_deactivation]: t('features.actions.mineDeactivation'),
        [ActionType.mine_setup]: t('features.actions.mineSetup'),
        [ActionType.mine_unsetup]: t('features.actions.mineUnsetup'),
        [ActionType.physical_shift]: t('features.actions.physicalShift'),
        [ActionType.undefined]: null,
    };
};

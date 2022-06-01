import {
    ActionDto,
    ContractDto,
    InventoriesDto,
    LOCATION_TO_ID,
    mineAssetTemplateId,
    MineDto,
    UserDto,
} from 'entities/smartcontract';
import { $mineOwnerCabinState, mineOwnerCabinState } from '../model';

export function avoidApplyIfAffectCurrentStatus(
    $currentStatus: typeof $mineOwnerCabinState,
    targetStatus: mineOwnerCabinState
) {
    return () => $currentStatus.getState() > targetStatus;
}
export const hasMineNftFilter = (inventories: InventoriesDto[] | null) => {
    const hasMineNft = Boolean(
        inventories?.filter(
            ({ asset_template_id }) => asset_template_id === mineAssetTemplateId
        )?.[0]
    );
    return !hasMineNft;
};

export const checkIsUserLocationOutsideMineFilter = (user: UserDto[] | null) =>
    Boolean(user?.[0]?.location !== LOCATION_TO_ID.mine_deck);

export const checkIsMineInActiveFilter = (mines: MineDto[] | null) =>
    !mines?.[0]?.is_active;

export const checkIfMineSetupWillFinishedInFuture = (
    actions: ActionDto[] | null
) =>
    Boolean(
        actions?.[0] && new Date(actions[0].finishes_at * 1000) > new Date()
    );

export const findActiveMineContract = ({
    contract,
    inventory,
}: {
    contract: ContractDto[] | null;
    inventory: InventoriesDto[] | null;
}) => {
    const mineAssetIdByTemplateId = inventory?.find(
        ({ asset_template_id }) => asset_template_id === mineAssetTemplateId
    )?.asset_id;

    const mineContract = contract?.find(
        ({ client_asset_id }) =>
            String(client_asset_id) === mineAssetIdByTemplateId
    );

    return Boolean(!mineContract?.is_active);
};

export const hasMinesFilter = (mines: MineDto[] | null) =>
    Boolean(mines?.length);

export const isMineActiveFilter = (mines: MineDto[] | null) =>
    Boolean(mines?.[0]?.is_active);

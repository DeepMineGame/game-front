import {
    ActionDto,
    ContractDto,
    ContractType,
    LOCATION_TO_ID,
    mineAssetTemplateId,
    MineDto,
    MineState,
    UserDto,
    UserInventoryType,
} from 'entities/smartcontract';
import {
    $mineOwnerCabinState,
    mineOwnerCabinState,
} from '../models/mineOwnerState';

export function ignoreIfInStatus(
    $currentStatus: typeof $mineOwnerCabinState,
    targetStatuses: mineOwnerCabinState[]
) {
    return (param: boolean) =>
        !targetStatuses.includes($currentStatus.getState()) && param;
}
export const hasMineNftFilter = (inventories: UserInventoryType[] | null) => {
    return !inventories?.filter(
        ({ asset_template_id }) => asset_template_id === mineAssetTemplateId
    )?.[0];
};

export const checkIsUserLocationOutsideMineFilter = (user: UserDto[] | null) =>
    Boolean(user?.[0]?.location !== LOCATION_TO_ID.mine_deck);

export const checkHasActiveContractWithLandlord = (
    contracts: ContractDto[] | null
) => {
    const contractWithLandlord = contracts?.filter(
        ({ type }) => type === ContractType.landlord_mineowner
    )?.[0];
    return !contractWithLandlord?.is_active;
};

export const checkIfMineSetupWillFinishedInFuture = (
    actions: ActionDto[] | null
) =>
    Boolean(
        actions?.[0] && new Date(actions[0].finishes_at * 1000) > new Date()
    );

export const hasActiveMineContractFilter = ({
    contract,
    inventory,
}: {
    contract: ContractDto[] | null;
    inventory: UserInventoryType[] | null;
}) => {
    const mineAssetIdByTemplateId = inventory?.find(
        ({ asset_template_id }) => asset_template_id === mineAssetTemplateId
    )?.asset_id;

    const mineContract = contract?.find(
        ({ client_asset_id }) =>
            String(client_asset_id) === mineAssetIdByTemplateId
    );
    if (!mineContract) {
        return false;
    }
    return Boolean(!mineContract?.is_active);
};

export const hasMinesFilter = (mines: MineDto[] | null) =>
    Number(mines?.length) > 0;

export const isMineActiveFilter = (mines: MineDto[] | null) =>
    mines?.[0]?.state === MineState.activated;

import {
    ActionDto,
    ActionType,
    ContractDto,
    ContractStatus,
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
        ({ template_id }) => template_id === mineAssetTemplateId
    )?.[0];
};

export const checkIsUserLocationOutsideMineFilter = (user: UserDto[] | null) =>
    Boolean(user?.[0]?.location !== LOCATION_TO_ID.mine_deck);

export const checkHasActiveContractWithLandlord = (
    contracts: ContractDto[] | null
) => {
    return contracts?.filter(
        ({ type, status }) =>
            type === ContractType.landlord_mineowner &&
            status === ContractStatus.active
    )?.[0];
};

export const checkIfMineSetupWillFinishedInFuture = (
    actions: ActionDto[] | null
) => {
    const mineSetupAction = actions?.filter(
        ({ type }) => type === ActionType.mine_setup
    );
    return Boolean(
        mineSetupAction?.[0] &&
            new Date(mineSetupAction[0].finishes_at * 1000) > new Date()
    );
};

export const hasActiveMineContractFilter = ({
    contract,
    inventory,
}: {
    contract: ContractDto[] | null;
    inventory: UserInventoryType[] | null;
}) => {
    const mineAssetIdByTemplateId = inventory?.find(
        ({ template_id }) => template_id === mineAssetTemplateId
    )?.asset_id;

    const mineContract = contract?.find(
        ({ client_asset_id }) =>
            String(client_asset_id) === mineAssetIdByTemplateId
    );
    if (!mineContract) {
        return false;
    }
    return mineContract?.status === ContractStatus.active;
};

export const hasMinesFilter = (mines: MineDto[] | null) =>
    Number(mines?.length) > 0;

export const isMineActiveFilter = (mines: MineDto[] | null) =>
    mines?.[0]?.state === MineState.activated;

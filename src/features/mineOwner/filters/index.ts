import {
    ActionDto,
    ActionType,
    ContractDto,
    ContractStatus,
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

export const checkIsContractInactive = (
    contract: ContractDto | null | undefined
) => {
    return contract?.status !== ContractStatus.active;
};

export const checkMineNotSetup = ({
    userMineStore,
    mineOwnerLandlordContractForUserStore,
}: {
    userMineStore: MineDto[] | null;
    mineOwnerLandlordContractForUserStore: ContractDto | null | undefined;
}) => {
    return (
        mineOwnerLandlordContractForUserStore?.status ===
            ContractStatus.active && userMineStore === null
    );
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
}: {
    contract: ContractDto | null | undefined;
    inventory: UserInventoryType[] | null;
}) => {
    if (!contract) {
        return false;
    }
    return contract?.status !== ContractStatus.active;
};

export const hasMinesFilter = (mines: MineDto[] | null) =>
    Number(mines?.length) > 0;

export const isMineActiveFilter = (mines: MineDto[] | null) =>
    mines?.[0]?.state === MineState.activated;

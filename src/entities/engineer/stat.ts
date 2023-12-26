export type EngineerStatDto = {
    date: string;
    upgrades_count: number;
    upgrades_status: string;
    upgrade_total_count: number;
    upgrades_fails_count: number;
    upgrades_cost_of_execution: string;
    upgrades: {
        date: string;
        type: string;
        rarity: string;
        status: string;
        total_count: number;
        fails_count: number;
        cost_of_execution: string;
    }[];
};

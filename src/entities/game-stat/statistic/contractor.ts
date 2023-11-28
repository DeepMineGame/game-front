export type ContractorStats = {
    date: string;
    minings_mined: string;
    minings_count: number;
    minings_duration: string;
    minings_failed: number;
    minings_breakdowns: number;
    minings: {
        date: string;
        mined: string;
        count: number;
        duration: string;
        failed_count: number;
        breakdowns: number;
    }[];
};

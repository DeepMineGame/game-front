export type LandlordAreaStat = {
    date: string;
    minings_mined: string;
    minings_active_mines: number;
    minings_count: number;
    minings_crew: string;
    minings: [
        {
            contractor: string;
            mined: string;
            active_mines: number;
            count: number;
            crew: string;
        }
    ];
};

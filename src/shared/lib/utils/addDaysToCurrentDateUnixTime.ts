import { msToSeconds } from 'shared/ui';

/**
 * Take current date, add amount of days and return it in unix time format.
 * @param amountDays
 */
export const addDaysToCurrentDateUnixTime = (amountDays: number) => {
    const date = new Date();

    return parseInt(
        String(
            msToSeconds(
                new Date().setDate(date.getDate() + amountDays).valueOf()
            )
        ),
        10
    );
};

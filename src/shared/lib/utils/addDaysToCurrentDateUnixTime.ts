/**
 * Take current date, add amount of days and return it in unix time format.
 * @param amountDays
 */
export const addDaysToCurrentDateUnixTime = (amountDays: number) => {
    const date = new Date();

    return parseInt(
        String(
            new Date().setDate(date.getDate() + amountDays).valueOf() / 1000
        ),
        10
    );
};

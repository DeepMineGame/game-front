/**
 * Create options for select from number
 * @param amountOfDays
 */
export const getDaysSelectItem = ({ amountOfDays }: { amountOfDays: number }) =>
    Array.from(Array(amountOfDays).keys()).map((_, index) => ({
        label: `${index + 1} Day`,
        value: index + 1,
    }));

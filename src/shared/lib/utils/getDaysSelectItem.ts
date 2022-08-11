type GetLabelSelectItemParams = {
    amount: number;
    label: string;
    sinceZero?: boolean;
};

type ExcludesFalse = <T>(x: T | false) => x is T;

/**
 * Create options for select from number
 */
export const getLabelSelectItem = ({
    amount,
    label,
    sinceZero = false,
}: GetLabelSelectItemParams) =>
    [
        ...Array.from(Array(amount).keys()).map((_, index) => ({
            label: `${index + (sinceZero ? 0 : 1)} ${label}`,
            value: index + (sinceZero ? 0 : 1),
        })),
        sinceZero && {
            label: `${Array.from(Array(amount).keys()).length} ${label}`,
            value: Array.from(Array(amount).keys()).length,
        },
    ].filter(Boolean as any as ExcludesFalse);

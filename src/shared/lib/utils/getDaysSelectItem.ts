type GetLabelSelectItemParams = {
    amount: number;
    label: string;
    sinceZero?: boolean;
};

/**
 * Create options for select from number
 */
export const getLabelSelectItem = ({
    amount,
    label,
    sinceZero = false,
}: GetLabelSelectItemParams) => {
    const labels = Array.from(Array(amount).keys()).map((_, index) => ({
        label: `${index + (sinceZero ? 0 : 1)} ${label}`,
        value: index + (sinceZero ? 0 : 1),
    }));

    if (sinceZero) {
        labels.push({
            label: `${amount} ${label}`,
            value: amount,
        });
    }

    return labels;
};

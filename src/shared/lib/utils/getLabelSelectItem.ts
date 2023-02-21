type GetLabelSelectItemParams = {
    amount: number;
    label: string;
    sinceZero?: boolean;
    addSInEnd?: boolean;
};

/**
 * Function return array of options with asc numeric value and custom label
 * @param param0 Amount of options. Label for option. sinceZero if we wanna get options since 0 value
 * @returns Array of options for Select component
 */
export const getLabelSelectItem = ({
    amount,
    label,
    sinceZero = false,
    addSInEnd = true,
}: GetLabelSelectItemParams) => {
    const labels = Array.from(Array(amount).keys()).map((_, index) => ({
        label: `${index + (sinceZero ? 0 : 1)} ${label}${
            index !== 0 && label && addSInEnd ? 's' : ''
        }`,
        value: index + (sinceZero ? 0 : 1),
    }));

    return sinceZero
        ? [
              ...labels,
              {
                  label: `${amount} ${label}`,
                  value: amount,
              },
          ]
        : labels;
};

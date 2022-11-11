import { ContractAttrs } from './types';

const normalizeAttrs = (
    attrs: { key: string; value: string | number }[]
): Partial<ContractAttrs> => {
    return attrs.reduce((acc, { key, value }) => {
        acc[key] = value;
        return acc;
    }, {} as any);
};

export { normalizeAttrs };

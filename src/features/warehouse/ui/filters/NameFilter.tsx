import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared';

type Name = string | null;

type Props = {
    className?: string;
    items: { name: Name }[];
    disabled?: boolean;
    onChange: (value: Name) => void;
    value: Name;
};

export const NameFilter = ({
    className = '',
    items,
    disabled,
    onChange,
    value,
}: Props) => {
    const { t } = useTranslation();

    const options = useMemo(() => {
        const nameSet = new Set<Name>();

        items.forEach((item) => {
            nameSet.add(item.name);
        });

        return [...nameSet].map((name) => ({
            value: name,
            label: name,
        }));
    }, [items]);

    return (
        <Select
            className={className}
            placeholder={t('components.common.selectByName')}
            size="large"
            options={options}
            disabled={disabled}
            onChange={(name: string | undefined) => {
                onChange(name ?? null);
            }}
            value={value}
            style={{ minWidth: 200 }}
            allowClear
        />
    );
};

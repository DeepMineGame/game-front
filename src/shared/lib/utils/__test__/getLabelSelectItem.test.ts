import { getLabelSelectItem } from '../getLabelSelectItem';

describe('getLabelSelectItem', () => {
    test('Function should return array of options in asc order for Select component', () => {
        expect(getLabelSelectItem({ amount: 1, label: 'Day' })).toEqual([
            { value: 1, label: '1 Day' },
        ]);
        expect(getLabelSelectItem({ amount: 2, label: 'Hour' })).toEqual([
            { value: 1, label: '1 Hour' },
            { value: 2, label: '2 Hours' },
        ]);
    });

    test('Function should return array of options in asc order since 0 value for Select component', () => {
        expect(getLabelSelectItem({ amount: 3, label: 'Week' })).toEqual([
            { value: 1, label: '1 Week' },
            { value: 2, label: '2 Weeks' },
            { value: 3, label: '3 Weeks' },
        ]);
        expect(getLabelSelectItem({ amount: 2, label: 'Hour' })).toEqual([
            { value: 1, label: '1 Hour' },
            { value: 2, label: '2 Hours' },
        ]);
    });
});

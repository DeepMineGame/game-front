import { getLabelSelectItem } from '../getLabelSelectItem';

describe('getLabelSelectItem', () => {
    test('Function should return array of options in asc order for Select component', () => {
        expect(getLabelSelectItem({ amount: 1, label: 'Days' })).toEqual([
            { value: 1, label: '1 Days' },
        ]);
        expect(getLabelSelectItem({ amount: 2, label: 'Hours' })).toEqual([
            { value: 1, label: '1 Hours' },
            { value: 2, label: '2 Hours' },
        ]);
    });

    test('Function should return array of options in asc order since 0 value for Select component', () => {
        expect(
            getLabelSelectItem({ amount: 3, label: 'Weeks', sinceZero: true })
        ).toEqual([
            { value: 0, label: '0 Weeks' },
            { value: 1, label: '1 Weeks' },
            { value: 2, label: '2 Weeks' },
            { value: 3, label: '3 Weeks' },
        ]);
        expect(
            getLabelSelectItem({ amount: 2, label: 'Hours', sinceZero: true })
        ).toEqual([
            { value: 0, label: '0 Hours' },
            { value: 1, label: '1 Hours' },
            { value: 2, label: '2 Hours' },
        ]);
    });
});

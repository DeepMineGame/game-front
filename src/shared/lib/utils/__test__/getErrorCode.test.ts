import { getErrorCode } from '../getErrorCode';

describe('getErrorCode', () => {
    test('Function should return code which between square brackets []', () => {
        expect(
            getErrorCode(
                '[00125] you must terminate the Contract with Landlord first'
            )
        ).toBe('00125');
        expect(getErrorCode('[14] wrong asset ID')).toBe('14');
    });

    test('Function should return "fallback" string if it received string without square brackets []', () => {
        expect(
            getErrorCode(
                '[00125 you must terminate the Contract with Landlord first'
            )
        ).toBe('fallback');
        expect(
            getErrorCode(
                '00125 you must terminate the Contract with Landlord first'
            )
        ).toBe('fallback');
        expect(
            getErrorCode(
                '00125] you must terminate the Contract with Landlord first'
            )
        ).toBe('fallback');
        expect(
            getErrorCode(
                '[] you must terminate the Contract with Landlord first'
            )
        ).toBe('fallback');
        expect(
            getErrorCode(
                '] you must terminate the Contract with Landlord first'
            )
        ).toBe('fallback');
        expect(
            getErrorCode(
                '[ you must terminate the Contract with Landlord first'
            )
        ).toBe('fallback');
    });
});

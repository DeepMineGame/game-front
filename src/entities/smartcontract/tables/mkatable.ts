import { deepmineengr } from '../constants';

export const getMkatableConfig = () => ({
    json: true,
    code: deepmineengr,
    scope: deepmineengr,
    table: 'mkatable',
    index_position: 1,
    key_type: '' as const,
    lower_bound: '',
    upper_bound: '',
    limit: 10,
});

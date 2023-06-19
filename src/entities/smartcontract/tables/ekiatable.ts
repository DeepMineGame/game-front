import { deepmineengr } from '../constants';

export const getEkiatableConfig = (account: string) => ({
    json: true,
    code: deepmineengr,
    scope: deepmineengr,
    table: 'ekiatable',
    index_position: 1,
    key_type: '' as const,
    lower_bound: '',
    upper_bound: '',
    limit: 10,
});

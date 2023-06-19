import { deepmineengr } from '../../constants';

export const getEkutableConfig = (account: string) => ({
    json: true,
    code: deepmineengr,
    scope: deepmineengr,
    table: 'ekuatable',
    index_position: 1,
    key_type: '' as const,
    lower_bound: '',
    upper_bound: '',
    limit: 10,
});

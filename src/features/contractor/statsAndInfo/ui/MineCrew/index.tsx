import React from 'react';
import { useTranslation } from 'react-i18next';
import { MineCrewTable } from 'shared';
import type { MineCrewDataType } from 'shared';
import styles from './styles.module.scss';

const contractorsNumber = 15;

const data: MineCrewDataType[] = [
    {
        key: 1,
        discord: 'Username8458',
        contractor: 'Username8458',
        status: 0,
        ejection: 346,
        activity: 2,
    },
    {
        key: 2,
        discord: '',
        contractor: 'OrangeboxPlayer',
        status: 1,
        ejection: 6588,
        activity: 1,
    },
    {
        key: 3,
        discord: 'Startalk',
        contractor: 'Startalk',
        status: 2,
        ejection: 346,
        activity: 2,
    },
    {
        key: 4,
        discord: '',
        contractor: 'Skyslayer',
        status: 2,
        ejection: 875,
        activity: 1,
    },
    {
        key: 5,
        discord: 'WhenIPewYouQQ',
        contractor: 'WhenIPewYouQQ',
        status: 2,
        ejection: 7642,
        activity: 0,
    },
    {
        key: 6,
        discord: 'streamer256',
        contractor: 'streamer256',
        status: 2,
        ejection: 1487,
        activity: 1,
    },
];

export const MineCrew = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.mineCrew}>
            <div className={styles.mineCrewTable}>
                <div className={styles.contractors}>
                    {t('pages.contractorMineCrew.contractors')}{' '}
                    <b>{contractorsNumber}</b>
                </div>
                <MineCrewTable data={data} />
            </div>
        </div>
    );
};

import { useGate, useStore } from 'effector-react';
import { useAccountName } from 'shared';
import { toggleStarterPackModalVisibilityEvent } from '../../model';
import {
    $hasAtomicAssets,
    getAtomicAssetsByUserEffect,
    StarterPackNotifierGate,
} from '../../model/hasAtomicAssets';
import button from './assets/box.png';
import styles from './styles.module.scss';

export const StarterPackNotifier = () => {
    const accountName = useAccountName();
    useGate(StarterPackNotifierGate, { searchParam: accountName });
    const hasAtomicAssets = useStore($hasAtomicAssets);
    console.log(hasAtomicAssets, getAtomicAssetsByUserEffect.pending);
    if (hasAtomicAssets || getAtomicAssetsByUserEffect.pending) {
        return null;
    }

    return (
        <img
            onClick={() => toggleStarterPackModalVisibilityEvent()}
            className={styles.box}
            src={button}
            alt="starter kit"
        />
    );
};

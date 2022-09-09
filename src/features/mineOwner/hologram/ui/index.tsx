import { FC } from 'react';
import { desktopS, Loader, Title, useMediaQuery } from 'shared';
import { useGate, useStore } from 'effector-react';
import { MineOwnerCabinGate, $mineOwnerCabinState } from '../../models';
import { useTitles } from '../hooks/useTitles';
import { useDescriptions } from '../hooks/useDescriptions';
import { useActionsButton } from '../hooks/useActionsButton';
import { isCabinStateEffectLoading$ } from '../../models/isCabinStateEffectLoading';
import styles from './styles.module.scss';

type Props = {
    user: string;
};

export const Hologram: FC<Props> = ({ user }) => {
    useGate(MineOwnerCabinGate, {
        searchParam: user,
    });
    const cabinState = useStore($mineOwnerCabinState);

    const isDesktop = useMediaQuery(desktopS);
    const titles = useTitles();
    const descriptions = useDescriptions();
    const buttons = useActionsButton();
    const isLoading = useStore(isCabinStateEffectLoading$);

    if (isLoading) {
        return (
            <div className={styles.hologram}>
                <Loader />
            </div>
        );
    }

    return (
        <div className={styles.hologram}>
            {isDesktop && <Title>{titles[cabinState]}</Title>}
            {descriptions[cabinState]}
            {buttons[cabinState]}
        </div>
    );
};

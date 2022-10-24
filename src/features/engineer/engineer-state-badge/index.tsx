import { FC } from 'react';
import { Badge } from 'antd';
import { useTranslation } from 'react-i18next';
import { CabinState } from 'entities/engineer';
import { Text } from 'shared/ui';
import { green6, neutral8, orange6 } from 'shared/ui/variables';
import styles from './styles.module.scss';

const colors = {
    [CabinState.Idle]: neutral8,
    [CabinState.NotInaugurated]: neutral8,
    [CabinState.Active]: green6,
    [CabinState.Work]: orange6,
};

const texts = {
    [CabinState.NotInaugurated]: 'notInaugurated',
    [CabinState.Idle]: 'idle',
    [CabinState.Active]: 'active',
    [CabinState.Work]: 'work',
};

type Props = {
    state: CabinState;
};

const EngineerStateBadge: FC<Props> = ({ state }) => {
    const { t } = useTranslation();

    return (
        <Badge
            color={colors[state]}
            text={
                <Text className={styles.text}>
                    {t(`pages.engineer.status.${texts[state]}`)}
                </Text>
            }
        />
    );
};

export { EngineerStateBadge };

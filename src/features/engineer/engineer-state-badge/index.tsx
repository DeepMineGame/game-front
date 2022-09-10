import { FC } from 'react';
import { Badge } from 'antd';
import { useTranslation } from 'react-i18next';
import { CabinState } from 'entities/engineer';
import { Text, green6, neutral1, orange6 } from 'shared/ui';
import styles from './styles.module.scss';

const colors = {
    [CabinState.Idle]: neutral1,
    [CabinState.Active]: green6,
    [CabinState.Work]: orange6,
};

const texts = {
    [CabinState.Idle]: 'notInaugurated',
    [CabinState.Active]: 'active',
    [CabinState.Work]: 'working',
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

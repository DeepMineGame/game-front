import { FC } from 'react';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { Space } from 'antd';
import { $engineerCabinStore } from 'entities/engineer';
import { useReloadPage } from 'shared/lib/hooks';
import { LoadingSpin, Text } from 'shared/ui/ui-kit';
import { CountDown } from 'shared/ui/components';
import { State } from '../state';

const UnlockingSkill: FC = () => {
    const { t } = useTranslation();
    const reloadPage = useReloadPage();
    const engineerStore = useStore($engineerCabinStore);

    return (
        <State
            title={t('pages.engineer.unlockingTrainingSlot')}
            content={
                <Space size={8}>
                    <LoadingSpin size="xl" />
                    <Text size="md">
                        <CountDown
                            onFinish={reloadPage}
                            finishesAt={
                                engineerStore.openSkillAction?.finishes_at
                            }
                        />
                    </Text>
                </Space>
            }
        />
    );
};

export { UnlockingSkill };

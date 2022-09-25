import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';
import { Text, useReloadPage } from 'shared';
import cn from 'classnames';
import { rarityMap } from 'entities/smartcontract';
import { CountDown } from 'shared/ui/components';
import { getNftSrc } from '../../model/levels';
import { LearningSkillType, TrainingNftStatus } from '../../model/types';
import { Nft } from '../nft';

import sharedStyles from '../styles.module.scss';
import { schemaNameMap } from '../constants';
import styles from './styles.module.scss';

type Props = {
    skill: LearningSkillType;
};

export const LearningSkill = ({
    skill: { schemaType, level, rarity, finishesAt },
}: Props) => {
    const { t } = useTranslation();
    const reloadPage = useReloadPage();

    const src = useMemo(
        () => getNftSrc(schemaType, level, rarity),
        [schemaType, level, rarity]
    );

    return (
        <Row
            className={cn(sharedStyles.card, styles.block)}
            gutter={[16, 0]}
            wrap={false}
        >
            <Col span="48px">
                <Nft
                    schemaType={schemaType}
                    templateId={0}
                    src={src ?? ''}
                    level={level}
                    status={TrainingNftStatus.learning}
                    width={48}
                    height={68}
                    isDisabled
                />
            </Col>
            <Col span="100%">
                <Row justify="space-around">
                    <Col span={24}>
                        <Text className={styles.title} size="xs">
                            {t('pages.engineersTraining.learningSkill')}
                        </Text>
                    </Col>
                    <Col span={24}>
                        <Text className={styles.description}>
                            {[
                                `${schemaNameMap[schemaType]}`,
                                rarity && rarityMap[rarity],
                                `${t('components.common.level')} ${level}`,
                            ]
                                .filter(Boolean)
                                .join(' ')}
                        </Text>
                    </Col>
                    <Col span={24}>
                        <Text className={styles.time} strong size="sm">
                            <CountDown
                                onFinish={reloadPage}
                                finishesAt={finishesAt}
                            />
                        </Text>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

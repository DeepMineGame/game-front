import { Typography, Row, Col } from 'antd';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { EngineerSchema, RarityType } from 'entities/smartcontract';

import { Nft, Props as NftProps } from '../nft';
import { Level, TrainingLevel, TrainingNftStatus } from '../../model/types';
import { $learningSkill, $level, $skillsMapByLevel } from '../../model';

import sharedStyles from '../styles.module.scss';
import styles from './styles.module.scss';

export type Props = {
    title: string;
    levels: TrainingLevel[];
    onNftClick?: NftProps['onClick'];
    schemaType: EngineerSchema;
    isDisabled?: boolean;
};

const nftWidth = 60;
const nftHeight = 84;

export const TrainingArea = ({
    levels,
    title,
    onNftClick,
    schemaType,
    isDisabled,
}: Props) => {
    const { t } = useTranslation();
    const currentLevel = useStore($level);
    const skillsMapByLevel = useStore($skillsMapByLevel);
    const learningSkill = useStore($learningSkill);

    const getNftStatus = (
        level: Level,
        schema: EngineerSchema,
        rarity?: RarityType
    ): TrainingNftStatus => {
        if (
            learningSkill?.level === level &&
            learningSkill.schemaType === schema &&
            (rarity ? learningSkill.rarity === rarity : true)
        ) {
            return TrainingNftStatus.learning;
        }

        if (currentLevel < level) return TrainingNftStatus.notAvailable;

        const hasSkill = skillsMapByLevel[level]?.some(
            (skill) =>
                skill.schema_type === schema &&
                (rarity ? skill.rarity === rarity : true)
        );

        if (hasSkill) return TrainingNftStatus.learned;

        return TrainingNftStatus.available;
    };

    return (
        <Row
            className={cn(sharedStyles.card, styles.trainingArea, {
                [styles.trainingAreaDisabled]: isDisabled,
            })}
            gutter={[0, 24]}
            justify="center"
        >
            <Typography.Title level={3}>{title}</Typography.Title>
            <Col span={24}>
                <Row gutter={[0, 24]}>
                    {levels.map((level) => (
                        <Col
                            span={24}
                            key={level.value}
                            className={cn(styles.trainingAreaRow, {
                                [styles.trainingAreaRowDisabled]:
                                    currentLevel < level.value,
                            })}
                        >
                            <Row gutter={[20, 0]} align="middle">
                                <Col flex="auto">
                                    <Typography.Title
                                        level={4}
                                        className={cn(
                                            styles.trainingAreaRowTitle
                                        )}
                                    >
                                        {t('components.common.level')}{' '}
                                        {level.value}
                                    </Typography.Title>
                                </Col>
                                <Col flex={1}>
                                    <Row gutter={[16, 0]} justify="end">
                                        {level.nfts.map((nft, index) => (
                                            <Col
                                                key={index}
                                                className={
                                                    styles.trainingAreaCol
                                                }
                                            >
                                                <Nft
                                                    className={cn(
                                                        styles.trainingAreaNft
                                                    )}
                                                    templateId={nft.templateId}
                                                    src={nft.src}
                                                    level={level.value}
                                                    onClick={onNftClick}
                                                    status={getNftStatus(
                                                        level.value,
                                                        schemaType,
                                                        nft.rarity
                                                    )}
                                                    width={nftWidth}
                                                    height={nftHeight}
                                                    rarity={nft.rarity}
                                                    schemaType={nft.schemaType}
                                                    isDisabled={!nft.templateId}
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    );
};

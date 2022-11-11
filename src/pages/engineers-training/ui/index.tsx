import { Row, Col, Tooltip } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader, Page, useAccountName } from 'shared';
import { useGate, useStore } from 'effector-react';
import { EngineerSchema } from 'entities/smartcontract';
import {
    $isEngineerFetching,
    $learningSkill,
    TrainingPageGate,
} from '../model';
import {
    equipmentLevels,
    mineModuleLevels,
    mineLevels,
    factoryLevels,
} from '../model/levels';
import { TrainingModal, Props as TrainingModalProps } from './modal';
import { LevelProgress } from './level-progress';
import { TrainingArea, Props as TrainingAreaProps } from './area';

import styles from './styles.module.scss';
import learningSkillStyles from './learning-skill/styles.module.scss';
import { LearningSkill } from './learning-skill';

const equipmentWidth = 512;
const mineModulesWidth = 212;
const mineWidth = mineModulesWidth;

export const EngineersTraining = () => {
    useGate(TrainingPageGate, { account: useAccountName() });
    const { t } = useTranslation();
    const [nftData, setNftData] = useState<TrainingModalProps['nftData']>(null);
    const isFetching = useStore($isEngineerFetching);
    const learningSkill = useStore($learningSkill);

    const handleNftClick: TrainingAreaProps['onNftClick'] = (nft) => {
        setNftData(nft);
    };

    const handleCancel = () => {
        setNftData(null);
    };

    return (
        <Page
            headerTitle={t('pages.engineer.engineersTraining').toUpperCase()}
            className={styles.trainingPage}
        >
            <div>
                {isFetching ? (
                    <Loader centered size="large" />
                ) : (
                    <Row
                        gutter={[0, 42]}
                        className={styles.content}
                        align="middle"
                    >
                        <Col span={24} className={styles.contentTop}>
                            <Row
                                justify={
                                    learningSkill ? 'space-between' : 'center'
                                }
                                gutter={[0, 16]}
                            >
                                {learningSkill && (
                                    <LearningSkill skill={learningSkill} />
                                )}
                                <LevelProgress />
                                {learningSkill && (
                                    <div
                                        className={learningSkillStyles.block}
                                        style={{ width: '100%' }}
                                    />
                                )}
                            </Row>
                        </Col>
                        <Col span={24}>
                            <section className={styles.trainingSection}>
                                <Row gutter={[24, 24]} justify="center">
                                    <Col flex={`${equipmentWidth}px`}>
                                        <TrainingArea
                                            schemaType={
                                                EngineerSchema.equipment
                                            }
                                            title={t(
                                                'pages.engineersTraining.equipment'
                                            )}
                                            onNftClick={handleNftClick}
                                            levels={equipmentLevels}
                                        />
                                    </Col>
                                    <Col flex={`${mineWidth}px`}>
                                        <TrainingArea
                                            schemaType={EngineerSchema.mine}
                                            title={t(
                                                'pages.engineersTraining.mine'
                                            )}
                                            onNftClick={handleNftClick}
                                            levels={mineLevels}
                                        />
                                    </Col>
                                    <Tooltip
                                        title={t(
                                            'components.common.comingSoon'
                                        )}
                                    >
                                        <Col flex={`${mineModulesWidth}px`}>
                                            <TrainingArea
                                                schemaType={
                                                    EngineerSchema.module
                                                }
                                                title={t(
                                                    'pages.engineersTraining.mineModules'
                                                )}
                                                onNftClick={handleNftClick}
                                                levels={mineModuleLevels}
                                                isDisabled
                                            />
                                        </Col>
                                    </Tooltip>
                                    <Tooltip
                                        title={t(
                                            'components.common.comingSoon'
                                        )}
                                    >
                                        <Col flex={`${mineWidth}px`}>
                                            <TrainingArea
                                                schemaType={
                                                    EngineerSchema.factory
                                                }
                                                title={t(
                                                    'pages.engineersTraining.factory'
                                                )}
                                                onNftClick={handleNftClick}
                                                levels={factoryLevels}
                                                isDisabled
                                            />
                                        </Col>
                                    </Tooltip>
                                </Row>
                            </section>
                        </Col>
                    </Row>
                )}
            </div>
            <TrainingModal nftData={nftData} onCancel={handleCancel} />
        </Page>
    );
};

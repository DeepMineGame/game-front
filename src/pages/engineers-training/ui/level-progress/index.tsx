import { ArrowUpOutlined } from '@ant-design/icons';
import { Typography, Row, Col, Progress } from 'antd';
import { useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import {
    Button,
    neutral3Color,
    primary6,
    Text,
    useAccountName,
    useReloadPage,
} from 'shared';
import { useSmartContractAction } from 'features/hooks';
import { upgradeLevel } from 'entities/smartcontract';

import {
    $level,
    $xp,
    $levelProgressPercent,
    $nextLevel,
    $isMaxLevelPassed,
    $xpHasBeenReached,
} from '../../model';

import sharedStyles from '../styles.module.scss';
import styles from './styles.module.scss';

export const LevelProgress = () => {
    const { t } = useTranslation();

    const level = useStore($level);
    const xp = useStore($xp);
    const levelProgressPercent = useStore($levelProgressPercent);
    const nextLevel = useStore($nextLevel);
    const isMaxLevelPassed = useStore($isMaxLevelPassed);
    const xpHasBeenReached = useStore($xpHasBeenReached);

    const reloadPage = useReloadPage();
    const accountName = useAccountName();

    const upgradeLevelAction = useSmartContractAction({
        action: upgradeLevel(accountName),
        onSignSuccess: reloadPage,
    });

    const handleLevelUpgrade = async () => {
        await upgradeLevelAction();
    };

    const renderProgressContent = () => {
        if (isMaxLevelPassed) return null;

        if (xpHasBeenReached)
            return (
                <Col span={24}>
                    <Button
                        type="primary"
                        className={styles.upgradeButton}
                        icon={<ArrowUpOutlined />}
                        onClick={handleLevelUpgrade}
                    >
                        {t('pages.engineersTraining.upgradeToLevel', {
                            level: nextLevel,
                        })}
                    </Button>
                </Col>
            );

        return (
            <>
                <Col span={24}>
                    <Progress
                        percent={levelProgressPercent}
                        showInfo={false}
                        strokeColor={primary6}
                        trailColor={neutral3Color}
                    />
                </Col>
                <Col span={24}>
                    <Row justify="center">
                        <Text className={styles.upgradeTo}>
                            {t('pages.engineersTraining.upgradeToLevel', {
                                level: nextLevel,
                            })}
                        </Text>
                    </Row>
                </Col>
            </>
        );
    };

    return (
        <Row className={cn(sharedStyles.card, styles.container)}>
            <Col span={12}>
                <Typography.Title level={3}>
                    {t('components.common.level')} {level}
                </Typography.Title>
            </Col>
            <Col span={12}>
                <Row justify="end">
                    <Typography.Title level={3}>
                        {t('pages.engineersTraining.xp').toUpperCase()} {xp}
                    </Typography.Title>
                </Row>
            </Col>
            <Col span={24}>
                <Row>{renderProgressContent()}</Row>
            </Col>
        </Row>
    );
};

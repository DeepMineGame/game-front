import { Row, Col } from 'antd';
import { warehouse } from 'app/router/paths';
import { useGate, useStore } from 'effector-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Button, Loader, Text, useAccountName } from 'shared';
import {
    $userActiveInventoryMap,
    $userAllInventoryMap,
    InventoryGate,
    $isInventoryFetching,
} from '../../model';
import { TrainingNft, TrainingNftMeta } from '../../model/types';
import { MainInformation } from './shared';
import { ActionTable } from './shared/ActionTable';
import { UpgradeModal } from './UpgradeModal';

type Props = {
    nftData: TrainingNft & TrainingNftMeta;
};

export const AvailableContent: React.FC<Props> = ({ nftData }) => {
    useGate(InventoryGate, { account: useAccountName() });
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isUpgradeModalVisible, setIsUpgradeModalVisible] = useState(false);

    const isInventoryFetching = useStore($isInventoryFetching);
    const activeInventoryMap = useStore($userActiveInventoryMap);
    const allInventoryMap = useStore($userAllInventoryMap);

    const hasInActiveInventory = !!activeInventoryMap[nftData.templateId];
    const hasInAllInventory = !!allInventoryMap[nftData.templateId];

    const renderContent = () => {
        if (isInventoryFetching) return <Loader centered />;
        if (hasInActiveInventory)
            return (
                <>
                    <UpgradeModal
                        isVisible={isUpgradeModalVisible}
                        onCancel={() => setIsUpgradeModalVisible(false)}
                        nftData={nftData}
                    />
                    <Button onClick={() => setIsUpgradeModalVisible(true)}>
                        Learn
                    </Button>
                </>
            );
        if (hasInAllInventory)
            return (
                <Row gutter={[0, 16]}>
                    <Col span={24}>
                        <Text>
                            {t('pages.engineersTraining.forLearningNeedSchema')}
                        </Text>
                    </Col>
                    <Col span={24}>
                        <Button onClick={() => navigate(warehouse)}>
                            {t('pages.engineersTraining.visitHive')}
                        </Button>
                    </Col>
                </Row>
            );
        return (
            <Row gutter={[0, 16]}>
                <Col span={24}>
                    <Text>{t('pages.engineersTraining.forLearning')}</Text>
                </Col>
                <Col span={24}>
                    <Button
                        href="https://wax.atomichub.io/market?collection_name=deepminegame"
                        target="_blank"
                    >
                        {t('components.common.button.visitMarketplace')}
                    </Button>
                </Col>
            </Row>
        );
    };

    return (
        <Row gutter={[0, 16]}>
            <Col span={24}>
                <MainInformation
                    nftData={nftData}
                    subtitle={t('pages.engineersTraining.availableToLearn')}
                >
                    {renderContent()}
                </MainInformation>
            </Col>
            <Col span={24}>
                <ActionTable nftData={nftData} />
            </Col>
        </Row>
    );
};

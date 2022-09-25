import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { Button, Text, useAccountName, useReloadPage } from 'shared';
import { useSmartContractAction } from 'features/hooks';
import { openSkill } from 'entities/smartcontract';
import { TrainingNft, TrainingNftMeta } from '../../model/types';
import { ActionTable } from './shared/ActionTable';

type Props = {
    isVisible: boolean;
    onCancel?: () => void;
    nftData: TrainingNft & TrainingNftMeta;
};

const modalWidth = 458;

export const UpgradeModal = ({ isVisible, onCancel, nftData }: Props) => {
    const { t } = useTranslation();
    const reloadPage = useReloadPage();
    const accountName = useAccountName();

    const openSkillAction = useSmartContractAction({
        action: openSkill(accountName, nftData.templateId),
        onSignSuccess: reloadPage,
    });

    const handleUpgrade = async () => {
        await openSkillAction();
    };

    return (
        <Modal
            title={
                <Text fontFamily="orbitron">
                    {t('pages.engineersTraining.upgradeLevel').toUpperCase()}
                </Text>
            }
            visible={isVisible}
            onCancel={onCancel}
            width={modalWidth}
            centered
            footer={[
                <Button onClick={onCancel} ghost key="cancel">
                    {t('components.common.button.cancel')}
                </Button>,
                <Button onClick={handleUpgrade} type="primary" key="upgrade">
                    {t('pages.engineersTraining.upgrade')}
                </Button>,
            ]}
        >
            <ActionTable nftData={nftData} />
        </Modal>
    );
};

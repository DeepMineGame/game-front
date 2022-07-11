import React, { FC, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { SignOrderModal, useSmartContractAction } from 'features';
import { Button, DAY_IN_SECONDS, Text, toLocaleDate } from 'shared';
import { ContractDto, signOrder } from 'entities/smartcontract';
import { TableWithTitle } from '../ui/TableTitle';
import styles from './styles.module.scss';

type Props = { contract: ContractDto; accountName: string };

const OperationOrder: FC<Props> = ({ contract, accountName }) => {
    const { t } = useTranslation();

    const [selectedAssetId, setSelectedAssetId] = useState('');
    const [signOrderModalVisibility, setSignOrderModalVisibility] =
        useState(false);
    const [isSigning, setIsSigning] = useState(false);
    const [areaSlotId, setAreaSlotId] = useState('');

    const handleCloseModal = () => setSignOrderModalVisibility(false);
    const handleShowModal = () => setSignOrderModalVisibility(true);
    const signContractAction = useSmartContractAction(
        signOrder({
            waxUser: accountName,
            assetId: selectedAssetId,
            contractId: contract.id,
            areaSlotId,
        })
    );
    const handleSignOrder = async () => {
        setIsSigning(true);
        await signContractAction();
        setSignOrderModalVisibility(false);
        setIsSigning(false);
    };

    const generalData = {
        [t('pages.mineOperationOrder.orderId')]: (
            <>
                <CopyOutlined
                    className={styles.copyIcon}
                    onClick={() =>
                        navigator.clipboard.writeText(`${contract.id}`)
                    }
                />
                <Text className={cn(styles.accent)}>{contract.id}</Text>
            </>
        ),
        [t('pages.mineOperationOrder.creationDate')]: toLocaleDate(
            contract.create_time * 1000
        ),
        [t('pages.mineOperationOrder.duration')]: `${Math.floor(
            (contract.finishes_at - contract.create_time) / DAY_IN_SECONDS
        )} ${t('components.common.days').toLowerCase()}`,
    };

    const landlordData = {
        [t('pages.mineOperationOrder.waxWallet')]: contract.client || '-',
        [t('pages.mineOperationOrder.landlord')]: (
            <Text className={cn(styles.accent)}>
                {contract.executor || '-'}
            </Text>
        ),
        [t('components.common.area')]: (
            <Text
                className={cn(styles.accent)}
            >{`ID${contract.client_asset_id}`}</Text>
        ),
    };

    const conditionsData = {
        [t('pages.mineOperationOrder.startOperation')]: toLocaleDate(
            contract.deadline_time * 1000
        ),
        [t('pages.mineOperationOrder.penalty')]: `${
            contract.penalty_amount
        } ${t('components.common.button.dme')}`,
        [t('pages.mineOperationOrder.miningTerms')]: t(
            'pages.mineOperationOrder.minimumDmeInDays',
            {
                amount: contract.fee_daily_min_amount,
                penalty: contract.days_for_penalty,
            }
        ),
        [t('pages.mineOperationOrder.fee')]: `${contract.fee_percent}%`,
    };

    return (
        <div>
            <Row gutter={[32, 32]}>
                <Col span={24}>
                    <TableWithTitle
                        title={t('pages.mineOperationOrder.generalInformation')}
                        data={generalData}
                    />
                </Col>
                <Col xs={24} md={12}>
                    <TableWithTitle
                        title={t('pages.mineOperationOrder.landlord')}
                        data={landlordData}
                    />
                </Col>
                <Col xs={24} md={12}>
                    <TableWithTitle
                        title={t('pages.mineOperationOrder.conditions')}
                        data={conditionsData}
                    />

                    <div className={styles.signOrder}>
                        <Button onClick={handleShowModal} type="primary">
                            {t('pages.mineOperationOrder.selectMineAndSign')}
                        </Button>

                        <SignOrderModal
                            areaId={contract.client_asset_id}
                            setAreaSlotId={setAreaSlotId}
                            isVisible={signOrderModalVisibility}
                            isDisabled={!selectedAssetId || isSigning}
                            onSelect={setSelectedAssetId}
                            onSubmit={handleSignOrder}
                            onCancel={handleCloseModal}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export { OperationOrder };

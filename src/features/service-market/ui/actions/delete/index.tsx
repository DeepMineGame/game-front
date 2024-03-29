import { FC } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { serviceMarket } from 'app/router/paths';
import { useSmartContractAction } from 'features/hooks';
import { terminateContract } from 'entities/smartcontract';
import { Button } from 'shared/ui/ui-kit';
import {
    DEFAULT_BLOCKCHAIN_BACKEND_SYNC_TIME,
    setSomethingCountDownEvent,
} from '../../../../something-in-progess-modal';

type Props = {
    accountName: string;
    contractId: number;
};

const DeleteOrder: FC<Props> = ({ accountName, contractId }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const terminateAction = useSmartContractAction({
        action: terminateContract(accountName, contractId),
    });
    const handleDeleteOrder = async () => {
        await terminateAction();
        navigate(serviceMarket);
        setSomethingCountDownEvent(DEFAULT_BLOCKCHAIN_BACKEND_SYNC_TIME);
    };

    return (
        <Button onClick={handleDeleteOrder} icon={<DeleteOutlined />}>
            {t('pages.serviceMarket.order.deleteOrder')}
        </Button>
    );
};

export { DeleteOrder };

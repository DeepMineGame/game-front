import { FC } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { serviceMarket } from 'app/router/paths';
import { useSmartContractAction } from 'features/hooks';
import { terminateContract } from 'entities/smartcontract';
import { Button } from 'shared/ui/ui-kit';

type Props = {
    accountName: string;
    contractId: number;
};

const DeleteOrder: FC<Props> = ({ accountName, contractId }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const terminateAction = useSmartContractAction(
        terminateContract(accountName, contractId, 0)
    );
    const handleDeleteOrder = async () => {
        await terminateAction();
        navigate(serviceMarket);
    };

    return (
        <Button
            onClick={handleDeleteOrder}
            icon={<DeleteOutlined />}
            type="ghost"
        >
            {t('pages.serviceMarket.order.deleteOrder')}
        </Button>
    );
};

export { DeleteOrder };

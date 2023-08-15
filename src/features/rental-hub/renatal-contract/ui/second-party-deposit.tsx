import { Button, Modal, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import { useAccountName } from 'shared';
import { ContractDto } from 'entities/smartcontract';
import { useSmartContractAction } from '../../../hooks';

export const SecondPartyDepositModal: FC<{
    contract: ContractDto;
    open: boolean;
    onCancel: () => void;
}> = ({ contract, open, onCancel }) => {
    const { t } = useTranslation();
    const accountName = useAccountName();
    const waxTransfer = useSmartContractAction({
        action: {
            actions: [
                {
                    account: 'eosio.token',
                    name: 'transfer',
                    authorization: [
                        {
                            actor: accountName,
                            permission: 'active',
                        },
                    ],
                    data: {
                        from: contract.renter,
                        to: contract.owner,
                        quantity: `${contract.ins_wax_amount} WAX`,
                        memo: contract.id,
                    },
                },
            ],
        },
    });
    const dmeTransfer = useSmartContractAction({
        action: {
            actions: [
                {
                    account: 'deepminedmet',
                    name: 'transfer',
                    authorization: [
                        {
                            actor: accountName,
                            permission: 'active',
                        },
                    ],
                    data: {
                        from: accountName,
                        to: contract.owner,
                        quantity: `${contract.ins_dme_amount} DME`,
                        memo: contract.id,
                    },
                },
            ],
        },
    });
    const dmpTransfer = useSmartContractAction({
        action: {
            actions: [
                {
                    account: 'deepminetokn',
                    name: 'transfer',
                    authorization: [
                        {
                            actor: accountName,
                            permission: 'active',
                        },
                    ],
                    data: {
                        from: accountName,
                        to: contract.owner,
                        quantity: `${contract.ins_dme_amount} DMP`,
                        memo: contract.id,
                    },
                },
            ],
        },
    });
    return (
        <Modal
            title={t('Please select a deposit currency')}
            open={open}
            onCancel={onCancel}
            onOk={onCancel}
        >
            <Space>
                <Button onClick={dmeTransfer}>
                    {contract.ins_dme_amount} DME
                </Button>
                <Button onClick={waxTransfer}>
                    {contract.ins_wax_amount} WAX
                </Button>
                <Button onClick={dmpTransfer}>
                    {contract.ins_dmp_amount} DMP
                </Button>
            </Space>
        </Modal>
    );
};
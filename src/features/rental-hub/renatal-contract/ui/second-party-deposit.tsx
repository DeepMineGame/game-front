import { Button, Modal, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import { ContractDto } from 'entities/smartcontract';
import { useAccountName, useReloadPage } from 'shared/lib/hooks';
import { useSmartContractAction } from '../../../hooks';

export const SecondPartyDepositModal: FC<{
    contract: ContractDto;
    open: boolean;
    onCancel: () => void;
    onClose: (value: boolean) => void;
}> = ({ contract, open, onCancel, onClose }) => {
    const { t } = useTranslation();
    const accountName = useAccountName();
    const reloadPage = useReloadPage();
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
                        to: 'deepminerent',
                        quantity: `${Number(contract.ins_wax_amount).toFixed(
                            8
                        )} WAX`,
                        memo: contract.id,
                    },
                },
            ],
        },
        onSignSuccess: reloadPage,
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
                        to: 'deepminerent',
                        quantity: `${Number(contract.ins_dme_amount).toFixed(
                            8
                        )} DME`,
                        memo: contract.id,
                    },
                },
            ],
        },
        onSignSuccess: reloadPage,
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
                        to: 'deepminerent',
                        quantity: `${Number(contract.ins_dmp_amount).toFixed(
                            8
                        )} DMP`,
                        memo: contract.id,
                    },
                },
            ],
        },
        onSignSuccess: reloadPage,
    });
    return (
        <Modal
            title={t('Please select a deposit currency')}
            open={open}
            footer={[<Button onClick={onCancel}>{t('Cancel')}</Button>]}
            onCancel={() => onClose(false)}
        >
            <Space>
                {Number(contract.ins_dme_amount) > 0 && (
                    <Button onClick={dmeTransfer}>
                        {contract.ins_dme_amount} DME
                    </Button>
                )}
                {Number(contract.ins_wax_amount) > 0 && (
                    <Button onClick={waxTransfer}>
                        {contract.ins_wax_amount} WAX
                    </Button>
                )}
                {Number(contract.ins_dmp_amount) > 0 && (
                    <Button onClick={dmpTransfer}>
                        {contract.ins_dmp_amount} DMP
                    </Button>
                )}
            </Space>
        </Modal>
    );
};

import { Button, Modal, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { FC, useState } from 'react';
import { ContractDto } from 'entities/smartcontract';
import { useAccountName, useReloadPage } from 'shared/lib/hooks';
import { useSmartContractAction } from '../../../hooks';

export const SecondPartyDepositModal: FC<{
    contract: ContractDto;
    open: boolean;
    onCancel: () => void;
    onClose: (value: boolean) => void;
    type: 'insurance' | 'buyout';
}> = ({ contract, open, onCancel, onClose, type }) => {
    const { t } = useTranslation();
    const accountName = useAccountName();
    const reloadPage = useReloadPage();
    const transactionPrefix =
        type === 'insurance' ? 'pay_insurance-' : 'buyout-';
    const waxPropName =
        type === 'insurance'
            ? contract.ins_wax_amount
            : contract.buyout_wax_amount;

    const dmePropName =
        type === 'insurance'
            ? contract.ins_dme_amount
            : contract.buyout_dme_amount;
    const dmpPropName =
        type === 'insurance'
            ? contract.ins_dmp_amount
            : contract.buyout_dmp_amount;
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
                        quantity: `${Number(waxPropName).toFixed(8)} WAX`,
                        memo: `${transactionPrefix}${contract.id}`,
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
                        quantity: `${Number(dmePropName).toFixed(8)} DME`,
                        memo: `${transactionPrefix}${contract.id}`,
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
                        quantity: `${Number(dmpPropName).toFixed(8)} DMP`,
                        memo: `${transactionPrefix}${contract.id}`,
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
                {Number(dmePropName) > 0 && (
                    <Button onClick={dmeTransfer}>{dmePropName} DME</Button>
                )}
                {Number(waxPropName) > 0 && (
                    <Button onClick={waxTransfer}>{waxPropName} WAX</Button>
                )}
                {Number(dmpPropName) > 0 && (
                    <Button onClick={dmpTransfer}>{dmpPropName} DMP</Button>
                )}
            </Space>
        </Modal>
    );
};
export const DepositButton: FC<{
    contract: ContractDto;
    type?: 'insurance' | 'buyout';
}> = ({ contract, type = 'insurance' }) => {
    const [depositModalVisibility, setDepositModalVisibility] = useState(false);
    const { t } = useTranslation();

    return (
        <>
            <Button
                onClick={() => setDepositModalVisibility(true)}
                type="primary"
            >
                {type === 'insurance' ? t('Deposit') : t('Buyout')}
            </Button>
            <SecondPartyDepositModal
                type={type}
                open={depositModalVisibility}
                onClose={setDepositModalVisibility}
                contract={contract}
                onCancel={() => setDepositModalVisibility(false)}
            />
        </>
    );
};

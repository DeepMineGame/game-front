import { CardHolder, Modal } from 'shared';
import React, { FC } from 'react';
import { ModalProps } from 'antd';

export const Inventory: FC<ModalProps> = (props) => {
    return (
        <Modal {...props} title="Active inventory">
            <CardHolder onClick={() => {}} />{' '}
        </Modal>
    );
};

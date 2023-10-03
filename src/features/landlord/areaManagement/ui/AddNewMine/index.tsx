import { Button } from 'shared';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { AddMineOwnerModal } from '../AddMineOwnerModal';

export const AddNewMine = () => {
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const { t } = useTranslation();

    return (
        <>
            <Button
                block
                icon={<PlusOutlined />}
                onClick={() => setIsAddModalVisible(true)}
            >
                {t('Add new mine')}
            </Button>
            <AddMineOwnerModal
                visible={isAddModalVisible}
                onCancel={() => setIsAddModalVisible(false)}
            />
        </>
    );
};

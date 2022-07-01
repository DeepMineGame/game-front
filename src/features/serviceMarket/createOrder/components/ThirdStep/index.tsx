import React, { FC } from 'react';
import { Form, Space } from 'antd';
import { Button, getDaysSelectItem, Input, Select, Title } from 'shared';
import { createContrFormFields } from 'entities/smartcontract';
import styles from '../../styles.module.scss';
import localStyles from './styles.module.scss';

export const ThirdStep: FC<{
    setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setStep }) => {
    return (
        <div>
            <div className={localStyles.terms}>
                <div>
                    <Title level={5}>Mining terms</Title>
                    <div>
                        <div>
                            If during the entire contract, the contractor within
                        </div>
                        <Form.Item
                            name={createContrFormFields.daysForPenalty}
                            className={styles.formField}
                            style={{ width: '126px' }}
                        >
                            <Select
                                placeholder="Days"
                                options={getDaysSelectItem({
                                    amountOfDays: 21,
                                })}
                            />
                        </Form.Item>
                    </div>
                    <div>
                        <div>will extract less than</div>
                        <Form.Item
                            name={createContrFormFields.feeDailyMinAmount}
                            className={styles.formField}
                            style={{ width: '126px' }}
                        >
                            <Input placeholder="DME" />
                        </Form.Item>
                    </div>
                </div>
                <div>
                    contractor can be fined and the contract can be terminated
                    with
                </div>
                <Form.Item
                    name={createContrFormFields.penaltyAmount}
                    className={styles.formField}
                    style={{ width: '160px' }}
                >
                    <Input placeholder="DME" />
                </Form.Item>
            </div>

            <Space direction="horizontal">
                <Button onClick={() => setStep(1)} ghost>
                    Back
                </Button>
                <Button htmlType="submit" type="primary">
                    Create
                </Button>
            </Space>
        </div>
    );
};

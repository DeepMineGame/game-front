import React, { FC } from 'react';
import { Form, Input as InputA, Space } from 'antd';
import { Button, Input, Select, getDaysSelectItem } from 'shared';
import { createContrFormFields } from 'entities/smartcontract';
import styles from '../../styles.module.scss';

export const SecondStep: FC<{
    setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setStep }) => {
    return (
        <Form.Item>
            <InputA.Group compact>
                <Form.Item
                    name={createContrFormFields.fee}
                    label="Fee"
                    className={styles.formField}
                >
                    <Input
                        placeholder="%"
                        style={{
                            width: '160px',
                            marginRight: '31px',
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name={createContrFormFields.finishesAt}
                    label="Duration"
                    className={styles.formField}
                >
                    <Select
                        style={{
                            width: '160px',
                        }}
                        placeholder="Days"
                        options={getDaysSelectItem({ amountOfDays: 21 })}
                    />
                </Form.Item>
            </InputA.Group>
            <Form.Item
                name={createContrFormFields.deadlineTime}
                label="Start of operation"
                className={styles.formField}
                style={{ width: '352px' }}
            >
                <Select
                    placeholder="Days"
                    options={getDaysSelectItem({ amountOfDays: 3 })}
                />
            </Form.Item>
            <Space direction="horizontal">
                <Button onClick={() => setStep(0)} ghost>
                    Back
                </Button>
                <Button onClick={() => setStep(2)} type="primary">
                    Next
                </Button>
            </Space>
        </Form.Item>
    );
};

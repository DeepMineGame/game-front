import React, { FC } from 'react';
import { Form, Input as InputA, Space } from 'antd';
import { Button, Input, Select } from 'shared';
import { fieldNames } from '../../constants';
import styles from '../../styles.module.scss';

export const SecondStep: FC<{
    setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setStep }) => {
    return (
        <Form.Item>
            <InputA.Group compact>
                <Form.Item
                    name={fieldNames.fee}
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
                    name={fieldNames.deadlineTime}
                    label="Duration"
                    className={styles.formField}
                >
                    <Select
                        style={{
                            width: '160px',
                        }}
                        placeholder="Days"
                        options={Array.from(Array(21).keys()).map(
                            (_, index) => ({
                                label: `${index} Day`,
                                value: index,
                            })
                        )}
                    />
                </Form.Item>
            </InputA.Group>
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

import React, { useRef } from 'react';
import { Button, Input, InputRef, Space } from 'antd';
import { useStore } from 'effector-react';
import { FilterDropdownProps } from 'antd/lib/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import { changeFilterEvent, filterStore } from 'features';

export function useSearchByNickNameTableProps() {
    const searchInput = useRef<InputRef>(null);

    const filter = useStore(filterStore);
    const search = (nickname: string) => {
        changeFilterEvent({
            ...filter,
            nickname,
        });
    };
    const reset = () =>
        changeFilterEvent({
            ...filter,
            nickname: undefined,
        });
    return {
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
        }: FilterDropdownProps) => (
            <div
                style={{ padding: 8, width: '221px' }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder="Search nickname"
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => search(selectedKeys[0] as string)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={reset} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: <SearchOutlined />,
    };
}

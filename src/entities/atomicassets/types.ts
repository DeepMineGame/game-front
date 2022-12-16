export type AssetDataType = {
    contract: string;
    asset_id: string;
    owner: string;
    name: string;
    is_transferable: true;
    is_burnable: true;
    template_mint: string;
    collection: {
        collection_name: string;
        name: string;
        author: string;
        allow_notify: true;
        authorized_accounts: string[];
        notify_accounts: string[];
        market_fee: 0;
        created_at_block: string;
        created_at_time: string;
    };
    schema: {
        schema_name: string;
        format: [
            {
                name: string;
                type: string;
            }
        ];
        created_at_block: string;
        created_at_time: string;
    };
    template: {
        template_id: string;
        max_supply: string;
        issued_supply: string;
        is_transferable: true;
        is_burnable: true;
        immutable_data: {
            backimg: string;
            description: string;
            img: string;
            level: string;
            name: string;
            rarity: string;
            type: string;
        };
        created_at_time: string;
        created_at_block: string;
    };
    backed_tokens: [
        {
            token_contract: string;
            token_symbol: string;
            token_precision: 0;
            amount: string;
        }
    ];
    immutable_data: {};
    mutable_data: {
        'DME mined': number;
    };
    data: {
        'DME Mined': number;
        'DME to Upgrade': number;
        backimg: string;
        description: string;
        img: string;
        level: string;
        name: string;
        rarity: string;
        type: string;
        depreciation: string;
        'current capacity': string;
        'maximal capacity': string;
    };
    burned_by_account: string;
    burned_at_block: string;
    burned_at_time: string;
    updated_at_block: string;
    updated_at_time: string;
    transferred_at_block: string;
    transferred_at_time: string;
    minted_at_block: string;
    minted_at_time: string;
};

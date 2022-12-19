/** Разрешенные импорты (для сортировки) */
const ALLOWED_PATH_GROUPS = [
    'pages/**',
    'features/**',
    'entities/**',
    'shared/**',
].map((pattern) => ({
    pattern,
    group: 'internal',
    position: 'after',
}));

/** Для запрета приватных путей */
const DENIED_PATH_GROUPS = [
    // Private imports are prohibited, use public imports instead
    'pages/*/**',
    'features/*/**',
    'entities/*/**',
    'shared/*/*/**', // Для shared +1 уровень, т.к. там чаще мы обращаемся к конкретной библиотеке/компоненты
    // Prefer absolute imports instead of relatives (for root modules)
    '../**/app',
    '../**/pages',
    '../**/features',
    '../**/entities',
    '../**/shared',
];

module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    globals: {
        React: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['react', '@typescript-eslint'],
    parserOptions: {
        requireConfigFile: false,
    },
    overrides: [
        {
            files: ['**/*.spec.ts', '**/*.spec.tsx'],
            env: {
                jest: true,
            },
        },
    ],
    rules: {
        'react/destructuring-assignment': 'off',
        'react/prop-types': 'off',
        'react/jsx-filename-extension': [
            1,
            { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        ],
        'react/jsx-no-constructed-context-values': 'warn',
        'react/require-default-props': 'off', // Since we do not use prop-types
        'react/button-has-type': 'off',
        'react/function-component-definition': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/no-unescaped-entities': 'warn',
        'react/jsx-no-bind': 'warn',
        'react/no-array-index-key': 'warn',
        'import/named': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'import/no-cycle': 'warn',
        'import/no-extraneous-dependencies': 'warn',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/mouse-events-have-key-events': 'off',
        'jsx-a11y/control-has-associated-label': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'jsx-a11y/label-has-associated-control': 'warn',
        'no-plusplus': 'off',
        'no-return-await': 'off',
        'arrow-body-style': 'off',
        'no-param-reassign': 'off',
        'no-await-in-loop': 'off',
        'no-promise-executor-return': 'warn',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'consistent-return': 'off',
        semi: [2, 'always'],
        camelcase: 'off',
        'import/order': [
            2,
            {
                pathGroups: ALLOWED_PATH_GROUPS,
                pathGroupsExcludedImportTypes: ['builtin'],
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                ],
            },
        ],
        'no-restricted-imports': [
            2,
            {
                patterns: DENIED_PATH_GROUPS,
            },
        ],
    },
};
